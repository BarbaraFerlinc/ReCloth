import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "context/AuthContext";
import { useEffect, useState } from "react";
import api from "services/api";



export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // Dodali smo števec za obvestila

  const { user } = UserAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/obvestilo/prestej-neprebrane');
        console.log(response.data.count);
        setNotificationCount(response.data.count);
      } catch (error) {
        console.error("Napaka pri pridobivanju obvestil", error);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);
  return (<>
    {user ?
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-6 py-3 navbar-expand-lg bg-white shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
            >
              ReCloth
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
                <Link to="/objavaOglasa">
                  <button className="text-green bg-transparent border border-solid border-blueGray-500 hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    Ustvari oglas
                  </button>
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/profile"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  <i className="fas fa-user-circle text-lg leading-lg mr-2"></i>
                  <span className="lg:hidden inline-block ml-2">Moj profil</span>
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/obvestila"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  <i class="fas fa-bell text-lg"></i>

                  <span className="lg:hidden inline-block ml-2">Obvestila</span>
                  {notificationCount > 0 &&
                    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold ml-1">{notificationCount}</span>
                  }

                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> :
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-6 py-3 navbar-expand-lg bg-white shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
            >
              ReCloth
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
            </ul>
          </div>
        </div>
      </nav>
    }
  </>
  );
}
