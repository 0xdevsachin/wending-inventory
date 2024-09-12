import { AxiosAPIInstance } from "@/config/axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }
  const { id, quantity } = req.body;
  try {
    const { data } = await AxiosAPIInstance().post(`/api/inventory/buy`, {
      id,
      quantity,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}
