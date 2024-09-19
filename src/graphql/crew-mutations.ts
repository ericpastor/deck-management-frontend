import { gql } from '@apollo/client'

export const CREATE_CREWMEMBER = gql`
  mutation AddCrewMember(
    $name: String!
    $phone: String!
    $street: String!
    $city: String!
    $postCode: String!
    $country: String!
    $email: String!
    $password: String!
    $rank: Rank!
  ) {
    addCrewMember(
      name: $name
      phone: $phone
      street: $street
      city: $city
      postCode: $postCode
      country: $country
      email: $email
      password: $password
      rank: $rank
    ) {
      name
    }
  }
`
export const EDIT_CREWMEMBER = gql`
  mutation EditCrewMember(
    $editCrewMemberId: ID!
    $name: String!
    $phone: String!
    $address: AddressInput!
    $avatar: String!
    $email: String!
    $rank: Rank!
  ) {
    editCrewMember(
      id: $editCrewMemberId
      name: $name
      phone: $phone
      address: $address
      avatar: $avatar
      email: $email
      rank: $rank
    ) {
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

export const DELETE_CEWMEMBER = gql`
  mutation DeleteCrewMember($deleteCrewMemberId: ID!) {
    deleteCrewMember(id: $deleteCrewMemberId) {
      name
    }
  }
`
