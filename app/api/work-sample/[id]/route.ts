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

export async function GET( request: NextRequest ,
    { params }: { params: { id: string } }){

   const id = params.id;
   try{
       const sample = await prisma.sample.findUnique({where : {id: id}})
       return NextResponse.json(sample, {status: 200});
   }catch(error){
       return NextResponse.json(error, {status: 500});
   }
}

export async function PUT( request: NextRequest ,
    { params }: { params: { id: string } }){
        const body = await request.json();
        const id = params.id;
   try{
       const sample = await prisma.sample.update({
            where : {id: id} ,
            data: {
                title : body.title,
                body : body.body,
                status : body.status == '0' ? false : true,
                slug : body.slug,
                image : body.image ? body.image : '' ,
            }
       })
       return NextResponse.json(sample, {status: 200});
   }catch(error){
       return NextResponse.json(error, {status: 500});
   }
}
