import type { NextApiRequest, NextApiResponse } from "next";
import { StoreType } from "@/interface";

export default async function handler {
    req: NextApiRequest,
    res: NextApiResponse<StoreType []>
) {
//   resizeBy.status(200).json({name:"Jone Doe"});
 const stores = await import("../../data/store_data.json"))[
    "DATA"
] as StoreType[];
   res.status(200).json(stores);
}    