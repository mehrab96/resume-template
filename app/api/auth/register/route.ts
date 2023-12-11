import {NextRequest , NextResponse} from "next/server";
import prisma from "@/prisma/client";
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest){
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

   

    try {
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
      
        console.log('New User:', newUser);
      
        return NextResponse.json(newUser, { status: 201 });
      } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      } finally {
        await prisma.$disconnect();
      }
    
   
}


