
import { connectToDb } from "@/lib/db";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
  
    try {
        const {email , password} = await req.json();

        if(!email || !password) {
            return NextResponse.json({error : "Email and Password is required"} , {status : 400});
        }
        await connectToDb();
        const userExists = await User.findOne({email});

        if(userExists) {
            return NextResponse.json({error : "User already exists"} , {status : 400});
        }


        await User.create({
            email,
            password
        })

        return NextResponse.json({message : "User created successfully"} , {status : 201});

    } catch (error) {

        console.log("Registation Error",error);
        return NextResponse.json({error : "Failed to create user"} , {status : 500});
        
    }
}

