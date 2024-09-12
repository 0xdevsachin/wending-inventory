import mongoose, { Document, Schema } from "mongoose";

interface IInventoryItem extends Document {
  name: string;
  price: number;
  available_units: number;
  display_image_url?: string;
}

const InventorySchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available_units: { type: Number, required: true },
  display_image_url: {
    type: String,
    default:
      "https://i0.wp.com/wendor.in/wp-content/uploads/2022/12/@work-e1688023902757.webp",
  },
});

const Inventory = mongoose.model<IInventoryItem>("Inventory", InventorySchema);

export default Inventory;
