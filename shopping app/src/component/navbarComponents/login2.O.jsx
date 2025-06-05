// // Reusable Button Component
// const GlowingButton = ({ onClick, text }) => (
//     <button
//       className="border-blue-500 border-4 w-[35%] text-blue-500 font-bold py-2 px-4 rounded-xl transition duration-1000 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(59,130,246,1)] hover:bg-blue-700 hover:text-white hover:border-blue-700"
//       onClick={onClick}
//     >
//       {text}
//     </button>
//   );
  
//   // Reusable Input Component
//   const InputField = ({ type, name, placeholder, value, onChange }) => (
//     <input
//       type={type}
//       name={name}
//       placeholder={placeholder}
//       value={value}
//       required
//       className="w-[80%] h-10 bg-gray-300 pl-5 text-gray-900 border-none rounded-md placeholder:text-gray-600"
//       onChange={onChange}
//     />
//   );
  
//   // Social Icons Component
//   const SocialIcons = () => (
//     <div className="flex justify-center gap-4 mt-8">
//       {["google", "facebook", "github", "linkedin"].map((icon) => (
//         <span
//           key={icon}
//           className="h-10 w-10 inline-block bg-slate-200 rounded-md flex items-center justify-center text-base hover:text-xl hover:border-sky-500 hover:ring-2"
//         >
//           <i className={`ri-${icon}-fill`}></i>
//         </span>
//       ))}
//     </div>
//   );
  
//   // Main LoginPage Component
//   const LoginPage = () => {
//     const gsapRefs = { gsapLogin: useRef(), gsapHii: useRef(), gsapCreate: useRef(), gsapWel: useRef() };
//     const [formData, setFormData] = useState({ username: "", email: "", password: "", loginId: "", loginPassword: "" });
//     const [errorMessage, setErrorMessage] = useState({ errFields: "", errUsername: "", errEmail: "", errLogin: "" });
//     const [animState, setAnimState] = useState({ loginX: "0%", loginZ: 10, hiiX: "0%", hiiZ: 10, createX: "0%", createZ: 0, welX: "0%", welZ: 0 });
  
//     useGSAP(() => {
//       Object.keys(gsapRefs).forEach((key) => {
//         gsap.to(gsapRefs[key].current, { x: animState[`${key.replace("gsap", "").toLowerCase()}X`], duration: 1.5, zIndex: animState[`${key.replace("gsap", "").toLowerCase()}Z`], ease: "sine.inOut" });
//       });
//     }, [animState]);
  
//     const handleAnimation = () => setAnimState({ createX: "100%", createZ: 20, hiiZ: 0, welX: "-100%", welZ: 20, loginZ: 0, loginX: "100%", hiiX: "-100%" });
//     const handleAnimation2 = () => setAnimState({ loginX: "0%", loginZ: 20, welZ: 0, hiiX: "0%", hiiZ: 20, createZ: 0, createX: "0%", welX: "0%" });
    
//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
//     const handleSubmit = async (e, endpoint) => {
//       e.preventDefault();
//       if (!Object.values(formData).some((val) => val)) return setErrorMessage({ errFields: "Please fill all fields" });
//       try {
//         const response = await fetch(`http://localhost:5000/api/users/${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
//         const result = await response.json();
//         if (!response.ok) setErrorMessage({ ...errorMessage, ...result });
//       } catch (error) { console.error("Error:", error); }
//     };
  
//     return (
//       <div className="h-[100vh] w-full flex justify-center items-center bg-slate-900">
//         <div className="box h-[70vh] w-[70vw] flex bg-transparent relative mt-16">
//           <div ref={gsapRefs.gsapLogin} className="login h-full bg-white w-1/2 flex flex-col justify-center z-10">
//             <h2 className="text-center text-4xl font-semibold">Sign In</h2>
//             <SocialIcons />
//             <p className="text-center mt-5">Login With Username/Email</p>
//             <div className="flex justify-center mt-2"><InputField type="text" name="loginId" placeholder="Enter Username/Email" value={formData.loginId} onChange={handleChange} /></div>
//             <div className="flex justify-center"><InputField type="password" name="loginPassword" placeholder="Enter Password" value={formData.loginPassword} onChange={handleChange} /></div>
//             {errorMessage.errLogin && <p className="text-red-500 text-center font-semibold">{errorMessage.errLogin}</p>}
//             <p className="text-center mt-3"><a href="/">Forget Password?</a></p>
//             <div className="flex justify-center mt-6 mb-2"><GlowingButton onClick={(e) => handleSubmit(e, "login")} text="SIGN IN" /></div>
//           </div>
//           <div ref={gsapRefs.gsapCreate} className="signup h-full bg-white w-1/2 flex flex-col justify-center absolute left-0">
//             <h2 className="text-center text-4xl font-semibold">Create Account</h2>
//             <SocialIcons />
//             <p className="text-center mt-5">Register with Email</p>
//             <div className="flex justify-center mt-2"><InputField type="text" name="username" placeholder="Enter Your Username" value={formData.username} onChange={handleChange} /></div>
//             <div className="flex justify-center"><InputField type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} /></div>
//             <div className="flex justify-center"><InputField type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} /></div>
//             <div className="flex justify-center mt-4 mb-2"><GlowingButton onClick={(e) => handleSubmit(e, "createUser")} text="SIGN UP" /></div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default LoginPage;