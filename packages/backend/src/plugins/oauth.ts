import fp from "fastify-plugin";
import oauth, { FastifyOAuth2Options } from "@fastify/oauth2";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";

export default fp<FastifyOAuth2Options & FastifyCookieOptions>(async (fastify) => {
	fastify.register(cookie);
	fastify.register(oauth, {
		name: "githubOAuth2",
		scope: ["read:user"],
		credentials: {
			client: {
				id: process.env.GITHUB_CLIENT_ID!,
				secret: process.env.GITHUB_CLIENT_SECRET!,
			},
			auth: oauth.GITHUB_CONFIGURATION,
		},
		startRedirectPath: "/api/login",
		callbackUri: `${process.env.API_URL}/api/callback`,
	});
});
