import { Category } from "./category.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async findById(id) {
    const category = await Category.findOne({ _id: id }).lean();
    return category;
  },

  async findByTitle(title) {
    const category = await Category.findOne({
      title
    });
    return category;
  },

  async category(title) {
    const newCategory = new Category({title});
    await newCategory.save();
    console.log("Saved Category")
    return newCategory;
  }
};
