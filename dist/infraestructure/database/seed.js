import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const defaultStates = [
        { name: 'Sin Empezar', disabled: false },
        { name: 'En Curso', disabled: false },
        { name: 'Finalizado', disabled: false },
    ];
    for (const state of defaultStates) {
        await prisma.status.upsert({
            where: { name: state.name },
            update: {},
            create: state,
        });
    }
    console.log('Default states have been seeded!');
}
main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
