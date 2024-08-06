import type { FastifyPluginAsync } from "fastify";

import { z } from "zod";

const FLAG_PREFIX = "flag";

const flagSchema = z.string().startsWith(`${FLAG_PREFIX}{`).endsWith("}");

const validateSchema = z.object({
	flag: flagSchema,
});

const validate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post("/validate", async function (request, reply) {
		const res = validateSchema.safeParse(request.body);
		if (!res.success) {
			return { success: false, error: res.error };
		}
		const flag = res.data.flag.slice(FLAG_PREFIX.length + 1, -1);
		const user = await this.prisma.user.findUnique({
			where: {
				id: request.session.get("user")?.id,
			},
			include: {
				flags: true,
			},
		});
		if (!user) {
			return { success: false, error: "NOT_LOGGED_IN" };
		}
		if (user.flags.some((f) => f.value === flag)) {
			return { success: false, error: "ALREADY_SUBMITTED" };
		}
		const flagObj = await this.prisma.flag.findUnique({
			where: {
				value: flag,
			},
		});
		if (!flagObj) {
			return { success: false, error: "INVALID_FLAG" };
		}

		const newUser = await this.prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				flags: {
					connect: {
						id: flagObj.id,
					},
				},
			},
			include: {
				flags: true,
			},
		});

		request.session.set("user", newUser);

		return { success: true };
	});
};

export default validate;
