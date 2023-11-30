import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";
import { Divider } from "antd";

import "./style.css";
import Title from "../../components/Title/Title.js";
import { signInWithGoogle, logInLocal } from "../../api/firebase.js";
import { login } from "../../store";

function LoginPage() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const isLogged = useSelector((state) => state.isLogged);

  const onSubmit = async (data) => {
    const response = await logInLocal(data.email, data.password);
    if (response) {
      if (response.name && response.email) {
        dispatch(
          login({
            name: response.name,
            email: response.email,
            authByGoogle: false,
          })
        );
      }
    }
  };

  const onClickGoogle = async () => {
    const response = await signInWithGoogle();
    if (response) {
      if (response.name && response.email) {
        dispatch(
          login({
            name: response.name,
            email: response.email,
            authByGoogle: true,
          })
        );
      }
    }
  };

  if (isLogged) {
    return <Navigate to="/home" />;
  }

  return (
    <div id="login-page" className="page">
      <form className="card-form" onSubmit={handleSubmit(onSubmit)}>
        <Title title={"Login Page"} />
        <input
          className="form-field"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <input
          className="form-field"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        <input className="form-button" type="submit" value="ENTER" />
        <Link to="/signup">No account yet? Register!</Link>
        <Divider type="horizontal" style={{ borderTopColor: "var(--GOLD-2)" }}>
          OR
        </Divider>

        <div onClick={onClickGoogle} className="login-google">
          <GoogleOutlined
            style={{ fontSize: "30px", color: "var(--BLUE-3)" }}
          />
          <span>Continue with Google</span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
