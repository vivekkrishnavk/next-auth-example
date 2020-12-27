import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Router from "next/router";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  return (
    <div>
      <Head>
        <title>Auth Example</title>
      </Head>

      <div className="hero">
        <h1 className="title">Click the Login Button</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            axios
              .post("http://localhost:3000/api/login", {
                username,
                password,
              })
              .then((response) => {
                const { sub, name, ttl } = response.data;
                localStorage.setItem("sub", sub);
                localStorage.setItem("name", name);
                localStorage.setItem("ttl", ttl);
                setLoginSuccess(true);
                Router.push("/my-account");
              });
          }}
        >
          <div className="row">
            <p style={{ margin: 0, paddingRight: "20px" }}>Username</p>
            <input
              name="Username"
              type="text"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className="row">
            <p style={{ margin: 0, paddingRight: "20px" }}>Password</p>
            <input
              name="Password"
              type="text"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          {loginSuccess && (
            <div style={{ display: "flex" }}>
              <label
                style={{
                  margin: "0 auto",
                  fontSize: "20px",
                  color: "green",
                  fontWeight: 600,
                }}
              >
                Login Success! Please check the cookies and the local store.
              </label>
            </div>
          )}
          <input className="submit" type="submit" />
        </form>
      </div>

      <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 30px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        width: 100%;
        height: auto;
        margin: 20px auto 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .submit {
        width: 60px,
        height: auto;
        margin: 20px auto 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
    </div>
  );
};

export default Home;
