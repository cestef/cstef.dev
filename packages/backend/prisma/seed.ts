import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
const prisma = new PrismaClient();
async function main() {
	const flags = await readFile("./flags.json", "utf-8");
	const parsedFlags = JSON.parse(flags) as {
		name: string;
		value: string;
		level: number;
	}[];

	if (process.argv.some((e) => e === "--reset")) {
		console.log("Resetting all flags...");
		await prisma.flag.deleteMany({});
	}

	for (const flag of parsedFlags) {
		if (!flag.name || !flag.value || !flag.level) throw new Error("Invalid flag");
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
