import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { Link, useLocation } from "react-router-dom"
import { FiPaperclip } from "react-icons/fi";

import { useForm } from "../hooks/useForm"
import { ImgUploader } from "../general/img-uploader"
import { login, onSignup } from "../store/actions/user.actions"

import leftHero from "../assets/svg/leftHero.svg"
import rightHero from "../assets/svg/rightHero.svg"

export const LoginSignup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [toggleShow, setToggleShow] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [credentials, handleChange, setCredentials] = useForm({
    username: "",
    password: "",
    fullname: "",
  })

  useEffect(() => {
    onIsSignup()
    clearState()
  }, [pathname])

  const clearState = () => {
    setCredentials({ username: "", password: "", fullname: "", imgUrl: "" })
  }

  const onIsSignup = () => {
    if (pathname === "/signup") setIsSignup(true)
    else setIsSignup(false)
  }

  const signUp = (ev = null) => {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
    dispatch(onSignup(credentials))
    navigate("/login")
    clearState()
  }

  const onLogin = (ev) => {
    if (ev) ev.preventDefault()
    if (!credentials.username) return
    dispatch(login(credentials))
    setTimeout(() => {
      navigate("/toy")
      clearState()
    }, 500);
  }

  const onUploaded = (imgUrl) => {
    setCredentials({ ...credentials, imgUrl });
  }

  return (
    <section className="loginSignup">
      <div className="box">
        <div className="form">
          <form onSubmit={isSignup ? signUp : onLogin}>
            {isSignup ? (
              <>
                {" "}
                <h2>Sign up for your account</h2>

                <div className="inpuBox">
                  <span></span>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Enter full name"
                    value={credentials.fullname}
                    onChange={handleChange}
                    required="required"
                  />
                  <i></i>
                </div>
                {/* <div>
                  <p className="upper-login-attach ">
                    {<button className="btn-opt-login"
                      onClick={() => setToggleShow(!toggleShow)} >
                      <span className="badge"><FiPaperclip /></span>
                      {toggleShow ? 'Hide details' : 'Attach'}
                    </button>}
                  </p>
                  {toggleShow && <div className='attach'>
                    <ImgUploader onUploaded={onUploaded} />
                    <label className="label_login" htmlFor='upload-file-url'>Attach a link</label>
                    <input
                      className="inputAttach"
                      type="text"
                      id="upload-file-url"
                      name="imgUrl"
                      placeholder="Enter link img profile"
                      value={credentials.imgUrl}
                      onChange={handleChange} />
                  </div>
                  }
                </div> */}
              </>
            ) : (
              <h1>Login to Store</h1>
            )}
            <div className="inpuBox">
              <span></span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                value={credentials.username}
                onChange={handleChange}
                required="required"

              />
              <i></i>
            </div>
            <div className="inpuBox">
              <span></span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={handleChange}
                required="required"
              />
              <i></i>
            </div>
            <button className={`links ${isSignup ? "signup" : "login"}`}>
              {isSignup ? "Sign up" : "Log in"}
            </button>
          </form>

          <hr />
          <div className="dif-choice flex">
            <Link to="/">Back Home</Link>
            {isSignup ? (
              <Link to="/login"> Log In</Link>
            ) : (
              <Link to="/signup"> Sign up for an account</Link>
            )}
          </div>
        {/* <img className="left-hero" src={leftHero} /> */}
        {/* <img className="right-hero" src={rightHero} /> */}
        </div >
      </div >
    </section >
  )
}



// import React, { useState, useEffect } from "react"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router"
// import { Link, useLocation } from "react-router-dom"
// import { FiPaperclip } from "react-icons/fi";

// import { useForm } from "../hooks/useForm"
// import { ImgUploader } from "../general/img-uploader"
// import { login, onSignup } from "../store/actions/user.actions"

// import leftHero from "../assets/svg/leftHero.svg"
// import rightHero from "../assets/svg/rightHero.svg"

// export const LoginSignup = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { pathname } = useLocation()

