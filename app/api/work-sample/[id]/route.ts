import prisma from "@/prisma/client";
import {type NextRequest ,  NextResponse} from "next/server";

interface WorkSampleQuery {
    id: string; // Assuming 'id' is a string, adjust it based on your requirements
  }

export async function DELETE( request: NextRequest ,
     { params }: { params: { id: string } }){

    const id = params.id;
    try{
        const sample = await prisma.sample.delete({where : {id: parseInt(id)}})
        return NextResponse.json(sample, {status: 200});
    }catch(error){
        return NextResponse.json(error, {status: 500});
    }
}
