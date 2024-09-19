
import React, { useState } from "react"
import { AppContextType, CrewMember } from "../types/crew"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { DELETE_CEWMEMBER } from "../graphql/crew-mutations"
import { CREW_LIST } from "../graphql/crew-queries"
import CrewMemberForm from "../modals/CreateCrewMember"
import useAuth from "../hooks/useAuth"


export default function CrewList() {
    useAuth()
    const [openModal, setOpenModal] = useState(false)
    const { crew } = useOutletContext<AppContextType>()


    const navigate = useNavigate()

    const [deleteCrewMember] = useMutation(DELETE_CEWMEMBER, { refetchQueries: [{ query: CREW_LIST }] })

    const handleDelete = (deleteCrewMemberId: string) => {
        deleteCrewMember({ variables: { deleteCrewMemberId } })
    }

    return (
        <>
            <div className={`mt-12 p-4 bg-fullBg h-screen w-full flex flex-col justify-start ${openModal ? 'overflow-visible blur-sm' : ''}`}>
                <header className="flex justify-center p-8 text-slate-900">
                    <h1 className="text-3xl">Crew Members Dashboard</h1>
                </header>
                <section className={`flex justify-center ${!openModal ? '' : 'hidden'}`}>
                    <button className="bg-tableHeader p-2 mb-4 border-b-2 border-tableHeader hover:border-b-2 hover:border-sea transition ease-in duration-300" onClick={() => { setOpenModal(true) }}>Add a crew member</button>
                </section>
                <main className={`rounded border overflow-auto`}>
                    <table className="table-auto border-collapse w-full text-sm">
                        <thead>
                            <tr >
                                <th className="border-b font-medium pt-4 pl-2  pb-3 text-title text-left bg-tableHeader w-24"></th>
                                <th className="border-b font-medium pt-4 pl-2  pb-3 text-title text-left bg-tableHeader">Name</th>
                                <th className="border-b font-medium pt-4 pl-2  pb-3 text-title text-left bg-tableHeader">Rank</th>
                                <th className="border-b font-medium pt-4 pl-2  pb-3 text-title text-left bg-tableHeader">Country</th>
                                <th className="border-b font-medium pt-4 pl-2  pb-3 text-title text-left bg-tableHeader">Phone</th>
                                <th className="border-b font-medium pt-4 pl-2  pb-3 text-title text-left bg-tableHeader w-24"></th>
                                <th className="border-b font-medium pt-4 pl-2  pb-3 text-title text-left bg-tableHeader w-24"></th>
                                <th className="border-b font-medium pt-4 pl-2  pb-3 text-title text-left bg-tableHeader w-24"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {crew && crew.map((c: CrewMember) => {
                                return (
                                    <tr className="hover:bg-tableHeader" key={c.id}>
                                        <td className="p-2 flex justify-center">  <div className="flex w-10 h-10 rounded-full overflow-hidden  ring-2 ring-white mr-3"><img className='h-full w-full object-cover' src={c.avatar} alt="profile photo" /></div>
                                        </td>
                                        <td className="p-2 ">
                                            <div className=" max-w-full flex-col"><div>{c.name}</div><div>{c.email}</div></div>
                                        </td>
                                        <td className="p-2">{c.rank}</td>
                                        <td className="p-2">{c.address.country}</td>
                                        <td className="p-2">{c.phone}</td>
                                        <td className="p-2"><button className="ml-4" onClick={() => navigate(`/crew/${c.id}`)}>Profile</button></td>
                                        <td className="p-2" onClick={() => navigate(`/edit-crew-member/${c.id}`)}><button > <img className="hover:origin-center hover:rotate-12" src="./edit.svg" alt="pencil edit icon" /></button></td>
                                        <td className="p-2"><button onClick={() => { handleDelete(c.id) }}><img className="hover:origin-bottom hover:-rotate-12" src="./delete.svg" alt="trash delete icon" /></button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </main>
            </div >
            <section>
                <div className={`${openModal ? 'absolute h-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'hidden'}`}>
                    <CrewMemberForm />
                </div>
                <button className={`${openModal ? 'z-50 fixed top-16 right-24' : 'hidden'}`} onClick={() => { setOpenModal(false) }}>
                    <img src="/close.png" alt='Cross' width={50} height={50} />
                </button>
            </section >
        </>
    )
}