//   const [toggleShow, setToggleShow] = useState(false)
//   const [isSignup, setIsSignup] = useState(false)
//   const [credentials, handleChange, setCredentials] = useForm({
//     username: "",
//     password: "",
//     fullname: "",
//   })

//   useEffect(() => {
//     onIsSignup()
//     clearState()
//   }, [pathname])

//   const clearState = () => {
//     setCredentials({ username: "", password: "", fullname: "", imgUrl: "" })
//   }

//   const onIsSignup = () => {
//     if (pathname === "/signup") setIsSignup(true)
//     else setIsSignup(false)
//   }

//   const signUp = (ev = null) => {
//     if (ev) ev.preventDefault()
//     if (!credentials.username || !credentials.password || !credentials.fullname)
//       return
//     dispatch(onSignup(credentials))
//     navigate("/login")
//     clearState()
//   }

//   const onLogin = (ev) => {
//     if (ev) ev.preventDefault()
//     if (!credentials.username) return
//     dispatch(login(credentials))
//     setTimeout(() => {
//       navigate("/toy")
//       clearState()
//     }, 500);
//   }

//   const onUploaded = (imgUrl) => {
//     setCredentials({ ...credentials, imgUrl });
//   }

//   return (
//     <section className="login-page flex column">
//       <header className="login-header">
//         <h1>My Store</h1>{" "}
//       </header>
//       <div className="login-signup-container">
//         <form className="flex column " onSubmit={isSignup ? signUp : onLogin}>
//           {isSignup ? (
//             <>
//               {" "}
//               <h1>Sign up for your account</h1>
//               <input
//                 type="text"
//                 id="fullname"
//                 name="fullname"
//                 placeholder="Enter full name"
//                 value={credentials.fullname}
//                 onChange={handleChange}
//               />
//               <div>
//                 <p className="upper-login-attach ">
//                   {<button className="btn-opt-login"
//                     onClick={() => setToggleShow(!toggleShow)} >
//                     <span className="badge"><FiPaperclip /></span>
//                     {toggleShow ? 'Hide details' : 'Attach'}
//                   </button>}
//                 </p>
//                 {toggleShow && <div className='attach'>
//                   <ImgUploader onUploaded={onUploaded} />
//                   <label className="label_login" htmlFor='upload-file-url'>Attach a link</label>
//                   <input
//                     className="inputAttach"
//                     type="text"
//                     id="upload-file-url"
//                     name="imgUrl"
//                     placeholder="Enter link img profile"
//                     value={credentials.imgUrl}
//                     onChange={handleChange} />
//                 </div>
//                 }
//               </div>
//             </>
//           ) : (
//             <h1>Login to Store</h1>
//           )}
//           <input
//             type="text"
//             id="username"
//             name="username"
//             placeholder="Enter username"
//             value={credentials.username}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Enter password"
//             value={credentials.password}
//             onChange={handleChange}
//           />
//           <button className={`logbtn ${isSignup ? "signup" : "login"}`}>
//             {isSignup ? "Sign up" : "Log in"}
//           </button>
//         </form>
//         <hr />
//         <div className="dif-choice flex">
//           <Link to="/">Back Home</Link>
//           {isSignup ? (
//             <Link to="/login"> Log In</Link>
//           ) : (
//             <Link to="/signup"> Sign up for an account</Link>
//           )}
//         </div>
//       </div>

//       <img className="left-hero" src={leftHero} />
//       <img className="right-hero" src={rightHero} />
//     </section>
//   )
// }

//ssssssssssssssssssssssssssssssssssss
    // <section className="loginSignup">
    //   <div className="box">
    //     <div className="form">
    //       <h2>Sign In</h2>
    //       <div className="inpuBox">
    //         <input type="text" required="required" />
    //         <span>UserName</span>
    //         <i></i>
    //       </div>
    //       <div className="inpuBox">
    //         <input type="password" required="required" />
    //         <span>Password</span>
    //         <i></i>
    //       </div>
    //       <div className="links">
    //         <a href="#">Forgat Password</a>
    //         <a href="#">SignUp</a>
    //       </div>
    //       <input type="submit" value="login" />
    //     </div>
    //   </div>
    // </section>