import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";




export default function Index({ seznamOglasov }) {
  console.log(seznamOglasov);

  const getImageSrc = (oglas) => {
    let reader = new FileReader();
    let src = "";
    reader.onloadend = function () {
      src = reader.result;
    }
    if (oglas.slika && oglas.slika[0]) {
      reader.readAsDataURL(oglas.slika[0]);
    }
    return src;
  }

  return (
    <>
      <IndexNavbar />
      <section className="pt-20 pb-15 px-4 md:px-0">
        <br></br>
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            {seznamOglasov?.map((oglas, index) => {
              const imageSrc = getImageSrc(oglas)
              return (
                <div
                  key={oglas.id}
                  className={`w-full sm:w-6/12 md:w-4/12 lg:w-4/12 xl:w-4/12 px-4 mb-6`}
                >
                  <div className="card relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg" style={{ backgroundColor: "#F1F5F9" }}>
                    <div className="px-4 py-5 flex-auto">
                      <Link to={`/products/${oglas.id}`} className="card-link">
                        <img
                          alt="..."
                          className="w-full align-middle rounded-lg"
                          src={imageSrc}
                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                      </Link>
                      <div className="mt-4">
                        <h5 className="card-title text-xl font-bold">
                          <Link to={`/oglas/${oglas.id}`} className="card-link text-black">
                            {oglas.naslov}
                          </Link>
                        </h5>
                        <p className="card-text mt-2 text-gray-600">{oglas.opis}</p>
                        <h6 className="card-subtitle mt-2 text-black">{oglas.cena} €</h6>
                        {/*  <h6 className="card-subtitle mt-2 text-black">{oglas.zamenjava === true ? "Zamenjava" : "Nakup po ceni"}</h6>   */}
                      </div>
                    </div>
                    <div className="px-4 py-2">
                      <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        Kupi
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section >
      <Footer />
    </>
  );
}