/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
    try {
        const request = await req.json();
        const response = await axios.post(
            `${process.env.API_URL}/auth/forgot/find-email`, 
            { data: request }
        );

        cookieStore.set('email', request.email);
    
        return new Response(JSON.stringify({
            message: response.data.message
        }), {
            status: response.data.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Fetch error:", error);
        return new Response(JSON.stringify({ error: error.response.data.message || error.message, }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}