import prisma from "@/prisma/client";
import { unlink } from "fs";
import {NextRequest , NextResponse} from "next/server";

export async function POST(request: NextRequest){

    const data = await request.json();

    const gallery = await prisma.gallery.findFirst({where: {id : data.id}})
   
    if(gallery){
        unlink(gallery?.path! , (error) => {
            if (error) {
                return NextResponse.json(error , {status: 500});
              }
        });
        await prisma.gallery.delete({
            where: { id: data.id },
        });

        return NextResponse.json("File removed successfully" , {status: 200});
    }else{
        return NextResponse.json("File is not exist." , {status: 404});
    }

   
   
}