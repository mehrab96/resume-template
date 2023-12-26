import {NextRequest , NextResponse} from "next/server";
import { writeFile } from "fs/promises";
import fs  from "fs";
import{ join } from "path";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";


export async function POST(req: NextRequest){
    const data = await req.formData();
    const file: File | null = data.get('file') as File;

    if(!file) {
        return NextResponse.json('not found' , {status: 404});
    }

    const bytes = await file.arrayBuffer();
    const buffer =  Buffer.from(bytes);

    const dir = join(process.cwd(), 'public', 'upload');
    const destinationPath = join(process.cwd(), 'public', 'upload', file.name);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    
    await writeFile(destinationPath , buffer);


    try{
        const session = await getServerSession(authOptions);
        const user = await prisma.user.findFirst({ where: { email: session?.user?.email ? session?.user?.email : '' } });

        const newGallery = await prisma.gallery.create({
            data: {
                name : file.name,
                size : file.size,
                format : file.type,
                path : destinationPath,
                url : "/upload/" + file.name,
                userId: user?.id
            }
        });
         return NextResponse.json(newGallery , {status: 200});
    }catch(error){
        return NextResponse.json(error , {status:501});
    }

   
}
