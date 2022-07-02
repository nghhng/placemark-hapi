import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  description: String,
  lat: Number,
  lng: Number,
  img: String, 
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
