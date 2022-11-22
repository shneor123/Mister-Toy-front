import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './assets/styles/main.scss'

import { ToyApp } from "./pages/toy-app";
import { AppHeader } from "./general/app-header";
import { AboutPage } from "./pages/about-page";
import { HomePage } from "./pages/home-page";
import { UserMsg } from "./general/user-msg";
import { ToyEdit } from "./cmps/toy-edit";
import { LoginSignup } from "./login/login-signup";
import { ToyDetails } from "./pages/toy-details";
import { Dashboard } from "./pages/toy-dashboard";
import { ReviewsInfo } from "./pages/info/reviews-Info";
import { UsersInfo } from "./pages/info/user-info";

function App() {
  return (
    <Router>
      <AppHeader />
      <UserMsg />
      <Routes>
        <Route element={<HomePage />} path={"/"} />
        <Route element={<AboutPage />} path={"/about"} />
        <Route element={<ToyApp />} path={"/toy"} />
        <Route element={<ToyDetails />} path={"/toy/details/:toyId"} />
        <Route element={<ToyEdit />} path={"/toy/edit/:toyId"} />
        <Route element={<ToyEdit />} path={"/toy/edit"} />
        <Route element={<LoginSignup />} path={"/login"} />
        <Route element={<LoginSignup />} path={"/signup"} />
        <Route element={<UsersInfo />} path={"/users"} />
        <Route element={<ReviewsInfo />} path={"/reviews"} />
        <Route element={<Dashboard />} path={"/toy/statistics"} />
      </Routes>
    </Router>
  )
}

export default App
