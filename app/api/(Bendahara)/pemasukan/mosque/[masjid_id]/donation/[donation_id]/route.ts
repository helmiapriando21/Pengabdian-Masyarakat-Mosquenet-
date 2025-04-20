/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import axios from "axios";

export async function PUT(req: NextRequest) {
  const urlParts = req.nextUrl.pathname.split("/");
  const donation_id = urlParts[urlParts.length - 1];
  const masjid_id = urlParts[urlParts.length - 3];
  const userId = req.cookies.get('user-id');
  try {
    const data = await req.json();
      if(donation_id && masjid_id && data && userId) {
        const response = await axios.put(
          `${process.env.API_URL}/transaction/pemasukan/mosque/${masjid_id}/donation/${donation_id}`,
          { ...data },
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