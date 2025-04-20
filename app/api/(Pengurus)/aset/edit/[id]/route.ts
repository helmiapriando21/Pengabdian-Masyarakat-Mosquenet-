/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const userId = req.cookies.get('user-id');
  const urlParts = req.nextUrl.pathname.split("/");
  const id = urlParts[urlParts.length - 1];
  const data = await req.json();
    try {
      if(userId && id) {
        const response = await axios.put(
          `${process.env.API_URL}/aset/${id}`, 
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userId.value
            }
          }
        );
        return new Response(JSON.stringify({
          message: response.data.message
        }), {
          status: response.data.status,
          headers: { "Content-Type": "application/json" }
        });
      } else {
        return new Response(JSON.stringify({
          message: "Akses illegal!"
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
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