import {NextRequest , NextResponse} from "next/server";
import { getPaginatedList } from "@/app/helper/pagination/pagination";

export async function GET(req: NextResponse){
    const searchParams = await req.nextUrl.searchParams;
    const page = await searchParams.get('page');

    try{
        const galleries = await getPaginatedList('gallery' , page , 8 , {
            include : {
                user : true
            },
            orderBy: {
                id: 'desc',
            },
        })
        return NextResponse.json(galleries, {status: 200});
    }catch(error){
        return NextResponse.json(error, {status: 500});
    }

}


