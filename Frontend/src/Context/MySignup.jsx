import { useState } from "react";
import axios from "axios";
import { useAuthContext } from './useAuthContext';

export const MySignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (username, email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post('https://localhost:3000/bee/user/signup', {
                username,
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
    return { signup, isLoading, error }
}
