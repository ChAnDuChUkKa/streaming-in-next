import { NextApiRequest } from "next";
import { getAllStocksData } from "./client";
import { NextResponse } from "next/server";
import { log } from "console";

let coins: string[] = ["BTC", "ETH", "USDT", "BNB", "SOL"];

export const updateCoins = (newCoins: string[]) => {
  if(newCoins.length>=1){
    coins = newCoins
    console.log(coins,"coijns")
  return coins
  }else{
    return coins
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export const GET = async (req: NextApiRequest, res: NextResponse) => {
  
  if (req.method === "GET") {
    try {      
      const stocks = await getAllStocksData(coins);
      return NextResponse.json(stocks, { status: 200 });
    } catch (error) {
      // console.error("Error fetching stocks from Live Coin:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
};

export const PUT = async (req: NextApiRequest, res: NextResponse) => {
  try {
    const { coinsList } = req.body;
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


async function fetchData() {
  try {
    await getAllStocksData(coins);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function scheduleFetch() {
  fetchData().then(() => {
    setTimeout(scheduleFetch, 30000);
  }).catch(error => {
    setTimeout(scheduleFetch, 10000); // Schedule next fetch even if there's an error
  });
}


scheduleFetch();