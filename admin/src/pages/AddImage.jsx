import React from "react";

const AddImage = () => {
  return (
    <div className="px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
      <h1 className="text-3xl font-bold text-center pb-10">Add Image</h1>

      <form action="#" method="post" className="mx-auto px-0 lg:px-36">
        <p className="pb-3">Image URL</p>
        <label htmlFor="img">
          <input type="file" id="img" hidden />
          <img src="/upload_area.svg" alt="" />
        </label>

        <p className="mt-5 mb-2">Select Image Category</p>
        <select
          name="category"
          id="category"
          className="border-gray-900 border px-2 py-1 w-1/3"
        >
          <option value="football">Football</option>
          <option value="tennis">Tennis</option>
          <option value="hocky">Hocky</option>
        </select>

        <br />
        <br />

        <button className="bg-red-900 text-white px-5 py-1 w-1/3 font-semibold hover:bg-red-700 transition-all">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddImage;
