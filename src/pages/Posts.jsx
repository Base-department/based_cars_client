import React, { useEffect, useRef, useState } from "react";
import "../styles/App.css";
import PostList from "../components/PostList";
import PostService from "../API/PostService";
import { getPagesArray, getPageCount } from "../utils/pages";
import { useFetching } from "../hooks/useFetching";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();
  const observer = useRef();

  const [fetchPosts, ispostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useEffect(() => {
    if (ispostsLoading) return;
    if (observer.current) observer.current.disconnect();
    var callback = function (entries, observer) {
      if (entries[0].isIntersecting && page < totalPages) {
        console.log(page);
        setPage(page + 1);
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
  }, [ispostsLoading]);

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]);

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      {/* <button onClick={fetchPosts}>GET POSTS</button> */}
      <PostList posts={posts} title="Список автомобилей" />
      <div ref={lastElement} style={{ height: 20 }} />
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
