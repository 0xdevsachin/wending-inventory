import { Router } from "express";
import {
  getAllInventory,
  buyInventoryItem,
  createInventoryBulk,
  updateInventoryItem,
} from "../controller/inventoryController";
import jwtAuth from "../middleware/adminMiddleware";

const router = Router();

router.get("/", getAllInventory);
router.post("/buy", buyInventoryItem);

router.post("/bulk", jwtAuth, createInventoryBulk);
router.put("/update/:id", jwtAuth, updateInventoryItem);

export default router;
