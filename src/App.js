import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, {useEffect, Suspense} from "react";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./common/Preloader/Preloader";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileConteiner"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const LoginContainer = React.lazy(() => import("./components/Login/LoginContainer"));
const Music = React.lazy(() => import("./components/Music/Music"));
const News = React.lazy(() => import("./components/News/News"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));

const App = (props) => {
    useEffect(() => {
        props.initializedApp()
    })
    if (!props.initialized) {
        return <Preloader/>
    }
    return (
        <Provider store={store}>
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavbarContainer/>
                <div className="app-wrapper-content">
                    <Suspense fallback={<Preloader/>}>
                        <section>
                            <Routes>
                                <Route path='/login/*' element={<LoginContainer/>}/>
                                <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                                <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                                <Route path='/music/*' element={<Music/>}/>
                                <Route path='/news/*' element={<News/>}/>
                                <Route path='/users/*' element={<UsersContainer/>}/>
                                <Route path='/settings/*' element={<Settings/>}/>
                            </Routes>
                        </section>
                    </Suspense>
                </div>
            </div>
        </Provider>
    );
}

const mapStateToProps = (state) => ({
    initialized: state.appPage.initialized
})

const AppContainer = connect(mapStateToProps, {initializedApp})(App);


const MainApp = () => {
    return (
        // <BrowserRouter basename={process.env.PUBLIC_URL}>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp
