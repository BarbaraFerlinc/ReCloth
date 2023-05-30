import Footer from "components/Footers/Footer";
import IndexNavbar from "components/Navbars/IndexNavbar"
import { UserAuth } from "context/AuthContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "services/api";

const PodrobnostiObvestila = () => {
    const [obvestilo1, setObvestilo1] = useState({});
    const [obvestilo2, setObvestilo2] = useState({});

    const { user } = UserAuth();
    const { id } = useParams();
    let parsan_id;
    if (id !== undefined) {
        parsan_id = parseInt(id, 10);
    } else {
        parsan_id = undefined;
    }
    useEffect(() => {
        api.post('obvestilo/podrobnostiObvestila', { id: parsan_id })
            .then(res => {
                const obvestilo1 = res.data.obvestilo1;
                const obvestilo2 = res.data.obvestilo2;
                console.log(obvestilo1);
                console.log(obvestilo2);
                setObvestilo1(obvestilo1);
                setObvestilo2(obvestilo2);
            })
            .catch(err => {
                console.error(err);
            });
    }, [parsan_id]);

    return (
        <>
            <div>
                <IndexNavbar fixed={true} />
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full md:w-3/4 mx-auto mt-24 mb-4 shadow-xl rounded-lg">
                            <div className="px-6">
                                <div className="text-center mt-4 mb-12">
                                    <h3 class="text-4xl font-normal leading-normal mt-0 mb-2 text-pink-800">
                                        Podrobnosti zamenjave
                                    </h3>
                                    <div className="flex flex-wrap">
                                        <div className="w-full px-4 flex-1">
                                            <span className="text-sm block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100">
                                                <h5 className="text-2xl font-normal leading-normal mt-0 mb-2 text-blueGray-800">
                                                    {obvestilo1.ime} {obvestilo1.priimek}
                                                </h5>
                                                <div className="mb-2 text-blueGray-600 mt-4">
                                                    <i className="mr-2 text-lg text-blueGray-400"></i>
                                                    {obvestilo1.email} <br />
                                                    {obvestilo1.telefon}
                                                </div>
                                            </span>
                                        </div>
                                        <div className="w-full px-4 flex-1">
                                            <span className="text-sm block my-4 p-3 text-blueGray-700 rounded border border-solid border-blueGray-100">

                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </section >
                <Footer />
            </div >
        </>
    )
}

export default PodrobnostiObvestila