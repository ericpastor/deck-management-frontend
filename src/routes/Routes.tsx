import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CrewList from '../pages/CrewList'
import Crewmember from '../pages/Crewmember'
import App from '../App'
import EditCrewMember from '../modals/editCrewMember'
import CrewMemberForm from '../modals/CreateCrewMember'
import RequireAuth from '../components/RequiredAuth'



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/crew',
                element: <RequireAuth element={<CrewList />} />
            },
            {
                path: '/crew/:id',
                element: <RequireAuth element={<Crewmember />} />
            },
            {
                path: '/add-crew-member',
                element: <RequireAuth element={<CrewMemberForm />} />
            },
            {
                path: '/edit-crew-member/:id',
                element: <RequireAuth element={<EditCrewMember />} />
            },
        ]
    },
])

export default router

