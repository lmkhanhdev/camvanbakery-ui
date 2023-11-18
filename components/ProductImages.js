import { useState } from "react";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <div className="flex justify-center items-center">
        <img
          src={activeImage}
          alt=""
          className="max-w-full max-h-40 md:max-h-56"
        />
      </div>
      <div className="flex gap-3 flex-grow-0 mt-3 justify-center">
        {images.map((image) => (
          <div
            className={`h-14 md:h-16 w-14 md:w-16 p-1 cursor-pointer rounded-sm ${
              image === activeImage ? "border" : ""
            }`}
            key={image}
            onClick={() => setActiveImage(image)}
          >
            <img
              src={image}
              alt=""
              className="overflow-hidden w-min h-min object-cover rounded-sm"
            />
          </div>
        ))}
      </div>
    </>
  );
}
