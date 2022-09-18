import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/input";

const PostIdPages = () => {
  const router = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({});

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [delPostById, isLoad, err] = useFetching(async (id) => {
    const response = await PostService.deleteById(id);
  });

  useEffect(() => {
    fetchPostById(params.id);
    // delPostById(params.id);
  }, []);
  return (
    <center>
      <div>
        <h1>Вы открыли страницу автомобиля с Id = {params.id}</h1>
        <form>
          <fieldset>
            <form>
              <legend>Id авто</legend>
              <MyInput value={params.id} type="text" placeholder="Id авто" />
              <legend>Модель авто</legend>
              <MyInput type="text" placeholder="Модель авто" />
              <legend>Владелец</legend>
              <MyInput type="text" placeholder="Владелец" />
              <legend>Пробег</legend>
              <MyInput type="text" placeholder="Пробег" />
              <MyButton>Изменить</MyButton>
              <MyButton>Сохранить</MyButton>
            </form>
          </fieldset>
          <button
            onClick={() => {
              const response = PostService.deleteById(params.id);
              router(`/posts`);
            }}
          >
            Удалить
          </button>
        </form>
      </div>
    </center>
  );
};

export default PostIdPages;
