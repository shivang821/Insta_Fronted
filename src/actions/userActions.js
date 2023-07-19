import axios from 'axios'
import { setUserLoading, userFail, loadUser, clearUserError } from '../reducers/userReducer'

export const login = (user) => async(dispatch) => {
    try {
        dispatch(setUserLoading());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/api/login', user, config)
        dispatch(loadUser(data.user));
        localStorage.setItem('isAutheticate', true)
    } catch (error) {
        localStorage.setItem('isAutheticate', false)
        dispatch(userFail(error.response.data.message))
    }
}

export const signUp = (userData) => async(dispatch) => {
    try {
        dispatch(setUserLoading())
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/api/signup', userData, config)
        dispatch(loadUser(data.user));
        localStorage.setItem('isAutheticate', true)

    } catch (error) {
        localStorage.setItem('isAutheticate', false)
        dispatch(userFail(error.response.data.message))
    }
}

export const fetchUser = () => async(dispatch) => {
    try {
        dispatch(setUserLoading())
        const { data } = await axios.get("/api/me");
        dispatch(loadUser(data.user))
        localStorage.setItem('isAutheticate', true)
    } catch (error) {
        console.log(error);
        localStorage.setItem('isAutheticate', false)
        dispatch(userFail(error.response.data.message))
    }
}

export const ClearUserErrors = () => async(dispatch) => {
    localStorage.setItem('isAutheticate', false)
    dispatch(clearUserError())
}