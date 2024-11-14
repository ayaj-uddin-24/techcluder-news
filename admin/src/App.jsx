import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import ManagePosts from "./pages/ManagePosts";
import AddImage from "./pages/AddImage";
import ManageImages from "./pages/ManageImages";
import Albums from "./pages/Albums";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.min.css";
import EditPost from "./pages/EditPost";
export const url = "http://localhost:5000";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/manage-post" element={<ManagePosts />} />
        <Route path="/add-image" element={<AddImage />} />
        <Route path="/manage-images" element={<ManageImages />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
};

export default App;
