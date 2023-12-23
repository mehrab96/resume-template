import authOptions from "@/app/auth/authOptions";
import { getPaginatedList } from "@/app/helper/pagination/pagination";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import {type NextRequest ,  NextResponse} from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json();

    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json('Undefind user' , {status:401});

    const user = await prisma.user.findUnique(
        { where: { email: session?.user?.email ? session.user.email : '' } 
    });
    
    try{
        const sample = await prisma.sample.create({
            data: {
                title : body.title,
                body : body.body,
                status : body.status == '0' ? false : true,
                slug : body.slug,
                image : body.image ? body.image : '' ,
                userId: user?.id
            }
        });
        return NextResponse.json( sample , {status : 201})
    }catch(error){
        return NextResponse.json(error , {status:501});
    }
}