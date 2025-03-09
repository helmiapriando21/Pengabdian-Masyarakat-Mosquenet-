/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const mosques = await axios.get(`${process.env.API_URL}/mosque/list`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    
        return new Response(JSON.stringify({
            mosques: mosques.data.mosques,
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Fetch error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}