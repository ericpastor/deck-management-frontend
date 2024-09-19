import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    userId: string;
    exp: number;
}

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                console.log(error)
                localStorage.removeItem('token');
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);
};

export default useAuth;
