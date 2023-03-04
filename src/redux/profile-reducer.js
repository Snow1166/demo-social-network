import {profileAPI} from "../api/usersAPI";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        {id: 1, post: 'Its, my first post', likesCount: 15},
        {id: 2, post: 'Н///Й такую работу', likesCount: 150},
        {id: 3, post: 'post', likesCount: 3},
    ],
    profile: null,
    profileStatus: '',
    captchaUlr: ''
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: ++state.posts.length,
                    post: action.textPost,
                    likesCount: 0
                }],
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.idPost)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                profileStatus: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.file}
            }
        default:
            return state
    }
}

export let addPost = (textPost) => ({type: ADD_POST, textPost})
export let deletePost = (idPost) => ({type: DELETE_POST, idPost})
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
const setStatus = (status) => ({type: SET_STATUS, status})
const savePhotoSuccess = (file) => ({type: SAVE_PHOTO_SUCCESS, file})

export const getProfile = (userId) => async (dispatch) => {
    return profileAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response))
    })
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    response.status === 200 && dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    dispatch(setStatus(status))
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch) => {
    let response = await profileAPI.saveProfile(profile)
    if (response.resultCode === 0) {
        dispatch(getProfile(profile.userId))
    } else {
        const messagesError = response.messages.length > 0 ? response.messages[0] : 'Some error'
        dispatch(stopSubmit('editProfile', {_error: messagesError}));
        return Promise.reject(response.messages[0] )
    }
}

export default profileReducer;
