import { FastifyPluginAsync } from "fastify";

const session: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get("/session", async function (request, reply) {
		const user = request.session.get("user");
		if (user) {
			const dbUser = await fastify.prisma.user.findUnique({
				where: {
					id: user.id,
				},
				include: {
					flags: true,
				},
			});
			return dbUser;
		} else {
			reply.code(401).send({ error: "Not logged in" });
		}
	});
};

export default session;
