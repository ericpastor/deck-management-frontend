import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { FIND_CREWMEMBER_BY_ID } from "../graphql/crew-queries"
import { useMutation, useQuery } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { editCrewMemberSchema } from "../validations/crewSchema"
import { z } from "zod"
import { EDIT_CREWMEMBER } from "../graphql/crew-mutations"

type FormData = z.infer<typeof editCrewMemberSchema>

export default function EditCrewmember() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(FIND_CREWMEMBER_BY_ID, {
        variables: { id: String(id) },
    });

    const { register, formState: { errors, isSubmitting, isSubmitSuccessful }, handleSubmit, reset } = useForm<FormData>({
        values: {
            editCrewMemberId: id!,
            name: data?.findCrewMemberById?.name || '',
            email: data?.findCrewMemberById?.email || '',
            rank: data?.findCrewMemberById?.rank || '',
            phone: data?.findCrewMemberById?.phone || '',
            avatar: data?.findCrewMemberById?.avatar || '',
            address: {
                street: data?.findCrewMemberById?.address.street || '',
                postCode: data?.findCrewMemberById?.address.postCode || '',
                city: data?.findCrewMemberById?.address.city || '',
                country: data?.findCrewMemberById?.address.country || '',
            },

        },
        resolver: zodResolver(editCrewMemberSchema)
    })


    const [editCrewMember] = useMutation(EDIT_CREWMEMBER)

    const sendData = (
        editCrewMemberId: string,
        name: string,
        email: string,
        rank: string,
        phone: string,
        avatar: string,
        address: {
            street: string,
            postCode: string,
            city: string,
            country: string
        }

    ) => {
        editCrewMember({
            variables: {
                editCrewMemberId,
                name,
                email,
                rank,
                phone,
                avatar,
                address
            },
        });
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        sendData(data.editCrewMemberId, data.name, data.email, data.rank, data.phone, data.avatar, data.address)
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset]);

    if (loading) {
        return <h2>loading...</h2>
    }

    if (error) {
        console.log(error)
        return <h2>error...</h2>

    }

    if (!data || !data.findCrewMemberById) return <p>No data found</p>



    return (

        <main className="flex justify-center relative h-screen w-full overflow-hidden  flex-col ">
            <header>
                <h1 className="text-center">EDIT A CREWMEMBER</h1>
            </header>
            <section className="flex items-center justify-center">
                <form className='flex items-center justify-center align-baseline flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className='rounded-sm border-2 border-title hover:border-sea p-2.5 my-2.5 grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                            <label>Id:</label>
                            <input
                                disabled
                                title="Not allowed to change it"
                                className="min-w-full"
                                {...register('editCrewMemberId', {
                                    required: 'editCrewMemberId is required'
                                })}
                            />
                            {errors.editCrewMemberId && (
                                <p className='text-sm text-red-600'>{errors.editCrewMemberId.message?.replace('String', 'ID')}</p>
                            )}

                        </div>
                        <legend className="px-2.5 font-bold text-sea text-pretty text">Profile</legend>
                        <div>
                            <label className='text-sea'>Name:
                                <input
                                    className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:texttitle focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00" min-w-full'
                                    placeholder=" Jan Breton"
                                    {...register('name', {
                                        required: 'Name is required'
                                    })}
                                />
                                {errors.name && (
                                    <p className='text-sm text-red-600'>{errors.name.message?.replace('String', 'Name')}</p>
                                )}
                            </label>
                        </div>
                        <div>
                            <label htmlFor="email">Email:
                                <input
                                    className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:texttitle focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                                    placeholder=" jan@example.com"
                                    {...register('email', {
                                        required: 'Email is required'
                                    })}
                                />
                                {errors.email && (
                                    <p className='text-sm text-red-600'>{errors.email.message?.replace('String', 'Email')}</p>
                                )}
                            </label>
                        </div>


                        <div>
                            <label>Avatar:
                                <input
                                    className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                                    placeholder="janbreton.com"
                                    {...register('avatar', {
                                        required: 'Avatar is required'
                                    })}
                                />
                                {errors.avatar && (
                                    <p className='text-sm text-red-600'>{errors.avatar.message?.replace('String', 'Avatar')}</p>
                                )}

                            </label>
                        </div>

                        <div>
                            <label>Phone:
                                <input
                                    className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                                    placeholder="+35123456789"
                                    {...register('phone', {
                                        required: 'Phone is required'
                                    })}
                                />
                                {errors.phone && (
                                    <p className='text-sm text-red-600'>{errors.phone.message?.replace('String', 'Phone')}</p>
                                )}



                            </label>
                        </div>
                        <div>
                            <label>Rank:
                                <select className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                                    {...register('rank', {
                                        required: 'Rank is required'
                                    })}
                                >
                                    <option value="CAPTAIN">OWNER</option>
                                    <option value="CAPTAIN">CAPTAIN</option>
                                    <option value="OFFICER">OFFICER</option>
                                    <option value="BUSON">BUSON</option>
                                    <option value="AB">AB</option>
                                    <option value="OS">OS</option>
                                </select>
                                {errors.rank && (
                                    <p className='text-sm text-red-600'>{errors.rank.message?.replace('Enum', 'Rank')}</p>
                                )}
                            </label>
                        </div>

                    </fieldset>
                    <fieldset className='rounded-sm border-2 border-title hover:border-sea p-2.5 my-2.5 grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <legend className='px-2.5 font-bold text-black'>Address</legend>
                        <label>Street:
                            <input
                                className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00 "'
                                placeholder="some street any..."
                                {...register('address.street', {
                                    required: 'Street is required'
                                })}
                            />
                            {errors.address?.street && (
                                <p className='text-sm text-red-600'>{errors.address.street.message?.replace('String', 'Street')}</p>
                            )}

                        </label>
                        <label>City:
                            <input
                                className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                                placeholder="Helsinki"
                                {...register('address.city', {
                                    required: 'city is required'
                                })}
                            />
                            {errors.address?.postCode && (
                                <p className='text-sm text-red-600'>{errors.address.postCode.message?.replace('String', 'City')}</p>
                            )}
                        </label>
                        <label>Post Code:
                            <input
                                className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                                placeholder="00000"
                                {...register('address.postCode', {
                                    required: 'postCode is required'
                                })}
                            />
                            {errors.address?.postCode && (
                                <p className='text-sm text-red-600'>{errors.address.postCode.message?.replace('String', 'Post Code')}</p>
                            )}
                        </label>
                        <label>Country:
                            <input
                                className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                                placeholder="Finland"
                                {...register('address.country', {
                                    required: 'country is required'
                                })}
                            />
                            {errors.address?.country && (
                                <p className='text-sm text-red-600'>{errors.address.country.message?.replace('String', 'Country')}</p>
                            )}
                        </label>
                    </fieldset>

                    <button disabled={isSubmitting} type='submit' >{isSubmitting ? "Updating it..." : "Update!"}</button>
                </form>
            </section>
        </main>


    )

}