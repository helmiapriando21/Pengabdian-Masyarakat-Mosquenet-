/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const request = await req.json();
        const response = await axios.post(
            `${process.env.API_URL}/auth/register`, 
            {
                data: request,
                destination: request.destination
            }
        );
    
        return new Response(JSON.stringify({
            message: response.data.message
        }), {
            status: response.data.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Fetch error:", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}