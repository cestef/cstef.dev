import { PrismaClient } from "@prisma/client";
import { readFile } from "node:fs/promises";
const prisma = new PrismaClient();
async function main() {
	let parsedFlags: {
		name: string;
		value: string;
		level: number;
	}[] = [];
	try {
		const flags = await readFile("./flags.json", "utf-8");
		parsedFlags = JSON.parse(flags) as {
			name: string;
			value: string;
			level: number;
		}[];
	} catch (e) {
		console.warn("flags.json not found, trying from env...");
		if (!process.env.FLAGS) {
			console.error("No flags found in env, exiting...");
			return;
		}
		parsedFlags = process.env.FLAGS.split(";").map((e) => {
			const [name, value, level] = e.split(",");
			return { name, value, level: Number.parseInt(level) };
		});
		if (!parsedFlags) {
			console.error("No flags found in env, exiting...");
			return;
		}
	}

	if (process.argv.some((e) => e === "--reset")) {
		console.log("Resetting all flags...");
		await prisma.flag.deleteMany({});
	}

	for (const flag of parsedFlags) {
		if (!flag.name || !flag.value || !flag.level)
			throw new Error("Invalid flag");
		await prisma.flag.upsert({
			create: {
				name: flag.name,
				value: flag.value,
				level: flag.level,
			},
			update: {
				value: flag.value,
				level: flag.level,
			},
			where: {
				name: flag.name,
			},
		});
	}

	console.log(`Seeded ${parsedFlags.length} flags`);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
