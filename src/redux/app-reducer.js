import {getAuthUserData} from "./auth-reducer";
import {getProfile} from "./profile-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'


let initialState = {
    initialized: false,
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}


export let initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export let initializedApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => dispatch(initializedSuccess()))
}

export default appReducer;
