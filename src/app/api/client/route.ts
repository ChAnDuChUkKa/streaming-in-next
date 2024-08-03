import { NextApiRequest } from "next";
import { getAllStocksData } from "./client";
import { NextResponse } from "next/server";

let coins: string[] = ["BTC", "ETH", "USDT", "BNB", "SOL"];

// eslint-disable-next-line import/no-anonymous-default-export
export const GET = async (req: NextApiRequest, res: NextResponse) => {
  if (req.method === "GET") {
    try {
      const stocks = await getAllStocksData(coins);
      return NextResponse.json(stocks, { status: 200 });
    } catch (error) {
      console.error("Error fetching stocks from Live Coin:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
};

export const PUT = async (req: NextApiRequest, res: NextResponse) => {
  try {
    console.log(req.body);

    const { coinsList } = req.body;
    console.log(coinsList, "updated coins");
    if (!Array.isArray(coinsList)) {
      return NextResponse.json(
        { error: "Invalid data format. Expected an array of coins." },
        { status: 400 }
      );
    }
    coins = coinsList;
    // const stocks = await getAllStocksData(coins);
    // return NextResponse.json(stocks, { status: 200 });
    return NextResponse.json({message:"updated successfully"},{status:200})
  } catch (error) {
    console.error("Error updating coins list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextResponse) => {
  if (req.method === "GET") {
    await GET(req, res);
  } else if (req.method === "PUT") {
    await PUT(req, res);
  } else {
    NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
};
