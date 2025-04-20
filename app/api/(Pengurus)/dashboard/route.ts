/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const userId = req.cookies.get('user-id');
    try {
      if(userId) {
        const response = await axios.get(
          `${process.env.API_URL}/dashboard`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userId.value
            }
          }
        );
        return new Response(JSON.stringify({
          report: response.data.report,
          pemasukan: response.data.pemasukan,
          pengeluaran: response.data.pengeluaran,
          aset: response.data.aset
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