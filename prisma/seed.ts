import { Prisma } from '@prisma/client';
import { prisma } from './prisma-client';

import { categories, ingredients, products } from './constants';

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
    productId,
    pizzaType,
    size,
}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
}) => {
    return {
        productId,
        price: randomNumber(190, 600),
        pizzaType,
        size,
    } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });

    await prisma.product.createMany({
        data: products,
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Pepperoni Fresh',
            imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Cheese',
            imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Chorizo Fresh',
            imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    await prisma.productItem.createMany({
        data: [
            // Pizza "Pepperoni Fresh"
            generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

            // Pizza "Cheese"
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

            // Pizza "Chorizo Fresh"
            generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

            // Remaining products

        ],
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
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