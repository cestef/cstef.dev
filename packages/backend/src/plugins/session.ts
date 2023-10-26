import fp from "fastify-plugin";
import session, { FastifySessionOptions } from "@fastify/session";

export default fp<FastifySessionOptions>(async (fastify) => {
	fastify.register(session, {
		secret: process.env.SECRET!,
		cookieName: "session",
		cookie: {
			path: "/",
			secure: false,
			maxAge: 1000 * 60 * 60 * 24 * 365,
		},
	});
});
