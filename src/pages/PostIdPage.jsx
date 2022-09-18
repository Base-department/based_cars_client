import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostIdPages = () => {
  const router = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [delPostById, isLoad, err] = useFetching(async (id) => {
    const response = await PostService.deleteById(id);
  });

  const [fetchComments, isComLoading, comErorr] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(params.id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
    // delPostById(params.id);
  }, []);
  return (
    <center>
      <div>
        <h1>Вы открыли страницу автомобиля с Id = {params.id}</h1>
        <form>
          <fieldset>
            <legend>Id</legend>
            <input type="text" />
          </fieldset>
          <fieldset>
            <legend>Модель</legend>
            <input type="text" />
          </fieldset>
          <fieldset>
            <legend>Владелец</legend>
            <input type="text" />
          </fieldset>
          <fieldset>
            <legend>Пробег</legend>
            <input type="text" />
          </fieldset>
          <button>Изменить</button>
          <button>Сохранить</button>
          <button
            onClick={async () => {
              const response = await PostService.deleteById(params.id);
              router(`/posts`);
            }}
          >
            Удалить
          </button>
        </form>
        {/* <div>
          {post.id}. {post.title}{" "}
        </div> */}
        {/* <h1> */}
        {/* <div>
          {comments.map((comm) => (
            <div style={{ marginTop: 15 }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div> */}
        {/* </h1> */}
      </div>
    </center>
  );
};

export default PostIdPages;
