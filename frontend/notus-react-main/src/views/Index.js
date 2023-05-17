import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";




export default function Index({ seznamOglasov }) {
  const [imageSrcs, setImageSrcs] = useState({});
  const [error, setError] = useState(null);



  console.log(seznamOglasov);




  /*   useEffect(() => {
      const promises = seznamOglasov.map(oglas => {
        return new Promise((resolve, reject) => {
          if (oglas.slika && oglas.slika[0]) {
            if (!(oglas.slika[0] instanceof Blob) && !(oglas.slika[0] instanceof File)) {
              console.log('oglas.slika[0] is not a Blob or File', oglas.slika[0]);
              resolve({ id: oglas.id, src: '' });
              return;
            }
  
            const reader = new FileReader();
            reader.onloadend = () => resolve({ id: oglas.id, src: reader.result });
            reader.onerror = reject;
            reader.readAsDataURL(oglas.slika[0]);
          } else {
            resolve({ id: oglas.id, src: '' });
          }
        });
      });
  
      Promise.all(promises)
        .then(images => {
          const newImageSrcs = images.reduce((acc, { id, src }) => ({ ...acc, [id]: src }), {});
          setImageSrcs(newImageSrcs);
        })
        .catch(console.error);
    }, [seznamOglasov]); */




  return (
    <>
      <IndexNavbar />
      <section className="pt-20 pb-15 px-4 md:px-0">
        <br></br>
        {seznamOglasov.length === 0 ? (
          <div className="text-center my-8">
            <h2 className="text-2xl font-bold text-gray-800">Ni oglasov za prikaz!</h2>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-4">
            {seznamOglasov.map((oglas, index) => {
              const imageSrc = imageSrcs[oglas.id];
              return (
                <div
                  key={oglas.id}
                  className={`w-full sm:w-6/12 md:w-4/12 lg:w-4/12 xl:w-4/12 px-4 mb-6`}
                >
                  <div className="card relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg" style={{ backgroundColor: "#F1F5F9" }}>
                    <div className="px-4 py-5 flex-auto">
                      {/* <Link to={`/products/${oglas.id}`} className="card-link">
                        <img
                          alt="..."
                          className="w-full align-middle rounded-lg"
                          src={imageSrc}
                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                      </Link> */}
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
                      <Link to={`/oglas/${oglas.id}`}>
                        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                          Več
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section >
      <Footer />
    </>
  );
}