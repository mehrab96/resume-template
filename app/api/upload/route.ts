import {NextRequest , NextResponse} from "next/server";
import { writeFile } from "fs/promises";
import{ join } from "path";

export const config = {
    api : {
        bodyParser : false
    }
}

export async function POST(req: NextRequest){
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if(!file) {
        return NextResponse.json('not found' , {status: 404});
    }

    const bytes = await file.arrayBuffer();
    const buffer =  Buffer.from(bytes);

    const destinationPath = join(process.cwd(), 'public', 'uploads', file.name);
    await writeFile(destinationPath , buffer);

    return NextResponse.json(file , {status: 200});

   
}


