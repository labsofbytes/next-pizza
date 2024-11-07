'use server';

import { prisma } from "@/prisma/prisma-client"
import { PayOrderTemplate } from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constants"
import { sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client"
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";



export async function createOrder(data: CheckoutFormValues) {
  try {

    const cookieStore = cookies();
    const token = cookieStore.get('cartToken')?.value;

    if (!token) {
      throw new Error('Cart token not found')
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true
              }
            },
          }
        }
      },
      where: {
        token: token
      }
    })

    if (!userCart) {
      throw new Error('Cart items not found')
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty')
    }



    const order = await prisma.order.create({
      data: {
        token,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      }
    })

    await prisma.cart.update({
      where: {
        id: userCart.id
      },
      data: {
        totalAmount: 0,
      }
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id
      }
    })


    //TODO: Create link to payment


    sendEmail(data.email, 'Next Pizza | Order created #' + order.id, PayOrderTemplate({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl: 'http://google.com' }));

  } catch (error) {
    console.error(error)
  }


  return '/'
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id)
      }
    })

    await prisma.user.update({
      where: {
        id: Number(currentUser.id)
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      }
    })
  } catch (error) {
    console.error('Error [UPDATE_USER]', error)
    throw error
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      }
    })

    if (user) {
      if (!user.verified) {
        throw new Error('Email is not verified')
      }

      throw new Error('User already exists')
    }

    await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        verified: new Date(),
        password: hashSync(body.password as string, 10),
      }
    })
  } catch (error) {
    console.error('Error [REGISTER_USER]', error)
    throw error
  }
}

