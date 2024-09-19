import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_CREWMEMBER } from '../graphql/crew-mutations'
import { SubmitHandler, useForm } from 'react-hook-form';
import { crewMemberSchema } from '../validations/crewSchema';


import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CREW_LIST } from '../graphql/crew-queries';

type FormData = z.infer<typeof crewMemberSchema>


export default function CrewMemberForm() {
    const { register, formState: { errors, isSubmitting, isSubmitSuccessful }, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            name: '',
            email: '',
            rank: 'CAPTAIN',
            phone: '',
            avatar: '',
            street: '',
            postCode: '',
            city: '',
            country: '',
            password: '',
        },
        resolver: zodResolver(crewMemberSchema)
    })


    const [createCrewMember] = useMutation(CREATE_CREWMEMBER, {

        refetchQueries: [{ query: CREW_LIST }]
    })

    const sendData = (
        name: string,
        email: string,
        rank: string,
        phone: string,
        avatar: string,
        password: string,
        street: string,
        postCode: string,
        city: string,
        country: string
    ) => {
        createCrewMember({
            variables: {
                name,
                email,
                rank,
                avatar,
                phone,
                password,
                street,
                postCode,
                city,
                country,
            },
        });
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        sendData(data.name, data.email, data.rank, data.phone, data.avatar, data.password, data.street, data.postCode, data.city, data.country)
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div className='absolute px-24 h-3/4 w-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <form className='rounded bg-[#ccdbe6] p-8' onSubmit={handleSubmit(onSubmit)}>
                <header>
                    <h1 className='text-center font-bold text-sea text-pretty text-3xl'>New Crew Member</h1>
                </header>
                <fieldset className='rounded-sm border-2 border-title hover:border-sea p-2.5 my-2.5 grid grid-cols-1 md:grid-cols-3 gap-4 transition ease-in duration-300'>
                    <legend className="px-2.5 font-bold text-sea text-pretty text">Profile</legend>
                    <div>
                        <label className='text-sea'>Name:
                            <input
                                className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:texttitle focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
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
                        <label htmlFor="password">Password:
                            <input
                                className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:tex-ttitle placeholder:text-ellipsis focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                                placeholder="XXXXXX"
                                {...register('password', {
                                    required: 'Password is required'
                                })}
                            />
                            {errors.password && (
                                <p className='text-sm text-red-600'>{errors.password.message?.replace('String', 'Password')}</p>
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
                <fieldset className='rounded-sm border-2 border-title hover:border-sea p-2.5 my-2.5 grid grid-cols-1 md:grid-cols-3 gap-4 transition ease-in duration-300'>
                    <legend className='px-2.5 font-bold text-black'>Address</legend>
                    <label>Street:
                        <input
                            className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00 "'
                            placeholder="some street any..."
                            {...register('street', {
                                required: 'Street is required'
                            })}
                        />
                        {errors.street && (
                            <p className='text-sm text-red-600'>{errors.street.message?.replace('String', 'Street')}</p>
                        )}

                    </label>
                    <label>City:
                        <input
                            className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                            placeholder="Helsinki"
                            {...register('city', {
                                required: 'city is required'
                            })}
                        />
                        {errors.postCode && (
                            <p className='text-sm text-red-600'>{errors.postCode.message?.replace('String', 'City')}</p>
                        )}
                    </label>
                    <label>Post Code:
                        <input
                            className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                            placeholder="00000"
                            {...register('postCode', {
                                required: 'postCode is required'
                            })}
                        />
                        {errors.city && (
                            <p className='text-sm text-red-600'>{errors.city.message?.replace('String', 'Post Code')}</p>
                        )}
                    </label>
                    <label>Country:
                        <input
                            className='col-span-1 block w-full rounded-sm border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-title focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sea sm:text-sm sm:leading-6" placeholder="0.00"'
                            placeholder="Finland"
                            {...register('country', {
                                required: 'country is required'
                            })}
                        />
                        {errors.country && (
                            <p className='text-sm text-red-600'>{errors.country.message?.replace('String', 'Country')}</p>
                        )}
                    </label>
                </fieldset>

                <button disabled={isSubmitting} type='submit' >{isSubmitting ? "Adding it..." : "Add it!"}</button>
            </form>
        </div>
    )
}