import React, {useRef} from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyModal from "../components/UI/MyModal/MyModal";
import axios from "axios";

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

  const bodyInputRefModel = useRef();
  const bodyInputRefOwner = useRef();
  const bodyInputRefMileage = useRef();


  const [modal, setModal] = useState(false)

  const update = (e)=>{
      PostService.update(params.id,
          bodyInputRefModel.current.value,
          bodyInputRefOwner.current.value,
          bodyInputRefMileage.current.value)
    router('/posts')
  }

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
                <MyInput ref={bodyInputRefModel} type="text" placeholder="Модель авто" />
                <legend>Владелец</legend>
                <MyInput ref={bodyInputRefOwner} type="text" placeholder="Владелец" />
                <legend>Пробег</legend>
                <MyInput ref={bodyInputRefMileage} type="text" placeholder="Пробег" />
                <MyButton onClick = {update}>Сохранить</MyButton>
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
              <MyInput value={post.model} type="text" placeholder="Модель авто" />
              <legend>Владелец</legend>
              <MyInput value={post.owner} type="text" placeholder="Владелец" />
              <legend>Пробег</legend>
              <MyInput value={post.mileage} type="text" placeholder="Пробег" />
              <MyButton onClick = {(e)=> {
                e.preventDefault();setModal(true)
              }}>Изменить</MyButton>
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
