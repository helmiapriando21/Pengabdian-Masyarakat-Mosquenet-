"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
    try {
        const request = await req.json();
        const email = cookieStore.get('email');

        if(email) {
          request.email = email.value;
          const response = await axios.post(
              `${process.env.API_URL}/auth/forgot/verify-account`, 
              { data: request }
          );
          return new Response(JSON.stringify({
              message: response.data.message
          }), {
              status: response.data.status,
              headers: { "Content-Type": "application/json" },
          });
        } else {
          return new Response(JSON.stringify({
            message: "Verifikasi gagal dilakukan!"
          }), {
              status: 401,
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