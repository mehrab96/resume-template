import prisma from "@/prisma/client";
import { unlink } from "fs";
import {NextRequest , NextResponse} from "next/server";

export async function DELETE( request: NextRequest ,
    { params }: { params: { id: string } }){

   const id = params.id;

    const gallery = await prisma.gallery.findFirst({where: {id : parseInt(id)}})
   
    if(gallery){
        unlink(gallery?.path! , (error) => {
            if (error) {
                return NextResponse.json(error , {status: 500});
              }
        });
        await prisma.gallery.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json("File removed successfully" , {status: 200});
    }else{
        return NextResponse.json("File is not exist." , {status: 404});
    }

   
   
}