import { NextResponse } from "next/server";
export async function GET(req: Request, res: Response) {
  return NextResponse.json({ error: "Provide Site Name" });
}

//   export const GET  = async (req:Request)=>{

//     const site = req.url.split("t")[1];
//     console.log(req.url);
//   }
