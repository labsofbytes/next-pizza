import { prisma } from "@/prisma/prisma-client";
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/lib";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                token
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true
                            }
                        },
                        ingredients: true
                    }
                }
            }
        })

        return NextResponse.json(userCart);
    } catch (error) {
        console.log('[CART_GET] Server error', error);
        return NextResponse.json({ error: 'Unable to get cart' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productId,
                ingredients: data.ingredients ?
                    {
                        every: {
                            id: {
                                in: data.ingredients
                            }
                        }
                    } : undefined
            }
        })

        // If we find the cart item, we update the quantity + 1
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id
                },
                data: {
                    quantity: findCartItem.quantity + 1
                }
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productId,
                    quantity: 1,
                    ingredients: {
                        connect: data.ingredients?.map((id) => ({ id }))
                    }
                }
            })
        }



        const updatedUserCart = await updateCartTotalAmount(token);

        const res = NextResponse.json(updatedUserCart);
        res.cookies.set('cartToken', token);
        return res;
    } catch (error) {
        console.log('[CART_POST] Server error', error);
        return NextResponse.json({ error: 'Unable to create cart' }, { status: 500 });
    }
}