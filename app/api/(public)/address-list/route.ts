"use server"

import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const dataProvince = await axios.get(`${process.env.API_URL}/provinces/list`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const dataCityorRegency = await axios.get(`${process.env.API_URL}/cityorregency/list`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const dataSubdistrict = await axios.get(`${process.env.API_URL}/subdistrict/list`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const dataWard = await axios.get(`${process.env.API_URL}/ward/list`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    
        return new Response(JSON.stringify({
            provinces: dataProvince.data.province,
            citiesorregencies: dataCityorRegency.data.cityorregency,
            subdistricts: dataSubdistrict.data.subdistrict,
            wards: dataWard.data.ward
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Fetch error:", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}