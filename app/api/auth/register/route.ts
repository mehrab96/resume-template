import {NextRequest , NextResponse} from "next/server";
import prisma from "@/prisma/client";
import bcrypt from 'bcrypt';


export const config = {
    api : {
        bodyParser : false
    }
}

export async function POST(req: NextRequest){
    const body = await req.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
        data: {
            name : body.name,
            email : body.email,
            password : hashedPassword,
        }
    });
    await prisma.$disconnect();
    return NextResponse.json(newUser , {status:201});
   
}


