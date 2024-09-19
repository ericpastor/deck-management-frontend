import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <>
            <nav>
                <Navbar />
            </nav>
            <main>
                <header className="  bg-gradient-to-r from-[#243c5a] via-sky-500 to-[#19375c]  h-screen w-full text-center relative overflow-hidden">
                    <div className="z-30 flex flex-col justify-center h-full relative ">
                        <header className=" pt-40 text-white">
                            <h3 className="text-5xl">Keep your vuoyages safe and tracked</h3>
                            <p className=" pt-5 ">Start your vuayage with Deck Management</p>

                        </header>
                        <footer className="pb-24 flex flex-col flex-grow justify-end ">
                            <div>
                                <a className='border-[2px] text-white text-sm rounded p-2 hover:bg-white hover:text-black ' href="#">Book a demo</a>
                            </div>
                        </footer>
                    </div>
                    <div className="absolute overflow-hidden h-full w-screen top-0 bottom-0 z-10">
                        <img className=" object-cover h-full w-full max-w-none " src="./home_view.JPG"></img>
                    </div>
                </header>
                <section className="flex bg-gradient-to-r from-[#071d35] via-[#153a62] to-[#071d35] relative h-screen w-full overflow-hidden">
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-white text-2xl">Primera mitad</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-white text-2xl">Segunda mitad</p>
                    </div>
                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}