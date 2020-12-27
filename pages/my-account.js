import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";

const MyAccount = () => {
  const [refreshed, setRefreshed] = useState(false);
  useEffect(() => {
    const sub = localStorage.getItem("sub");
    if (sub === null || sub === undefined) {
      Router.push("/");
    }
  }, []);
  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <div
        style={{
          display: "flex",
          marginTop: "100px",
          justifyContent: "center",
        }}
      >
        <p style={{ marginRight: "20px" }}>
          <button
            onClick={() => {
              axios.post("/api/logout").then(() => {
                localStorage.removeItem("sub");
                localStorage.removeItem("name");
                localStorage.removeItem("ttl");
                console.log("logged out!");
              });
              Router.reload();
            }}
          >
            Logout
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              axios.post("/api/refresh").then((response) => {
                const { sub, name, ttl } = response.data;
                localStorage.setItem("sub", sub);
                localStorage.setItem("name", name);
                localStorage.setItem("ttl", ttl);
                setRefreshed(true);
                console.log("logged out!");
              });
            }}
          >
            Refresh
          </button>
        </p>
      </div>
      {refreshed && (
        <div style={{ display: "flex" }}>
          <label
            style={{
              margin: "0 auto",
              fontSize: "20px",
              color: "green",
              fontWeight: 600,
            }}
          >
            Refresh Success! Please check the cookies and the local store.
          </label>
        </div>
      )}
    </>
  );
};

export default MyAccount;
