//Компонент страница отдельного автомобиля

import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/input";

const PostIdPages = () => {
  // хук для перехода между страницами
  const router = useNavigate();

  //получение параметров
  const params = useParams();

  //состояние для сохранения информации о посте
  const [post, setPost] = useState({});

  //Подгрузка информации об конкретном авто
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  //подгрузка параметров при открытии страницы
  useEffect(() => {
    fetchPostById(params.id);
  }, []);

  //ссылки для создания неуправляемых инпутов в форме для изменения
  const bodyInputRefModel = useRef();
  const bodyInputRefOwner = useRef();
  const bodyInputRefMileage = useRef();

  //состояние для вызова модального окна изменения
  const [modal, setModal] = useState(false);

  //функция обновления информации о конкретном авто
  const update = (e) => {
    PostService.update(
      params.id,
      bodyInputRefModel.current.value,
      bodyInputRefOwner.current.value,
      bodyInputRefMileage.current.value
    );
    router("/posts");
  };
  //Далее реализована карточка конкретного авто, кнопки удалить и изменить, также
  //Модальная форма для изменения
  return (
    <center>
      <div>
        <h1>Вы открыли страницу автомобиля с Id = {params.id}</h1>
        <MyModal visible={modal}>
          <form>
            <fieldset>
              <form>
                <legend>Id авто</legend>
                <MyInput value={post.id} type="text" placeholder="Id авто" />
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
                <MyButton onClick={update}>Сохранить</MyButton>
              </form>
            </fieldset>
          </form>
        </MyModal>
        <form>
          <fieldset>
            <form>
              <legend>Id авто</legend>
              <MyInput value={post.id} type="text" placeholder="Id авто" />
              <legend>Модель авто</legend>
              <MyInput
                value={post.model}
                type="text"
                placeholder="Модель авто"
              />
              <legend>Владелец</legend>
              <MyInput value={post.owner} type="text" placeholder="Владелец" />
              <legend>Пробег</legend>
              <MyInput value={post.mileage} type="text" placeholder="Пробег" />
              <MyButton
                onClick={(e) => {
                  e.preventDefault();
                  setModal(true);
                }}
              >
                Изменить
              </MyButton>
              {/* Кнопка для удаления информации об отдельном авто */}
              <MyButton
                onClick={() => {
                  const response = PostService.deleteById(params.id);
                  router(`/posts`);
                }}
              >
                Удалить
              </MyButton>
            </form>
          </fieldset>
        </form>
      </div>
    </center>
  );
};

export default PostIdPages;
