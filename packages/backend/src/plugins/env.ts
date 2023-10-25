import env, { FastifyEnvOptions } from "@fastify/env";
import fp from "fastify-plugin";
export default fp<FastifyEnvOptions>(async (fastify) => {
	fastify.register(env, {
		schema: {
			type: "object",
			required: ["CTF_FLAGS"],
			properties: {
				CTF_FLAGS: {
					type: "string",
				},
			},
		},
		dotenv: {
			path: ".env.local",
		},
		confKey: "config",
	});
});
