import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";
import { Divider } from "antd";

import "./style.css";
import Title from "../../components/Title/Title.js";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [token, setToken] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    setToken("123456789");
  };

  const loginGoogleStuff = () => {
    console.log("Login with Google!");
  };

  if (token) {
    Navigate("/home");
  }

  return (
    <div id="login-page" className="page">
      <form className="card-form" onSubmit={handleSubmit(onSubmit)}>
        <Title title={"Login Page"} />
        <input
          className="form-field"
          {...register("username", { required: true })}
          placeholder="Username"
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

        <div onClick={loginGoogleStuff} className="login-google">
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
