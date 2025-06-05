import { useGSAP } from "@gsap/react";
import gsap, { Expo } from "gsap";
import React, { useRef, useState } from "react";

const LoginPage = () => {
  const gsapcreate = useRef();
  const gsapWel = useRef();
  const gsapLogin = useRef();
  const gsapHii = useRef();

  const [loginX, setloginX] = useState("0%");
  const [loginZ, setloginZ] = useState(10);

  const [hiiX, sethiiX] = useState("0%");
  const [hiiZ, sethiiZ] = useState(10);

  const [createX, setcreateX] = useState("0%");
  const [createZ, setcreateZ] = useState(0);

  const [welX, setwelX] = useState("0%");
  const [welZ, setwelZ] = useState(0);

  useGSAP(() => {
    gsap.to(gsapLogin.current, {
      x: loginX,
      duration: 1.5,
      zIndex: loginZ,
      ease: "sine.inOut",
    });
  }, [loginX, loginZ]);

  useGSAP(() => {
    gsap.to(gsapHii.current, {
      x: hiiX,
      duration: 1.5,
      zIndex: hiiZ,
      ease: "power3.inOut",
    });
  }, [hiiX, hiiZ]);
  useGSAP(() => {
    gsap.to(gsapcreate.current, {
      x: createX,
      duration: 1.5,
      zIndex: createZ,
      ease: "sine.inOut",
    });
  }, [createX, createZ]);

  useGSAP(() => {
    gsap.to(gsapWel.current, {
      x: welX,
      duration: 1.5,
      zIndex: welZ,
      ease: "power3.inOut",
    });
  }, [welX, welZ]);

  function handleAnimation() {
    setcreateX("100%");
    setcreateZ(20);
    sethiiZ(0);
    setwelX("-100%");
    setwelZ(20);
    setloginZ(0);
    setloginX("100%");
    sethiiX("-100%");
  }

  function handleAnimation2() {
    setloginX("0%");
    setloginZ(20);
    setwelZ(0);
    sethiiX("0%");
    sethiiZ(20);
    setcreateZ(0);
    setcreateX("0%");
    setwelX("0%");
  }

  function GlowingButton() {
    return (
      <button
        className=" border-blue-500 border-4 w-[35%] text-blue-500 font-bold py-2 px-4 rounded-xl transition duration-1000 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(59,130,246,1)] hover:bg-blue-700 hover:text-white hover:border-blue-700"
        onClick={handleAnimation}
      >
        SIGN UP
      </button>
    );
  }
  function GlowingButton2() {
    return (
      <button
        className=" border-blue-500 border-4 w-[35%] text-blue-500 font-bold py-2 px-4 rounded-xl transition duration-1000 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(59,130,246,1)] hover:bg-blue-700 hover:text-white hover:border-blue-700"
        onClick={handleAnimation2}
      >
        SIGN IN
      </button>
    );
  }
  // toggle function
  //   const [toggle, SetToggle] = useState(false)
  //   const toggleVisibility = () => {
  //     SetToggle(!toggle);
  //   }

  const [UserVal, setUserVal] = useState("user");
  function handlefunction() {
    UserVal === "user" ? "" : UserVal;
  }

  const [createFormData, setCreateFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    errFields: "",
    errUsername: "",
    errEmail: "",
  });

  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
    setErrorMessage({
      errFields: "",
      errUsername: "",
      errEmail: "",
    });
  };
  // console.log(createFormData);

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!createFormData.username || !createFormData.email || !createFormData.password) {
      return setErrorMessage({errFields:"please fill all fields"});
    }

    try {
      //response is a object that contains http response, including status, header, and data returned by server
      const response = await fetch(
        "http://localhost:5000/api/user/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createFormData),
        }
      );
      const result = await response.json();
      // console.log("success", result);
      if (!response.ok) {
        setErrorMessage({
          ...errorMessage,
           errUsername:(result.errusername),
           errEmail:(result.erremail)
          });
      } else{
        window.location.href = "/"; 
      }
    } catch (error) {
      console.log("error", error);
    }

    setCreateFormData({
      username: "",
      email: "",
      password: "",
    });

  };

  const [loginFormData, setLoginFormData] = useState({
    loginId: "",
    password: "",
  });
  const [errorMessage1, setErrorMessage1] = useState({
    errLoginFields: "",
    errLogin: "",
  });
  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    setErrorMessage1({
      errLoginFields: "",
      errLogin: "",
    });
    console.log(loginFormData)
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (!loginFormData.loginId || !loginFormData.password) {
      return setErrorMessage1({errLoginFields:"please fill all fields"});
    }

    try {
      //response is a object that contains http response, including status, header, and data returned by server
      const response = await fetch(
        "http://localhost:5000/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginFormData),
          credentials: "include",
        }
      );
      const result = await response.json();
      console.log("success", result);
      if (!response.ok) {
        setErrorMessage1({errLogin:(result.errLogin)});
      }
      else{
        window.location.href = "/"; 
      }
    } catch (error) {
      console.log("error", error);
    }
    setLoginFormData({
      loginId: "",
      password: "",
    });

  };


  return (
    <>
      <div className="h-[100vh] w-full flex justify-center items-center bg-slate-900">
        <div
          className="box
    h-[70vh] w-[70vw] flex bg-transparent relative mt-16"
        >
          <div
            ref={gsapLogin}
            className="login 
        h-full bg-white w-1/2 flex flex-col justify-center z-10"
          >
            <div className="text-center text-4xl font-semibold">Sign In</div>
            <div className="flex justify-center gap-4 mt-8">
              <span className="h-10 w-10 inline-block bg-slate-200  rounded-md flex items-center justify-center text-base hover:text-xl hover:border-sky-500 hover:ring-2">
                <i className="ri-google-fill"></i>
              </span>
              <span className="h-10 w-10 inline-block bg-slate-200 rounded-md flex items-center justify-center text-base hover:text-xl hover:border-sky-500 hover:ring-2">
                <i className="ri-facebook-fill"></i>
              </span>
              <span className="h-10 w-10 inline-block bg-slate-200 rounded-md flex items-center justify-center text-base hover:text-xl hover:border-sky-500 hover:ring-2">
                <i className="ri-github-fill"></i>
              </span>
              <span className="h-10 w-10 inline-block bg-slate-200 rounded-md flex items-center justify-center text-base hover:text-xl hover:border-sky-500 hover:ring-2">
                <i className="ri-linkedin-fill"></i>
              </span>
            </div>
            <p className="text-center mt-5">Login With Username/Email </p>
            <div className="flex justify-center mt-2">
              <input
                type="text"
                placeholder="Enter Username/Email"
                name="loginId"
                required
                className="w-[80%] h-10 bg-gray-300 pl-5 text-gray-900 border-none rounded-md placeholder:text-gray-600"
                value={handlefunction(loginFormData.loginId)}
                onChange={(e) => {
                  setUserVal(e.target.value);
                  handleLoginChange(e)
                }}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="password"
                name="password"
                value={loginFormData.password}
                required
                placeholder="Enter Password"
                onChange={handleLoginChange}
                className="w-[80%] h-10 bg-gray-300 pl-5 text-gray-900 mt-4 border-none rounded-md placeholder:text-gray-600 "
              />
            </div>
            {/* Display error message */}
            {errorMessage1.errLoginFields && (
              <p className="text-red-500 text-center mt-3 font-semibold">{errorMessage1.errLoginFields}</p>
            )}
            {/* Display error message */}
            {errorMessage1.errLogin && (
              <p className="text-red-500 text-center font-semibold">{errorMessage1.errLogin}</p>
            )}
            <p className="text-center mt-3">
              <a href="/">forget Password?</a>
            </p>
            <div className="flex justify-center mt-6 mb-2">
              <button onClick={handleSubmitLogin}
                className="h-10 w-[35%] rounded-xl font-bold
             bg-blue-500 text-white transition duration-1000 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(59,130,246,1)]"
              >
                SIGN IN
              </button>
            </div>
          </div>

          <div
            ref={gsapcreate}
            className="signup
        h-full bg-white w-1/2 flex flex-col justify-center absolute left-0"
          >
            <div className="text-center text-4xl font-semibold">
              Create Account
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <span className="h-10 w-10 inline-block bg-slate-200 border-[1.5px] border-slate-950 rounded-md flex items-center justify-center text-base after:">
                <i className="ri-google-fill"></i>
              </span>
              <span className="h-10 w-10 inline-block bg-slate-200 border-[1.5px] border-slate-950 rounded-md flex items-center justify-center text-base">
                <i className="ri-facebook-fill"></i>
              </span>
              <span className="h-10 w-10 inline-block bg-slate-200 border-[1.5px] border-slate-950 rounded-md flex items-center justify-center text-base">
                <i className="ri-github-fill"></i>
              </span>
              <span className="h-10 w-10 inline-block bg-slate-200 border-[1.5px] border-slate-950 rounded-md flex items-center justify-center text-base">
                <i className="ri-linkedin-fill"></i>
              </span>
            </div>
            <p className="text-center mt-5">Register with E-mail</p>
            <div className="flex justify-center mt-2">
              <input
                onChange={handleCreateChange}
                name="username"
                type="text"
                value={createFormData.username }
                required
                placeholder="Enter Your Username"
                className="w-[80%] h-10 bg-gray-300 pl-5 text-gray-900 border-none rounded-md placeholder:text-gray-600"
              />
            </div>
            {/* Display error message */}
            {errorMessage.errUsername && (
              <p className="text-red-500 text-right pr-14 font-semibold text-sm">{errorMessage.errUsername}</p>
            )}
            <div className="flex justify-center">
              <input
                onChange={handleCreateChange}
                name="email"
                value={createFormData.email}
                required
                type="email"
                placeholder="Enter Email"
                className="w-[80%] h-10 bg-gray-300 pl-5 text-gray-900 mt-4 border-none rounded-md placeholder:text-gray-600"
              />
            </div>
            {/* Display error message */}
            {errorMessage.errEmail && (
              <p className="text-red-500 text-right pr-14 font-semibold text-sm">{errorMessage.errEmail}</p>
            )}
            <div className="flex justify-center">
              <input
                onChange={handleCreateChange}
                name="password"
                value={createFormData.password}
                required
                type="password"
                placeholder="Enter Password"
                className="w-[80%] h-10 bg-gray-300 pl-5 text-gray-900 mt-4 border-none rounded-md placeholder:text-gray-600"
              />
            </div>

            {/* Display error message */}
            {errorMessage.errFields && (
              <p className="text-red-500 text-center font-semibold mt-2">{errorMessage.errFields}</p>
            )}

            <div className="flex justify-center mt-4 mb-2">
              <button
                className="h-10 w-[35%] rounded-xl font-bold mt-2
             bg-blue-500 text-white transition duration-1000 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(59,130,246,1)]"
                onClick={handleSubmitCreate}
              >
                SIGN UP
              </button>
            </div>
          </div>

          <div
            ref={gsapHii}
            className="h-full bg-gray-500 w-1/2 absolute right-0 z-10"
          >
            <div className="h-full flex flex-col gap-4 justify-center items-center">
              <p className="text-4xl font-medium text-center"> Hii {UserVal}...</p>
              <p className="text-center text-xl font-normal">
                If not already a user <br />
                Join us for better exprience
              </p>
              <div className="w-full flex justify-center mt-6 mb-2">
                {/* <button className="bg-slate-200 h-10 w-[35%] rounded-lg font-bold 
            ">SIGN IN</button> */}
                {/* {after:content-[''] after:absolute after:z-10 after:w-5 after:h-5 after:bg-slate-950} */}
                {GlowingButton()}
              </div>
            </div>
          </div>

          <div
            ref={gsapWel}
            className="h-full bg-gray-500 w-1/2 absolute right-0"
          >
            <div className="h-full flex flex-col gap-4 justify-center items-center">
              <p className="text-4xl font-medium text-center">
                {" "}
                Welcome To <br />
                Site Name
              </p>
              <div>
                <p className="text-center tracking-widest text-xl font-normal">
                  If already a user
                </p>
                <p className="text-center text-xl font-normal">
                  {" "}
                  Login with ID and Password.
                </p>
              </div>
              <div className="w-full flex justify-center mt-6 mb-2">
                {/* <button className="bg-slate-200 h-10 w-[35%] rounded-lg font-bold 
            ">SIGN IN</button> */}
                {/* {after:content-[''] after:absolute after:z-10 after:w-5 after:h-5 after:bg-slate-950} */}
                {GlowingButton2()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
