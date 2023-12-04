import authOptions from "@/app/auth/authOptions";
import { getPaginatedList } from "@/app/helper/pagination/pagination";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import {type NextRequest ,  NextResponse} from "next/server";

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


export async function GET( request: NextResponse){
    const searchParams = await request.nextUrl.searchParams;
    const page = await searchParams.get('page')
    try{
        const samples = await getPaginatedList('sample' , page , 8 , {
            include : {
                user : true
            },
            orderBy: {
                id: 'desc',
            },
        })
        return NextResponse.json(samples, {status: 200});
    }catch(error){
        return NextResponse.json(error, {status: 500});
    }

}
