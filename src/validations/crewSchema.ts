import { z } from 'zod'

export const crewMemberSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email().min(6).max(30),
  phone: z.string().min(2).max(30),
  street: z.string().min(2).max(30),
  city: z.string().min(2).max(30),
  postCode: z.string().min(2).max(30),
  country: z.string().min(2).max(30),
  password: z.string().min(2).max(30),
  avatar: z.string(),
  rank: z.enum(['OWNER', 'CAPTAIN', 'OFFICER', 'BUSON', 'AB', 'OS']),
})

export const editCrewMemberSchema = z.object({
  editCrewMemberId: z.string(),
  name: z.string().min(2).max(30),
  email: z.string().email().min(6).max(30),
  phone: z.string().min(2).max(30),
  avatar: z.string(),
  rank: z.enum(['OWNER', 'CAPTAIN', 'OFFICER', 'BUSON', 'AB', 'OS']),
  address: z.object({
    street: z.string().min(2).max(30),
    city: z.string().min(2).max(30),
    postCode: z.string().min(2).max(30),
    country: z.string().min(2).max(30),
  }),
})
