import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  // Updated postDetails function using async/await and secure_url
  const postDetails = async (pics) => {
    setPicLoading(true);
    if (!pics) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chattify");
      data.append("cloud_name", "drtybovzy");
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/drtybovzy/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const responseData = await res.json();
        if (responseData.error) {
          toast({
            title: "Image upload failed",
            description: responseData.error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
          return;
        }
        // Use secure_url to ensure you have an HTTPS link
        setPic(responseData.secure_url);
        setPicLoading(false);
      } catch (err) {
        console.log(err);
        toast({
          title: "Image upload failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
      }
    } else {
      toast({
        title: "Please Select an Image of type JPEG, JPG, or PNG!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    try {
      const config = { headers: { "Content-type": "application/json" } };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
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
      setPicLoading(false);
    }
  };

  return (
    <div className="login-box-inner">
      <form onSubmit={submitHandler}>
        <div className="user-box">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Name</label>
        </div>
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
        <div className="user-box">
          <input
            type={show ? "text" : "password"}
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            required
          />
          <label>Confirm Password</label>
          <button type="button" onClick={handleClick} className="toggle-btn">
            {show ? "Hide" : "Show"}
          </button>
        </div>
        <div className="user-box">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
          <label>Upload your Picture</label>
        </div>
        <button type="submit" className="submit-btn">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
