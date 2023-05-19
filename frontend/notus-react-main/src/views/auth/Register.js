import React, { useState } from "react";
import { UserAuth } from "context/AuthContext";
import api from "services/api";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const initialState = {
  ime: "",
  priimek: "",
  telefon: "",
  naslov: "",
  posta: "",
  drzava: "",
  email: "",
  geslo: "geslo"
}

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);

  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const {createUser} = UserAuth();

  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;
    console.log(user)

    if (!user.ime) {
        formIsValid = false;
        formErrors["ime"] = "Prosimo, vnesite ime.";
    }

    if (!user.priimek) {
        formIsValid = false;
        formErrors["priimek"] = "Prosimo, vnesite priimek.";
    }

    if (!user.telefon) {
        formIsValid = false;
        formErrors["telefon"] = "Prosimo, vnesite telefonsko stevilko.";
    }

    if (!user.naslov) {
        formIsValid = false;
        formErrors["naslov"] = "Prosimo, vnesite naslov.";
    }

    if (!user.posta) {
        formIsValid = false;
        formErrors["posta"] = "Prosimo, vnesite postno stevilko.";
    }

    if (!user.drzava) {
        formIsValid = false;
        formErrors["drzava"] = "Prosimo, vnesite drzavo.";
    }

    if (!email) {
      formIsValid = false;
      formErrors["email"] = "Prosimo, vnesite email.";
    }

    if (!password) {
        formIsValid = false;
        formErrors["geslo"] = "Prosimo, vnesite geslo.";
    }

    if (password && password.length < 6) {
      formIsValid = false;
      formErrors["geslo"] = "Prosimo, vnesite geslo z vsaj 6 znaki.";
  }
    setErrors(formErrors);
    return formIsValid;
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (validateForm()) {

        try {
          user.email = email;

          console.log(user);

          const response = await api.post("/uporabnik/dodaj", user, {
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
              },
          });

          if (response.status === 200) {
              alert("Uporabnik uspešno registriran!");
          } else {
              alert("Napaka pri registraciji!");
          }

          setUser(initialState);
          setErrors({});
          
          await createUser(email, password);

          history.push("/");
        } catch (er) {
          setError(er.message);
          console.log(er.message);
        }
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser((prevState) => {
        const nextState = {
            ...prevState,
            [name]: value,
        };
        console.log(nextState)
        return nextState;
    });
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="fixed" style={{ top: "1rem", left: "1rem" }}>
        <Link to="/">
          <button
            className="bg-blueGray-800 text-white active:bg-blueGray-600 font-bold uppercase p-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </Link>
      </div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-screen">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Create an account
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="first_name"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border border-blueGray-300 bg-blueGray-100 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="First Name"
                      name="ime"
                      id="ime"
                      onChange={handleChange}
                    />
                    <small className="text-red-500">{errors.ime}</small>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="last_name"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="border border-blueGray-300 bg-blueGray-100 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Last Name"
                      name="priimek"
                      id="priimek"
                      onChange={handleChange}
                    />
                    <small className="text-red-500">{errors.priimek}</small>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="border border-blueGray-300 bg-blueGray-100 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Phone"
                      name="telefon"
                      id="telefon"
                      onChange={handleChange}
                    />
                    <small className="text-red-500">{errors.telefon}</small>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="adress"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="border border-blueGray-300 bg-blueGray-100 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Address"
                      name="naslov"
                      id="naslov"
                      onChange={handleChange}
                    />
                    <small className="text-red-500">{errors.naslov}</small>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="postal_code"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="border border-blueGray-300 bg-blueGray-100 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Postal Code"
                      name="posta"
                      id="posta"
                      onChange={handleChange}
                    />
                    <small className="text-red-500">{errors.posta}</small>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="border border-blueGray-300 bg-blueGray-100 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Country"
                      name="drzava"
                      id="drzava"
                      onChange={handleChange}
                    />
                    <small className="text-red-500">{errors.drzava}</small>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border border-blueGray-300 bg-blueGray-100 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <small className="text-red-500">{errors.email}</small>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>

                    <input
                      type={showPassword ? "text" : "password"}
                      className="border border-blueGray-300 bg-blueGray-100 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      className="absolute right-0 text-blueGray-500"
                      style={{ top: "66%", paddingRight: "1rem", transform: "translateY(-50%)" }}
                      type="button"
                    >
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </button>
                    <small className="text-red-500">{errors.geslo}</small>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="flex flex-wrap mt-6 relative">
                    <div className="w-1/2">
                      <Link to="/login" className="text-blueGray-800">
                        <small>Already have an account? Sign In</small>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}