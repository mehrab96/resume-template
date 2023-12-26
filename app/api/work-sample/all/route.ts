import authOptions from "@/app/auth/authOptions";
import { getPaginatedList } from "@/app/helper/pagination/pagination";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import {type NextRequest ,  NextResponse} from "next/server";

export async function GET( request: NextRequest){   
    const searchParams : any = await request.nextUrl.searchParams;
    const page : number = await searchParams.get('page');
    const pageSize: number = 8;
    try{
        const skip = (page - 1) * pageSize;
        const total = await prisma.sample.count();
        const last_page = Math.ceil(total / pageSize);
        const samples = await prisma.sample.findMany({
            skip,
            take: pageSize,
            include : {
                user : true
            },
            orderBy: {
                id: 'desc',
            },
        });
        const links = await getPaginatedList(page , last_page);

        const result = {
            data: samples,
            total,
            last_page,
            current_page: page,
            links,
        };
        return NextResponse.json(result, {status: 200});
    }catch(error){
        return NextResponse.json(error, {status: 500});
    }

}
