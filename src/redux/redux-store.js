import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import dialogReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    dialogsPage: dialogReducer,
    navBarPage: sidebarReducer,
    auth: authReducer,
})


let store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))


export default store
