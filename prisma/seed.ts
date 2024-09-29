import { prisma } from "./prisma-client";



async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: "Alice",
                phone: "+1234567890",
            },
            {
                fullName: "Bob",
                phone: "+1234567820",
            },
            {
                fullName: "Jake",
                phone: "+1234567810",
            },
        ],
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;

}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
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