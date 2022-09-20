import React from "react";
import classes from "./MyInput.module.css";

//Компонент инпут

const MyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} className={classes.myInput} {...props} />;
});

export default MyInput;
