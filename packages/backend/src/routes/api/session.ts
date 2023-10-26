import { FastifyPluginAsync } from "fastify";

const session: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get("/session", async function (request, reply) {
		const user = request.session.get("user");
		if (user) {
			return {
				id: user.id,
				login: user.login,
				avatarUrl: user.avatarUrl,
				githubId: user.githubId,
				flags: user.flags ?? [],
			};
		} else {
			reply.code(401).send({ error: "Not logged in" });
		}
	});
};

export default session;
