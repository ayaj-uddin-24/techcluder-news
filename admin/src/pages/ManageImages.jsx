import React, { useContext } from "react";
import { BlogContext } from "../contexts/BlogContext";

const ManageImages = () => {
  const { images } = useContext(BlogContext);
  console.log(images);
  return (
    <div className="px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
      <h1 className="text-3xl font-semibold text-center pb-10">
        Manage Images
      </h1>

      <table className="w-full lg:w-1/2 mx-auto border-collapse border text-center">
        <thead>
          <tr>
            <th>Image</th>
            <th>Category</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image, index) => {
            return (
              <tr className="border" key={index}>
                <td>
                  <img
                    src={image.image}
                    alt="post image"
                    className="w-20 h-20 mx-auto"
                  />
                </td>
                <td>{image.category}</td>
                <td>
                  <button className="bg-red-800 px-2 py-1 text-white font-semibold rounded-md text-sm">
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageImages;
