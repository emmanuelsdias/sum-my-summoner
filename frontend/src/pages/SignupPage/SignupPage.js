import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";
import { Divider } from "antd";

import "./style.css";
import Title from "../../components/Title/Title.js";
import { signInWithGoogle, signUpLocal } from "../../api/firebase.js";
import { login } from "../../store";

function SignupPage() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const isLogged = useSelector((state) => state.isLogged);
  const [signed, setSigned] = useState(false);

  const onSubmit = async (data) => {
    const response = await signUpLocal(data.name, data.email, data.password);
    if (response) {
      setSigned(true);
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
    return <Navigate to="/" />;
  }

  if (signed) {
    return <Navigate to="/" />;
  }

  return (
    <div id="signup-page" className="page">
      <form className="card-form" onSubmit={handleSubmit(onSubmit)}>
        <Title title={"Register"} />
        <input
          className="form-field"
          {...register("name", { required: true })}
          placeholder="Your name"
        />
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
        <input className="form-button" type="submit" value="CREATE ACCOUNT" />
        <Link to="/login">Already have an account? Login!</Link>
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

export default SignupPage;
