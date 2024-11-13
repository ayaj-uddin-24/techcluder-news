import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPost = () => {
  const [img, setImg] = useState(null);
  return (
    <div className="px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
      <h1 className="text-3xl font-bold text-center">Edit Post</h1>

      <form className="mt-10 px-0 lg:px-36 mx-auto">
        <p className="pb-2 pt-4 text-gray-600">Post Title</p>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          className="border-gray-400 border px-2 py-1 outline-none w-full mb-2"
          required
        />

        <p className="pb-2 pt-4 text-gray-600">Post Content</p>
        <ReactQuill className="h-[250px] mb-16" />

        <div>
          <p className="pb-3 text-gray-700">Post Image</p>
          <label htmlFor="image">
            <input
              type="file"
              id="image"
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
              hidden
            />
            <img
              src={previewImg || "/upload_area.svg"}
              alt="upload area"
              className="mb-5 h-[200px]"
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-red-600 w-full p-2 text-white font-semibold rounded-md"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
