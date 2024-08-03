import { getAllStocksData } from "../client/client";
import { updateCoins } from "../client/route";
import { getStocksFromMongoDb } from "../db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "GET") {
    try {
      // console.log("line 8", req.nextUrl.searchParams.get("coins")?.split(","));
      const newCrypto:string[]=req.nextUrl.searchParams.get("coins")?.split(',')||[];
      const data:string[]=updateCoins(newCrypto)
      await getAllStocksData(data);
      const stocks = await getStocksFromMongoDb();
      return NextResponse.json(stocks);
    } catch (error) {
      // console.error("Error fetching stocks from MongoDB:", error);
      return NextResponse.json({ error: "Failed to fetch stocks data" });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
};

