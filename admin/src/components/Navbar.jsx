import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex items-center justify-between py-5 font-medium px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] shadow">
      {/* Navbar logo */}
      <Link to="/">
        <p className="text-2xl font-semibold">Admin Panel</p>
      </Link>

      {/* Navbar menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/add-post" className="flex flex-col items-center gap-1">
          <p>Add Post</p>
          <hr className="w-2/4 border-none bg-red-700 h-[1.5px] hidden" />
        </NavLink>
        <NavLink
          to="/manage-post"
          className=" flex flex-col items-center gap-1"
        >
          <p>Manage Posts</p>
          <hr className="w-2/4 border-none bg-red-700 h-[1.5px] hidden" />
        </NavLink>
        <NavLink to="/add-image" className="flex flex-col items-center gap-1">
          <p>Add Image</p>
          <hr className="w-2/4 border-none bg-red-700 h-[1.5px] hidden" />
        </NavLink>
        <NavLink
          to="/manage-images"
          className=" flex flex-col items-center gap-1"
        >
          <p>Manage Images</p>
          <hr className="w-2/4 border-none bg-red-700 h-[1.5px] hidden" />
        </NavLink>
        <NavLink to="/albums" className=" flex flex-col items-center gap-1">
          <p>Albums</p>
          <hr className="w-2/4 border-none bg-red-700 h-[1.5px] hidden" />
        </NavLink>
      </ul>

      {/* <div className="flex items-center gap-6"> */}
      {/* <Link to="/auth" className="bg-red-700 text-white px-4 py-2 rounded-lg">
          Sign in
        </Link> */}
      <img
        src="/menu_icon.png"
        alt="menu icon"
        className="w-5 cursor-pointer sm:hidden"
        onClick={() => setVisible(true)}
      />
      {/* </div> */}

      {/* Sidebar for small screen */}
      <div
        className={`flex flex-col gap-8 absolute top-0 sm:hidden right-0 bottom-0 bg-slate-100 z-50 transition-all ${
          visible ? "w-full" : "w-0"
        }`}
        style={{ display: `${visible ? "block" : "none"}` }}
      >
        <div
          className="p-3 cursor-pointer inline-flex gap-3 items-center"
          onClick={() => setVisible(false)}
        >
          <img
            src="/dropdown_icon.png"
            alt="back icon"
            className="h-4 rotate-180"
          />
          <p>Back</p>
        </div>

        <div className="flex flex-col">
          <NavLink
            onClick={() => setVisible(false)}
            className="border p-6"
            to="/add-post"
          >
            Add Post
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="border p-6"
            to="/manage-post"
          >
            Manage Posts
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="border p-6"
            to="/add-image"
          >
            Add Image
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="border p-6"
            to="/manage-images"
          >
            Manage Images
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="border p-6"
            to="/albums"
          >
            Albums
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
