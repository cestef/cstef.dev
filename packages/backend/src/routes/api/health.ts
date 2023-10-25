import { FastifyPluginAsync } from "fastify";

const health: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get("/health", async function (request, reply) {
		return { status: "OK" };
	});
};

export default health;
