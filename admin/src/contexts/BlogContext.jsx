import { createContext, useEffect, useState } from "react";
import { url } from "../App";
import axios from "axios";

export const BlogContext = createContext(null);

const BlogContextProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);

  const albumsData = async () => {
    const res = await axios.get(`${url}/api/album/get-album`);
    setAlbums(res.data.albums);
  };

  const postData = async () => {
    const res = await axios.get(`${url}/api/post/get-post`);
    setPosts(res.data.posts);
  };

  const imagesData = async () => {
    const res = await axios.get(`${url}/api/image/get-img`);
    setImages(res.data.images);
  };

  useEffect(() => {
    albumsData();
    postData();
    imagesData();
  }, []);

  const value = { albums, posts, images };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
