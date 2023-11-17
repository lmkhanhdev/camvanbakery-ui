import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();

  const { term } = req.query;

  try {
    // Kiểm tra nếu `term` có ít nhất 1 ký tự
    if (term.length >= 1) {
      const results = await Product.find({
        title: { $regex: new RegExp(term, "i") }, // Tìm kiếm không phân biệt chữ hoa chữ thường
      });

      res.status(200).json({ results });
    } else {
      // Nếu `term` có ít hơn 1 ký tự, trả về mảng rỗng
      res.status(200).json({ results: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
