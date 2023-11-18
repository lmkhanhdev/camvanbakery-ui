import Center from "@/components/Center";
import HeadTitle from "./HeadTitle";

export default function About({ newAbout }) {
  if (!newAbout || !newAbout.length) {
    return null; // Hoặc bạn có thể hiển thị thông báo không có dữ liệu
  }

  const aboutData = newAbout[0];

  return (
    <Center>
      <div className="w-full h-2/3 my-10">
        <HeadTitle>About Us</HeadTitle>
        <ul
          className="grid grid-cols-1 md:grid-cols-2 items-center
          gap-5 w-full"
        >
          <li className="w-full flex justify-center items-center">
            <img
              src={aboutData.images[0]}
              alt={aboutData.title}
              className="max-w-full max-h-full rounded-md"
            />
          </li>
          <li>
            <h1 className="text-4xl text-yellow-600 font-serif mt-10 mb-5">
              {aboutData.title}
            </h1>
            <p className="text-gray-500 ">
              Camvanbakery không chỉ là nơi để thưởng thức hương vị tinh tế của
              bánh ngọt, mà còn là điểm hẹn của những người yêu thích không gian
              ấm áp và thân thiện. Chúng tôi tin rằng bánh ngọt không chỉ là đơn
              thuần là thức ăn, mà còn là ngôn ngữ của tình cảm và niềm vui. Hãy
              đến và chia sẻ cùng chúng tôi những khoảnh khắc ngọt ngào tại
              Camvanbakery, nơi mà bánh ngọt trở thành biểu tượng của niềm hạnh
              phúc và sự sum vầy gia đình
            </p>
          </li>
        </ul>
      </div>
    </Center>
  );
}
