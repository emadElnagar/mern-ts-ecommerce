import { RequestHandler } from "express";
import Order from "../models/Order";
import Category from "../models/category";
import Product from "../models/product";

// Get best selling products
export const getBestSellingProducts: RequestHandler = async (_req, res) => {
  try {
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const last90Days = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const lastYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

    const getTopProducts = async (startDate: Date) => {
      const sales = await Order.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $unwind: "$orderItems" },
        {
          $group: {
            _id: "$orderItems.product",
            totalSold: { $sum: "$orderItems.quantity" },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 8 },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $lookup: {
            from: "categories",
            localField: "product.category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $project: {
            _id: 0,
            product: 1,
            category: 1,
            totalSold: 1,
          },
        },
      ]);

      return sales;
    };

    const [best30Days, best90Days, bestYear] = await Promise.all([
      getTopProducts(last30Days),
      getTopProducts(last90Days),
      getTopProducts(lastYear),
    ]);

    res.status(200).json({
      last30Days: best30Days,
      last90Days: best90Days,
      lastYear: bestYear,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get best seller by category
export const getBestSellersByCategory: RequestHandler = async (_req, res) => {
  try {
    const categories = await Category.find();
    const result: any = {};
    for (const category of categories) {
      const topProducts = await Order.aggregate([
        { $unwind: "$orderItems" },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        { $match: { "product.category": category._id } },
        {
          $group: {
            _id: "$orderItems.product",
            totalSold: { $sum: "$orderItems.quantity" },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 6 },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
      ]);
      result[category.title] = topProducts;
    }
    res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get best selling categories
export const getBestSellingCategories: RequestHandler = async (_req, res) => {
  try {
    const categorySales = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalSold: { $sum: "$sold" },
          totalProducts: { $sum: 1 },
        },
      },
      { $sort: { totalSold: -1 } },
    ]);

    const categoriesWithNames = await Category.populate(categorySales, {
      path: "_id",
      select: "title",
    });

    res.status(200).json(
      (categoriesWithNames as any[]).map((category: any) => ({
        category: category._id,
        totalSold: category.totalSold,
        totalProducts: category.totalProducts,
      }))
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
