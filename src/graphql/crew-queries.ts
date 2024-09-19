import { gql } from '@apollo/client'

export const CREW_LIST = gql`
  query {
    allCrewMembers {
      name
      rank
      email
      phone
      address {
        street
        city
        country
        postCode
      }
      avatar
      token
      id
    }
  }
`

export const FIND_CREWMEMBER = gql`
  query findCrewMemberByName($nameToSearch: String!) {
    findCrewMember(name: $nameToSearch) {
      name
      rank
      email
      phone
      address {
        street
        city
        country
        postCode
      }
      avatar
      id
    }
  }
`
export const FIND_CREWMEMBER_BY_ID = gql`
  query findCrewMemberById($id: ID!) {
    findCrewMemberById(id: $id) {
      name
      rank
      email
      phone
      address {
        street
        city
        country
        postCode
      }
      avatar
      id
    }
  }
`
