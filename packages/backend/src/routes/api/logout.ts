import { FastifyPluginAsync } from "fastify";

const logout: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get("/logout", async function (request, reply) {
		try {
			await request.session.destroy();
			return { success: true };
		} catch (e) {
			console.log(e);
			return { success: false };
		}
	});
};

export default logout;
