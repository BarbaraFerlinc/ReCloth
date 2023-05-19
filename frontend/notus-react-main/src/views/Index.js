import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "services/api";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index({ seznamOglasov }) {
  const [imageSrcs, setImageSrcs] = useState({});
  const [error, setError] = useState(null);
  const [kategorije, setKategorije] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedZamenjava, setSelectedZamenjava] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedVelikost, setSelectedVelikost] = useState("");



  console.log(seznamOglasov);


  const filteredOglasi = seznamOglasov.filter(oglas =>
    (selectedCategory ? oglas.kategorijaNaziv === selectedCategory : true) &&
    (selectedZamenjava ? oglas.za_zamenjavo.toString() === selectedZamenjava : true) &&
    (selectedVelikost ? oglas.velikost === selectedVelikost : true) &&
    oglas.lokacija.toLowerCase().includes(searchLocation.toLowerCase())
  );



  useEffect(() => {
    const fetchKategorije = async () => {
      try {
        const response = await api.get('/kategorija/vsi');
        setKategorije(response.data);
      } catch (error) {
        console.error("Napaka pri pridobivanju kategorij", error);
      }
    };

    fetchKategorije();
  }, []);

  console.log(seznamOglasov);
  console.log(typeof (selectedZamenjava));

  return (
    <>

      <IndexNavbar fixed={true}></IndexNavbar>
      <div className="flex justify-start items-center mb-8 px-4 pt-20">
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md mr-4"
        >
          <option value="">Vse</option>
          {kategorije.map(kategorija => (
            <option key={kategorija.id} value={kategorija.naziv}>{kategorija.naziv}</option>
          ))}
        </select>
        <select
          value={selectedZamenjava}
          onChange={e => setSelectedZamenjava(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md mr-4"
        >
          <option value="">Način nakupa</option>
          <option value="0">Fiksna cena</option>
          <option value="1">Možna zamenjava</option>
        </select>
        <select
          value={selectedVelikost}
          onChange={e => setSelectedVelikost(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md mr-4"
        >
          <option value="">Velikost</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <input
          type="text"
          value={searchLocation}
          onChange={e => setSearchLocation(e.target.value)}
          placeholder="Vnesite lokacijo"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>


      <section className="pt-10 pb-15 px-4 md:px-0">
        <br></br>
        {seznamOglasov.length === 0 ? (
          <div className="text-center my-8">
            <h2 className="text-2xl font-bold text-gray-800">Ni oglasov za prikaz!</h2>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-4">
            {filteredOglasi.map((oglas, index) => {
              const slikaPath = oglas.slike[0].split("\\uploads\\")[1];
              return (
                <div
                  key={oglas.id}
                  className={`w-full sm:w-6/12 md:w-4/12 lg:w-4/12 xl:w-4/12 px-4 mb-6`}
                >
                  <div className="card relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg" style={{ backgroundColor: "#F1F5F9" }}>
                    <div className="px-4 py-5 flex-auto">
                      <Link to={`/oglas/${oglas.id}`} className="card-link">
                        <img
                          alt="..."
                          className="w-full align-middle rounded-lg"
                          src={`http://localhost:9000/uploads/${slikaPath}`}
                          style={{ objectFit: "cover", objectPosition: "center", maxHeight: "300px", minHeight: "300px", maxWidth: "300px", minWidth: "400px", margin: "auto" }}
                        />
                      </Link>
                      <div className="mt-4">
                        <h5 className="card-title text-xl font-bold">
                          <Link to={`/oglas/${oglas.id}`} className="card-link text-black">
                            {oglas.naslov}
                          </Link>
                        </h5>
                        <h6 className="card-subtitle mt-2 text-black">{oglas.cena} €</h6>
                        <h6 className="card-subtitle mt-2 text-black">{oglas.kategorijaNaziv}</h6>
                        <h6 className="card-subtitle mt-2 text-black">{oglas.za_zamenjavo}</h6>
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
              );
            })}
          </div>
        )}
      </section>

      <br></br>
      <Footer />
    </>
  )






}
