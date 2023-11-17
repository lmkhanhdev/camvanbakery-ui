import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Chỉ nên là yêu cầu POST");
    return;
  }

  const { name, phone, date, time, address, note, cartProducts } = req.body;

  // Kết nối đến MongoDB
  await mongooseConnect();

  // Lấy thông tin sản phẩm
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  // Tính tổng số tiền
  let totalAmount = 0;
  let orderProducts = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      totalAmount += quantity * productInfo.price;
      orderProducts.push({
        productId,
        quantity,
        productName: productInfo.title,
      });
    }
  }

  // Tạo đơn hàng trong cơ sở dữ liệu
  const orderDoc = await Order.create({
    name,
    phone,
    date,
    time,
    address,
    note,
    totalAmount,
    paid: false,
    products: orderProducts,
  });

  // Trả về ID đơn hàng hoặc bất kỳ thông tin liên quan nào khác
  res.json({
    orderId: orderDoc._id,
    message:
      "Đơn hàng được tạo thành công. Vui lòng xử lý thanh toán bằng cách sử dụng phương pháp ưa thích của bạn.",
  });
}
