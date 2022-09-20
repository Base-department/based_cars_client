//Главная страница сайта с информацией о всех авто

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
  //Состояние для хранения информации о всех авто
  const [posts, setPosts] = useState([]);

  //Состояние для хранения количества страниц
  const [totalPages, setTotalPages] = useState(1);

  //Состояние для хранения ограничения по отрисовке постов на странице, по дефолту 12
  const [limit, setLimit] = useState(12);

  //Состояние для хранения номера страницы
  const [page, setPage] = useState(1);

  //Ссылка на элемент-датчик в конце страницы для реализации подгрузки при прокрутке
  const lastElement = useRef();

  //Сслыка на элемент, позволяющий следить за датчкиком в конце страницы
  const observer = useRef();

  //Состояние для модального окна
  const [modal, setModal] = useState(false);

  //Подгрузка информации о постах в том количестве, которые задает limit,
  //вызывается в случае необходимости подгрузить новые посты
  const [fetchPosts, ispostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  //Хук для реализации подгрузки новых постов при прокрутке страницы,
  //работает при помощи observer API
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

  //Хук для подгрузки постов при подгрузке новой страницы
  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]);

  //Изменение номера актуальной страницы
  const changePage = (page) => {
    setPage(page);
  };

  //Хуки для сохранения информации из неуправляемых инпутов в модальной форме
  const bodyInputRefId = useRef();
  const bodyInputRefModel = useRef();
  const bodyInputRefOwner = useRef();
  const bodyInputRefMileage = useRef();

  //Функция создания нового поста по информации, введеной в форме модального окна
  const commit = (e) => {
    PostService.create(
      bodyInputRefId.current.value,
      bodyInputRefModel.current.value,
      bodyInputRefOwner.current.value,
      bodyInputRefMileage.current.value
    );
  };

  return (
    <div className="App">
      {/* Реализация формы для создания нового поста */}
      <MyModal visible={modal}>
        <form>
          <fieldset>
            <form>
              <legend>Id авто</legend>
              <MyInput ref={bodyInputRefId} type="text" placeholder="Id авто" />
              <legend>Модель авто</legend>
              <MyInput
                ref={bodyInputRefModel}
                type="text"
                placeholder="Модель авто"
              />
              <legend>Владелец</legend>
              <MyInput
                ref={bodyInputRefOwner}
                type="text"
                placeholder="Владелец"
              />
              <legend>Пробег</legend>
              <MyInput
                ref={bodyInputRefMileage}
                type="text"
                placeholder="Пробег"
              />
              <MyButton onClick={commit}>Сохранить</MyButton>
            </form>
          </fieldset>
        </form>
      </MyModal>
      {
        <button
          onClick={(e) => {
            e.preventDefault();
            setModal(true);
          }}
        >
          Добавить авто
        </button>
      }
      {/* Развертывание списка всех автомобилей */}
      <PostList posts={posts} title="Список автомобилей" />

      {/* Элемент в конце страницы для подгрузки новых страницы при прокрутке */}
      <div ref={lastElement} style={{ height: 20 }} />

      {/* Ниже реализовано переключение между отдельными страницами, но после добавления
      динамической подгрузки постов надобность в нем исчезла */}
      {/*<Pagination page={page} changePage={changePage} totalPages={totalPages} />*/}
    </div>
  );
}

export default Posts;
