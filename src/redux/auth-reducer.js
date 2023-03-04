import {authAPI, authAPI as api} from "../api/usersAPI";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_CAPTCHA = 'SET_CAPTCHA'


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captchaUlr: action.urlCaptcha
            }
        default:
            return state
    }
}

const setCaptcha = (urlCaptcha) => ({type: SET_CAPTCHA, urlCaptcha})

export let setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

export let getAuthUserData = () => async (dispatch) => {
    let response = await api.auth()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        let isAuth = true
        dispatch(setAuthUserData(id, email, login, isAuth))
        return response
    }
}

export const login = (loginForm) => async (dispatch) => {
    let response = await authAPI.login(loginForm)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let messagesError = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: messagesError}));
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export const getCaptcha = () => async (dispatch) => {
    let response = await authAPI.getCaptcha()
    if (response.data.resultCode === 0) {
        dispatch(setCaptcha(response.data))
    }
}

export default authReducer;
