import React from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer";

const Obvestilo = () => {



    return (
        <>
            <div>
                <IndexNavbar fixed={true} />
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full md:w-3/4 mx-auto mt-24 mb-4 shadow-xl rounded-lg">
                            <div className="px-6">
                                <div className="text-center mt-4 mb-12">
                                    <h1>Vaša Obvestila</h1>
                                    <p></p>
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

export default Obvestilo;