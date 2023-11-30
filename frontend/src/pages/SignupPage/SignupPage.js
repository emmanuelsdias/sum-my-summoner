import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";
import { Divider } from "antd";

import "./style.css";
import Title from "../../components/Title/Title.js";

function SignupPage() {
  const { register, handleSubmit } = useForm();
  const [hasSigned, setHasSigned] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setHasSigned(true);
  };

  if(hasSigned) {
    return <Navigate to="/" />;
  }

  const loginGoogleStuff = () => {
    console.log("Login with Google!");
  };

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

export default SignupPage;
