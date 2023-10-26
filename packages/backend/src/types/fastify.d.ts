import { Session, FastifyInstance } from "fastify";
import { OAuth2Namespace } from "@fastify/oauth2";

declare module "fastify" {
	interface Session {
		user: {
			id: number;
			login: string;
			avatarUrl: string;
			githubId: number;
			flags: {
				id: number;
				name: string;
				value: string;
				level: number;
			}[];
		};
	}
	interface FastifyInstance {
		githubOAuth2: OAuth2Namespace;
	}
}
