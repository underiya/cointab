import React, { useEffect, useState } from "react";
import { fetchData } from "./Home";
import { useLocation, useParams } from "react-router-dom";

export const Post = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const value = queryParams.get("userId");

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(setData, `posts?userId=${value}`);
  }, []);

  console.log(value);

  return <div>Post</div>;
};
