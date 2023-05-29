import Footer from "components/Footers/Footer";
import IndexNavbar from "components/Navbars/IndexNavbar"
import { UserAuth } from "context/AuthContext";
import { useParams } from "react-router-dom";
const PodrobnostiObvestila = () => {

    const { user } = UserAuth();
    const { id } = useParams();
    let parsan_id;
    if (id !== undefined) {
        parsan_id = parseInt(id, 10);
    } else {
        parsan_id = undefined;
    }
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