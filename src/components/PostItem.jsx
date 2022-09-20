import React from "react";
import { useNavigate } from "react-router-dom";

//Компонент карточка конкретного автомобиля на главной странице

const PostItem = (props) => {
  const router = useNavigate();
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {" "}
          {props.post.id}. {props.post.model}
        </strong>
        <div>{props.post.owner}</div>
      </div>
      <div className="post__btns>">
        <button onClick={() => router(`/posts/${props.post.id}`)}>
          Информация
        </button>
      </div>
    </div>
  );
};

export default PostItem;
