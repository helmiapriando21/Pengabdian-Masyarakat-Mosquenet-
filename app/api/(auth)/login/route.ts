/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import axios from "axios";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    try {
        const request = await req.json();
        const response = await axios.post(
            `${process.env.API_URL}/auth/login`, 
            { data: request },
            { withCredentials: true }
        );

        cookieStore.set('admin-status', response.data.user.admin.status);
        cookieStore.set('admin-email', request.email);
        cookieStore.set('admin-role', response.data.user.admin.role);
        cookieStore.set('master-status', response.data.user.master.status);
        cookieStore.set('user-id', response.data.user.id);
        cookieStore.set('masjid-id', response.data.user.masjid_id);
    
        return new Response(JSON.stringify({
            message: response.data.message,
            redirect: response.data.user.master.status
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