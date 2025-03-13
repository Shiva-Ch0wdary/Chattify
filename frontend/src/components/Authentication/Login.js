import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import "./login.css";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post("/api/user/login", { email, password }, config);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const fillGuestCredentials = () => {
    setEmail("guest@example.com");
    setPassword("123456");
  };

  return (
    <div className="login-box-inner">
      <form onSubmit={submitHandler}>
        <div className="user-box">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
          <button type="button" onClick={handleClick} className="toggle-btn">
            {show ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" className="submit-btn">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </button>
      </form>
      <button
        type="button"
        onClick={fillGuestCredentials}
        className="submit-btn guest-btn"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Guest Credentials
      </button>
    </div>
  );
};

export default Login;
