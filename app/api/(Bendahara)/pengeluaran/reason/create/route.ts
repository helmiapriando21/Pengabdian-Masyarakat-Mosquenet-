/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const userId = req.cookies.get('user-id');
  const data = await req.json();
    try {
      if(userId) {
        const response = await axios.post(
          `${process.env.API_URL}/pengeluaran/reason`, 
          {
            user_id: userId.value,
            name: data.name
          },
          {
            headers: {
              'Content-Type': 'application/json'
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