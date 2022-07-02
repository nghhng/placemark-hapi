import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().populate("user").populate("category").lean();
    return placemarks;
  },

  async getPlacemarksByCategory(id) {
    const placemarks = await Placemark.find({ category: id }).populate("user").populate("category").lean();
    return placemarks;
  },

  async getPlacemarksByUser(id) {
    const placemarks = await Placemark.find({ user: id }).populate("user").populate("category").lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
      const placemark = await Placemark.findOne({ _id: id }).populate("user").populate("category").lean();
      return placemark;
  },

  async placemark(name, description, user, category, lat, lng) {
    const newPlacemark = new Placemark({
      name,
      description,
      user: user._id,
      category: category._id,
      lat,
      lng,
    });
    await newPlacemark.save();
    console.log("Saved Placemark")
    return newPlacemark;
  },

  async deleteAll() {
    await Placemark.deleteMany({});
  },

  async deletePlacemarkById(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async updatePlacemark(updatedPlacemark) {
    const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
    placemark.name = updatedPlacemark.name;
    placemark.img = updatedPlacemark.img;
    await placemark.save();
  },
};
