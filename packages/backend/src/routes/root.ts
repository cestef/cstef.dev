import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get("/", async function (request, reply) {
		return { hello: "world" };
	});
};

export default root;
