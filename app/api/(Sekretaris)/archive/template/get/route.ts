/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const userId = req.cookies.get('user-id');
    try {
      if(userId) {
        const response = await axios.post(
          `${process.env.API_URL}/archive/templates`, 
          {
            user_id: userId.value,
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        return new Response(JSON.stringify({
          templates: response.data.templates
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