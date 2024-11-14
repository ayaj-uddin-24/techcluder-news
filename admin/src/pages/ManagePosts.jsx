import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const ManagePosts = () => {
  const { posts } = useContext(BlogContext);
  console.log(posts);

  const removePost = async (id) => {
    const res = await axios.delete(`${url}/api/post/remove-post/${id}`);
    if (res.data.success) {
      toast.success(res.data.message);
    }
  };

  return (
    <div className="px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
      <h1 className="text-3xl font-semibold text-center pb-10">Manage Posts</h1>

      {posts ? (
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Content</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item) => (
              <tr className="border" key={item._id}>
                <td>
                  <img src={item.image} alt="post" className="h-20 mx-auto" />
                </td>
                <td>{item.title.slice(0, 30)}...</td>
                {/* <td>{item.content.slice(0, 50)}...</td> */}
                <td dangerouslySetInnerHTML={{__html: item.content.slice(0,50) + " ..."}}></td>
                <td>
                  <Link
                    to={`/edit-post/${item._id}`}
                    className="bg-red-600 px-2 py-1 text-white font-semibold rounded-md text-sm"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => removePost(item._id)}
                    className="bg-red-800 px-2 py-1 text-white font-semibold rounded-md text-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No Post Available"
      )}
    </div>
  );
};

export default ManagePosts;
