import { useState } from "react";
import axios from "axios";
import { useAuthContext } from './useAuthContext';

export const MyLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post('http://localhost:3000/bee/user/login', {
                email,
                password
            });

            const json = response.data;

            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error.response.data.error)
        }
    }
    return { login, isLoading, error }
}