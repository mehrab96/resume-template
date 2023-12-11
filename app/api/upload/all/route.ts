import {NextRequest , NextResponse} from "next/server";
import { getPaginatedList } from "@/app/helper/pagination/pagination";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest){
    const searchParams : any = await req.nextUrl.searchParams;
    const page : number = await searchParams.get('page');
    const pageSize: number = 8;
    try{
        const skip = (page - 1) * pageSize;
        const total = await prisma.gallery.count();
        const last_page = Math.ceil(total / pageSize);
        const samples = await prisma.gallery.findMany({
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


