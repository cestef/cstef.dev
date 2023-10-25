import { FastifyPluginAsync } from "fastify";

const flags = process.env.CTF_FLAGS?.split(",") ?? [];
import { z } from "zod";

const FLAG_PREFIX = "flag";

const flagSchema = z.string().startsWith(`${FLAG_PREFIX}{`).endsWith("}");

const validateSchema = z.object({
	flag: flagSchema,
});

const validate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post("/validate", async function (request, reply) {
		console.log(process.env.CTF_FLAGS);
		const res = validateSchema.safeParse(request.body);
		if (!res.success) {
			return { success: false, error: res.error };
		}
		const flag = res.data.flag.slice(FLAG_PREFIX.length + 1, -1);
		const flagIndex = flags.indexOf(flag);
		if (flagIndex === -1) {
			return { success: false, error: "Invalid flag" };
		}
		return { success: true };
	});
};

export default validate;
