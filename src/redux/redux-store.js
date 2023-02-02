import {combineReducers, legacy_createStore} from "redux";
import dialogReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    navBarPage: sidebarReducer
})


let store = legacy_createStore(rootReducer)


export default store
