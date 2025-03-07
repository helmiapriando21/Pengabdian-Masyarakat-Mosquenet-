"use server"

import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
    try {
        const userId = req.cookies.get('user-id');
        let data;
        const { searchParams } = new URL(req.url);
        const mosId = searchParams.get('mosId');

        if(mosId) {
          data = await axios.get(`${process.env.API_URL}/mosque/id/${mosId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
          });
        } else if(userId) {
            data = await axios.get(`${process.env.API_URL}/mosque/user/${encodeURIComponent(userId.value)}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            data = {
              data: {
                mosque: null
              }
            };
        }
        
        return new Response(JSON.stringify({
             mosque: data!.data.mosque
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error: any) {
        console.error("Fetch error:", error);
        return new Response(JSON.stringify({ error: error.response.data.message || error.message, }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}