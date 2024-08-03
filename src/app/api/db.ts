import {
    StockInfo,
    StockInfoEntity,
  } from "@/lib/types/StocksResponse";
  import { MongoClient } from "mongodb";
    
  const dbUri = process.env.MONGODB_URI || "";
  export const storeStocks = async (data: StockInfo[]):Promise<void> => {
    const client = new MongoClient(dbUri);
    try {
      await client.connect();
      const database = client.db("FomoFactory");
      const collection = database.collection("crypto");
      // setting up empty db
      await collection.deleteMany({});
  
      await collection.insertMany(data);
  
      console.log("Data saved successfully!");
    } catch (error) {
      console.log("Something went wrong while storing data!");
      console.log(error);
    } finally {
      await client.close();
    }
  };
  
  export const getStocksFromMongoDb = async () => {
    const client = new MongoClient(dbUri);
    try {
      await client.connect();
      const database = client.db("FomoFactory");
      const collection = database.collection("crypto");
  
      const responseList = await collection.find().toArray();
      return responseList.map((stock) => {
        return stock as unknown as StockInfoEntity;
      });
    } catch (error) {
      // console.log("Something went wrong while storing data!");
      // console.log(error);
    } finally {
      await client.close();
    }
  };
  
  