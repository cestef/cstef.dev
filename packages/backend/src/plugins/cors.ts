import fp from "fastify-plugin";
import cors, { FastifyCorsOptions } from "@fastify/cors";

export default fp<FastifyCorsOptions>(async (fastify) => {
	fastify.register(cors, {
		origin: [/https?:\/\/localhost(:[0-9]+)?/, process.env.APP_URL!],
		credentials: true,
	});
});
