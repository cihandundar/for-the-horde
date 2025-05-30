import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";

export async function POST(
    req: Request,
){
    try {
        const body = await req.json();

        const {email, password} = body;

        if(!email || !password) {
            return new NextResponse("Missing credentials", {status: 400});
        }

        const userAlreadyExist = await prismadb.user.findFirst({
            where: {email: email}
        });

        if(userAlreadyExist) { 
             return new NextResponse("User already exist", {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser =  await prismadb.user.create({
            data: {
                email: email,
                hashedPassword: hashedPassword,
            }
        });

        return NextResponse.json(newUser);

    } catch (error) {
        console.log("REGISTER_ERR: " + (error instanceof Error ? error.message : String(error)));
        return new NextResponse("Internal Server Error", {status: 500});
    }
}
