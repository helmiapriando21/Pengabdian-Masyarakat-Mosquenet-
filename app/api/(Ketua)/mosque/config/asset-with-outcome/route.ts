/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import axios from "axios";

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const userId = req.cookies.get("user-id")
    try {
      if(userId) {
        const response = await axios.put(
          `${process.env.API_URL}/mosque/configuration/asset-with-outcome`, 
          data,
          {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userId.value
            },
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
          message: "Akses Ilegal!"
        }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.response.data.message || error.message, }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}