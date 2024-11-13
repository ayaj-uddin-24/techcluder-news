import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";

const ManagePosts = () => {
  const { posts } = useContext(BlogContext);
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
              <tr className="border" key={item.id}>
                <td>
                  <img src={item.image} alt="post" className="h-20 mx-auto" />
                </td>
                <td>{item.title.slice(0, 30)}...</td>
                <td>{item.content.slice(0, 50)}...</td>
                <td>
                  <Link className="bg-red-600 px-2 py-1 text-white font-semibold rounded-md text-sm">
                    Edit
                  </Link>
                </td>
                <td>
                  <button className="bg-red-800 px-2 py-1 text-white font-semibold rounded-md text-sm">
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
