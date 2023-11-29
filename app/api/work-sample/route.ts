import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import {NextRequest , NextResponse} from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json();

    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({ where: { email: session?.user?.email } });

    try{
        const sample = await prisma.sample.create({
            data: {
                title : body.title,
                body : body.body,
                status : body.status == '0' ? false : true,
                slug : body.slug,
                userId: user ? user.id : ''
            }
        });
        return NextResponse.json( sample , {status : 201})
    }catch(error){
        return NextResponse.json(error , {status:501});
    }

    
    

}


