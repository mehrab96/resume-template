import prisma from "@/prisma/client";
import {type NextRequest ,  NextResponse} from "next/server";

export async function DELETE( request: NextRequest ,
     { params }: { params: { id: string } }){

    const id = params.id;
    try{
        const sample = await prisma.sample.delete({where : {id: id}})
        return NextResponse.json(sample, {status: 200});
    }catch(error){
        return NextResponse.json(error, {status: 500});
    }
}
