import React, { useContext, useState } from "react";
import { BlogContext } from "../contexts/BlogContext";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const AddImage = () => {
  const { albums } = useContext(BlogContext);
  const [img, setImg] = useState(null);
  const [imgData, setImgData] = useState({
    image: img,
    category: "",
  });

  const changeHandler = (e) => {
    setImgData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", imgData.category);
    if (img) formData.append("image", img);

    try {
      const res = await axios.post(`${url}/api/image/add-img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);

        // Reset form data
        setImgData({
          category: "",
        });
        setImg(null);
      }
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
      <h1 className="text-3xl font-bold text-center pb-10">Add Image</h1>

      <form className="mx-auto px-0 lg:px-36" onSubmit={submitHandler}>
        <p className="pb-3">Image URL</p>
        <label htmlFor="img">
          <input
            type="file"
            id="img"
            onChange={(e) => setImg(e.target.files[0])}
            hidden
          />
          <img
            src={img ? URL.createObjectURL(img) : "/upload_area.svg"}
            alt="Preview"
            className="cursor-pointer"
          />
        </label>

        <p className="mt-5 mb-2">Select Image Category</p>
        <select
          name="category"
          id="category"
          value={imgData.category}
          onChange={changeHandler}
          className="border-gray-900 border px-2 py-1 w-1/3"
        >
          <option value="">Select a Category</option>
          {albums.map((album) => (
            <option key={album._id} value={album.name}>
              {album.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button
          type="submit"
          className="bg-red-900 text-white px-5 py-1 w-1/3 font-semibold hover:bg-red-700 transition-all"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddImage;
