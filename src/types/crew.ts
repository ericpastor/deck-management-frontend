export interface CrewMember {
  id: string
  name: string
  phone: string
  address: Address
  email: string
  password: string
  rank: Rank
  avatar: string
  token: string
}

export interface Address {
  street: string
  city: string
  postCode: string
  country: string
}

export enum Rank {
  OWNER,
  CAPTAIN,
  OFFICER,
  BUSON,
  AB,
  OS,
}

export interface AppContextType {
  crew: CrewMember[]
}


export interface DecodedToken {
  userId: string;
  exp: number;
  iat: number;
}