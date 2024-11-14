import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const AddPost = () => {
  const [img, setImg] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    content: "", // For React-Quill editor
    image: img,
  });
  const quillRef = useRef(null); // Added a ref for ReactQuill component

  // Handle change for regular inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  // Handle change for React-Quill editor
  const handleContentChange = (value) => {
    setPostData({
      ...postData,
      content: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted data:", postData);

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("image", img);

    try {
      const response = await axios.post(`${url}/api/post/add-post`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        toast.success(response.data.message);

        setPostData({
          title: "",
          content: "",
        });

        if (img) {
          URL.revokeObjectURL(img); // Cleanup object URL
        }
        setImg(null);
      }
      console.log("Post submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("Failed to submit post");
    }
  };

  return (
    <div className="px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
      <h1 className="text-3xl font-bold text-center">New Post</h1>

      <form
        action="#"
        method="post"
        className="mt-10 px-0 lg:px-36 mx-auto"
        onSubmit={handleSubmit}
      >
        <p className="pb-2 pt-4 text-gray-600">Post Title</p>
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleInputChange}
          placeholder="Post Title"
          className="border-gray-400 border px-2 py-1 outline-none w-[100%] mb-2"
          required
        />
        <p className="pb-2 pt-4 text-gray-600">Post Content</p>
        <ReactQuill
          ref={quillRef} // Added ref to the ReactQuill component
          className="h-[250px] mb-16"
          value={postData.content}
          onChange={handleContentChange}
        />
        <div>
          <p className="pb-3 text-gray-700">Post Image</p>
          <label htmlFor="fileInput">
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setImg(e.target.files[0])}
              hidden
            />
            <img
              src={img ? URL.createObjectURL(img) : "/upload_area.svg"}
              alt="upload area"
              className="mb-5 h-[150px]"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-red-600 w-full p-2 text-white font-semibold rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPost;
