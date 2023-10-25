import fp from "fastify-plugin";
import ratelimit, { RateLimitOptions } from "@fastify/rate-limit";

export default fp<RateLimitOptions>(async (fastify) => {
	fastify.register(ratelimit, {
		max: 20,
		timeWindow: 60 * 1000,
	});
});
