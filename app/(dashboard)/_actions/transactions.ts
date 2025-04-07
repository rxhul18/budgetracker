"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
} from "@/schema/transaction";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateTransactions(
  form: CreateTransactionSchemaType
) {
  const parsedBody = CreateTransactionSchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("Invalid data");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { amount, date, description, type, category } = parsedBody.data;
  const categoryRow = await prisma.category.findFirst({
    where: {
      userId: user.id,
      name: category,
    },
  });

  if (!categoryRow) {
    throw new Error("Category not found");
  }
  console.log(description,"description")
  await prisma.$transaction([
    // Create user transaction
    prisma.transaction.create({
      data: {
        userId: user.id,
        amount,
        date,
        description,
        type,
        category: categoryRow.name,
        categoryIcon: categoryRow.icon,
      },
    }),

    // Update month aggreates table
    prisma.monthHistory.upsert({
      where: {
        userId_day_month_year: {
          userId: user.id,
          day: date.getUTCDate(),
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
        },
      },
      create: {
        userId: user.id,
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0
      },
      update:{
        expense: {
            increment: type === "expense" ? amount : 0
        },
        income: {
            increment: type === "income" ? amount : 0
        }
      }
    }),

    //  Update Year aggreates table
    prisma.yearHistory.upsert({
      where: {
        userId_month_year: {
          userId: user.id,
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
        },
      },
      create: {
        userId: user.id,
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
      update: {
        expense: {     
            increment: type === "expense" ? amount : 0
        },
        income: {
            increment: type === "income" ? amount : 0
        }
      },
    }),
  ]);
}
