import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface ResponseData {
  success: boolean;
}
export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { email, password } = req.body;

    console.info({ email, password });

    await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return res.json({
      success: true,
    });
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json({
    success: false,
  });
}
