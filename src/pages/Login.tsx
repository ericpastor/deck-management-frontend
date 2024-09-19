import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
     token
    }
  }
`;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

    const handleLogin = async () => {
        try {
            const result = await login({ variables: { email, password } });
            if (data) {
                const token = await result.data?.login.token
                if (token) {
                    localStorage.setItem('token', token)
                    navigate('/crew')
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='mt-40'>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} disabled={loading}>
                Login
            </button>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};