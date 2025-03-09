/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.cookies.get('user-id');
        const adminStatus = req.cookies.get('admin-status');
        const adminRole = req.cookies.get('admin-role');
        const masterStatus = req.cookies.get('master-status');
        
        if( !userId ) {
            return new Response(JSON.stringify({
                isLogin: false,
            }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({
                isLogin: true,
                adminStatus,
                adminRole, 
                masterStatus
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