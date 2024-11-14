import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const quillRef = useRef(null); // Added a ref for ReactQuill component
  const [img, setImg] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    content: "", // For React-Quill editor
    image: img,
  });

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${url}/api/post/${id}`);
        if (response.data.success) {
          const { title, content, imageUrl } = response.data.post;
          setPostData({ title, content });
          setImg(imageUrl); // Set existing image URL
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
        toast.error("Failed to load post data");
      }
    };
    fetchPostData();
  }, [id]);

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
    formData.append("image", img instanceof File ? img : null); // Only append image if it's a new file

    try {
      const response = await axios.post(
        `${url}/api/post/edit-post/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form data after successful submission
        setPostData({
          title: "",
          content: "",
        });

        if (img && img instanceof File) {
          URL.revokeObjectURL(img); // Cleanup object URL for new images
        }
        setImg(null);
      }
      console.log("Post updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    }
  };

  return (
    <div className="px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
      <h1 className="text-3xl font-bold text-center">Edit Post</h1>

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
              src={
                img instanceof File
                  ? URL.createObjectURL(img)
                  : img || "/upload_area.svg"
              }
              alt="upload area"
              className="mb-5 h-[200px]"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-red-600 w-full p-2 text-white font-semibold rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
