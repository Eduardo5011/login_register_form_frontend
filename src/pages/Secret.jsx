import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "../components/axios";
import { ToastContainer, toast } from "react-toastify";

const AUTH_URL = "/";

const Secret = () => {
  const navigate = useNavigate();
  const [cookies, removeCookies] = useCookies([]);

  useEffect(() => {
    const verifyUser = async (user) => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          AUTH_URL,
          {},
          { withCredentials: true }
        );
        if(!data.status) {
          removeCookies("jwt")
          navigate("/login");
        } else toast(`HI ${data.user}`, {theme:"dark"})
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookies]);

  const logout = () => {
    removeCookies("jwt")
    navigate("/register");

  };

  return (
    <>
    <div className="private">
      <h1>SUper Secret Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
      <ToastContainer />
    </>
  );
};
export default Secret;
