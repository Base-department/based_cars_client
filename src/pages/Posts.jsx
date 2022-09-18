import React, { useEffect, useRef, useState } from "react";
import "../styles/App.css";
import PostList from "../components/PostList";
import PostService from "../API/PostService";
import { getPagesArray, getPageCount } from "../utils/pages";
import { useFetching } from "../hooks/useFetching";
import Pagination from "../components/UI/pagination/Pagination";
import MyModal from "../components/UI/MyModal/MyModal";
import MyInput from "../components/UI/input/input";
import MyButton from "../components/UI/button/MyButton";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const lastElement = useRef();
  const observer = useRef();
  const [modal,setModal] = useState(false)

  const [fetchPosts, ispostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      //console.log(totalCount);
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
  const bodyInputRefId = useRef();
  const bodyInputRefModel = useRef();
  const bodyInputRefOwner = useRef();
  const bodyInputRefMileage = useRef();

  const commit = (e)=>{
    PostService.create(
        bodyInputRefId.current.value,
        bodyInputRefModel.current.value,
        bodyInputRefOwner.current.value,
        bodyInputRefMileage.current.value)
    //router('/posts')
  }

  return (
    <div className="App">
      <MyModal visible={modal}>
        <form>
          <fieldset>
            <form>
              <legend>Id авто</legend>
              <MyInput ref={bodyInputRefId} type="text" placeholder="Id авто" />
              <legend>Модель авто</legend>
              <MyInput ref={bodyInputRefModel} type="text" placeholder="Модель авто" />
              <legend>Владелец</legend>
              <MyInput ref={bodyInputRefOwner} type="text" placeholder="Владелец" />
              <legend>Пробег</legend>
              <MyInput ref={bodyInputRefMileage} type="text" placeholder="Пробег" />
              <MyButton onClick = {commit}>Сохранить</MyButton>
            </form>
          </fieldset>
        </form>
      </MyModal>
      { <button onClick={(e)=> {
        e.preventDefault();setModal(true)
      }}>Добавить авто</button> }
      <PostList posts={posts} title="Список автомобилей" />
      <div ref={lastElement} style={{ height: 20 }} />
      {/*<Pagination page={page} changePage={changePage} totalPages={totalPages} />*/}
    </div>
  );
}

export default Posts;
