/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.cookies.get('user-id');
        
        if( !userId ) {
            return new Response(JSON.stringify({
                isLogin: false,
            }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            const data = await axios.post(
              `${process.env.API_URL}/auth/check`,
              { user_id: userId.value }
            );
            
            return new Response(JSON.stringify({
                isLogin: true,
                adminStatus: data.data.admin.status,
                adminRole: data.data.admin.role, 
                masterStatus: data.data.master.status
            }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error: any) {
        console.error("Fetch error:", error);
        return new Response(JSON.stringify({ error: error.response.data.message || error.message, }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}