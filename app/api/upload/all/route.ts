import {NextRequest , NextResponse} from "next/server";
import { getPaginatedList } from "@/app/helper/pagination/pagination";

export async function POST(req: NextRequest){
    const body = await req.json();
    try{
        const galleries = await getPaginatedList('gallery' , body.page , 8 , {
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


