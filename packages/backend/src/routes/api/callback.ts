import { FastifyPluginAsync } from "fastify";

const callback: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get("/callback", async function (request, reply) {
		const { token } = await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
		const data = (await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `token ${token.access_token}`,
			},
		}).then((res) => res.json())) as {
			login: string;
			id: number;
			avatar_url: string;
		};

		const user = await this.prisma.user.upsert({
			where: {
				githubId: data.id,
			},
			create: {
				githubId: data.id,
				login: data.login,
				avatarUrl: data.avatar_url,
			},
			update: {},
			include: {
				flags: true,
			},
		});

		request.session.set("user", {
			id: user.id,
			login: user.login,
			avatarUrl: user.avatarUrl,
			githubId: user.githubId,
			flags: user.flags,
		});

		await request.session.save();

		reply.type("text/html").send(`
            <script>
                window.opener.postMessage('github:success', "${process.env.APP_URL}");
                window.close();
            </script>
            <p>Success! You may now close this window.</p>
        `);
	});
};

export default callback;
