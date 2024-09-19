import { useQuery } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"
import { FIND_CREWMEMBER_BY_ID } from "../graphql/crew-queries"

export default function Crewmember() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(FIND_CREWMEMBER_BY_ID, {
        variables: { id: String(id) },
    })

    if (loading) {
        return <h2>loading...</h2>
    }

    if (error) {
        console.log(error)
        return <h2>error...</h2>

    }

    if (!data || !data.findCrewMemberById) return <p>No data found</p>

    return (
        <div>
            {data && <p>{data.findCrewMemberById.name}</p>}
        </div>
    )

}