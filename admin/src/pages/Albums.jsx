import React, { useContext, useState } from "react";
import { BlogContext } from "../contexts/BlogContext";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const Albums = () => {
  const { albums } = useContext(BlogContext);
  const [albumData, setAlbumData] = useState("");

  const changeHandler = (e) => {
    setAlbumData(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${url}/api/album/add-album`, {
      name: albumData,
    });

    if (res.data.success) {
      toast.success(res.data.message);
      setAlbumData("");
    }
  };

  const removeAlbum = async (id) => {
    const res = await axios.delete(`${url}/api/album/remove-album/${id}`);
    if (res.data.success) {
      toast.success(res.data.message);
    }
  };

  return (
    <div className="px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
      <h1 className="text-3xl font-bold text-center pb-10">Add New Album</h1>

      <form
        action="#"
        method="post"
        className="mx-auto px-0 lg:px-36"
        onSubmit={submitHandler}
      >
        <p className="pb-3">Album Name</p>
        <input
          type="text"
          className="border border-gray-900 px-2 py-1 outline-none"
          value={albumData}
          onChange={changeHandler}
          required
        />
        <br />
        <br />
        <button className="bg-red-900 text-white px-5 py-1 w-1/3 font-semibold hover:bg-red-700 transition-all">
          Add
        </button>
      </form>

      <h1 className="text-3xl font-bold text-center pb-10 pt-20">
        Albums List
      </h1>
      <table className="w-full lg:w-1/2 mx-auto border-collapse border text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {albums.length > 0
            ? albums.map((album, index) => {
                return (
                  <tr className="border" key={index}>
                    <td>{album.name}</td>
                    <td>
                      <button
                        onClick={() => removeAlbum(album._id)}
                        className="bg-red-800 px-2 py-1 text-white font-semibold rounded-md text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            : "No Albums Available"}
        </tbody>
      </table>
    </div>
  );
};

export default Albums;
