import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Secret() {
  const navigate = useNavigate();
  const [cookies, /*setCookie*/, removeCookie] = useCookies([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!cookies.jwt) {
          throw new Error("No JWT token found");
        }

        const { data } = await axios.post(
          "http://localhost:3001",
          {},
          {
            withCredentials: true,
          }
        );

        if (!data.status) {
          throw new Error("User not authenticated");
        }

        toast(`Hi ${data.user}`, {
          theme: "dark",
        });
      } catch (error) {
        console.error(error);
        removeCookie("jwt");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="private">
          <h1>Super Secret Page</h1>
          <button onClick={logOut}>Log out</button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
