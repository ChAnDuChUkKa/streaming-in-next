import { NextApiRequest, NextApiResponse } from "next";
import { getStocksFromMongoDb } from "../db";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // const coins = Array.isArray(coinsParam) ? coinsParam : coinsParam.split(',');
      const stocks = await getStocksFromMongoDb();
      // res.status(200).json(stocks);
      return NextResponse.json(stocks);
    } catch (error) {
      console.error("Error fetching stocks from MongoDB:", error);
      return NextResponse.json({ error: "Failed to fetch stocks data" });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
};

