import { Request, Response } from "express";
import Inventory from "../models/inventoryModel";

export const getAllInventory = async (req: Request, res: Response) => {
  try {
    const availableInventory = await Inventory.find({
      available_units: { $gt: 0 },
    });
    res.status(200).json(availableInventory);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const buyInventoryItem = async (req: Request, res: Response) => {
  const { quantity, id } = req.body;

  try {
    const item = await Inventory.findOne({ _id: id });

    if (!item || item.available_units < quantity) {
      return res
        .status(400)
        .json({ error: "Item not available or insufficient quantity" });
    }

    item.available_units -= quantity;
    await item.save();

    res.json({ message: `You bought ${quantity} ${item.name}(s)` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createInventoryBulk = async (req: Request, res: Response) => {
  const { items } = req.body;

  if (!items || !items?.length) {
    res.status(400).json({ message: "Items can't be empty" });
    return;
  }
  try {
    await Inventory.insertMany(items);
    res.status(201).json({ message: "Inventory added successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { price, available_units, display_image_url } = req.body;

  try {
    const item = await Inventory.findOne({ _id: id });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.price = price ?? item.price;
    item.available_units = available_units ?? item.available_units;
    item.display_image_url = display_image_url ?? item.display_image_url;

    await item.save();

    res.json({ message: "Item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
