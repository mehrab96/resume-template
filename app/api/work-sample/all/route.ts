import { getPaginatedList } from "@/app/helper/pagination/pagination";
import prisma from "@/prisma/client";
import {type NextRequest ,  NextResponse} from "next/server";

export async function GET( request: NextRequest){   
    const searchParams : any = await request.nextUrl.searchParams;
    const page : number = await searchParams.get('page');
    const removeAll : number[] | null = await searchParams.get('removeAll');
    const search : string | null = await searchParams.get('search');


    if(removeAll && removeAll.length){
        const samplesDelete = await prisma.sample.deleteMany({
           where : { 
                id : {
                    in : removeAll.toString().split(',')
                }
            }
        });
        return NextResponse.json(samplesDelete, {status: 200});
    }

    try{
        let whereCondition = {};
        const pageSize: number = 10;
        const skip = (page - 1) * pageSize;
     

        if (search && search.length) {
          whereCondition = {
            title: {
              contains: search,
              mode: 'insensitive', // Case-insensitive search
            },
          };
        }
        const total = await prisma.sample.count({
            where: whereCondition,
        });
        const last_page = Math.ceil(total / pageSize);
        

        const samples = await prisma.sample.findMany({
            skip,
            take: pageSize,
            where: whereCondition,
            include: {
              user: true,
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
