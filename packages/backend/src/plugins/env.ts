import env, { FastifyEnvOptions } from "@fastify/env";
import fp from "fastify-plugin";
export default fp<FastifyEnvOptions>(async (fastify) => {
	fastify.register(env, {
		schema: {
			type: "object",
			required: ["SECRET", "APP_URL", "API_URL", "GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
			properties: {
				SECRET: {
					type: "string",
				},
				APP_URL: {
					type: "string",
				},
				API_URL: {
					type: "string",
				},
				GITHUB_CLIENT_ID: {
					type: "string",
				},
				GITHUB_CLIENT_SECRET: {
					type: "string",
				},
			},
		},
		dotenv: {
			path: ".env",
		},
		confKey: "config",
	});
});
