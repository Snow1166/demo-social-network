import {authAPI, authAPI as api, securityAPI} from "../api/usersAPI";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null,
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})
const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

export let getAuthUserData = () => async (dispatch) => {
    const response = await api.auth()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        let isAuth = true
        dispatch(setAuthUserData(id, email, login, isAuth))
        return response
    }
}

export const login = (loginForm) => async (dispatch) => {
    const response = await authAPI.login(loginForm)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
    if (response.data.resultCode === 10){
        dispatch(getCaptcha())}
    let messagesError = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
    dispatch(stopSubmit('login', {_error: messagesError}));
    }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export const getCaptcha = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))

}

export default authReducer;
