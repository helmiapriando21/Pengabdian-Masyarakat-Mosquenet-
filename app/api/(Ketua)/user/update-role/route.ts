/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const cookieStore = await cookies();
    try {
      const response = await axios.post(
        `${process.env.API_URL}/user/update/role`, 
        {
          email: data.email,
          role: data.role
        },
        {
          headers: {
              'Content-Type': 'application/json'
          },
        }
      );

      const userEmail = cookieStore.get('admin-email');

      if(data.email == userEmail?.value) {
        cookieStore.set("admin-role", data.role)
      }

      return new Response(JSON.stringify({
        message: response.data.message
      }), {
        status: response.data.status,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.response.data.message || error.message, }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}