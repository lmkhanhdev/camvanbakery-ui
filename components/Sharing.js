import Center from "./Center";
import HeadTitle from "./HeadTitle";

export default function Sharing() {
  return (
    <div className="mt-32">
      <Center>
        <HeadTitle>Sharing</HeadTitle>
        <div className="w-full max-h-screen my-10">
          <div className="flex justify-center">
            <img
              src="https://websitedemos.net/sweet-shop-04/wp-content/uploads/sites/101/2017/10/clientimage-free-img.png"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="my-10 text-gray-600 font-medium">
              &quot;Tôi là đầu bếp bánh ngọt tại đây, và niềm vui lớn nhất của
              tôi là mang đến cho các bạn những trải nghiệm <br /> ngon miệng
              không ngừng. Ở đây, từng chiếc bánh không chỉ là sản phẩm của sự
              sáng tạo nghệ thuật <br /> và kỹ thuật nấu ăn, mà còn chứa đựng
              tình yêu thấm đẫm và chân thành.&quot;
            </p>
            <h2 className="text-3xl text-yellow-600 font-serif font-semibold italic">
              Cẩm Vân
            </h2>
          </div>
        </div>
      </Center>
    </div>
  );
}
