import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-6 py-3 navbar-expand-lg bg-white shadow">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            to="/"
            className="text-blueGray-700 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
          >
            Recloth
          </Link>
          <button
            className="text-blueGray-400 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
            (navbarOpen ? " block" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none mr-auto">
            <li className="flex items-center">
              <Link
                to="/about"
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              >
                <span>About Us</span>
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            <li className="flex items-center">
              <Link to="/login">
                <button className="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                  Login
                </button>
              </Link>
            </li>
            <li className="flex items-center">
              <Link to="/register">
                <button className="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                  Sign up
                </button>
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/profile"
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              >
                <i className="fas fa-user-circle text-lg leading-lg mr-2"></i>
                <span className="lg:hidden inline-block ml-2">My Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
