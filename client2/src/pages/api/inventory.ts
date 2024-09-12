import { AxiosAPIInstance } from "@/config/axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }
  try {
    const { data } = await AxiosAPIInstance().get("/api/inventory");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}
