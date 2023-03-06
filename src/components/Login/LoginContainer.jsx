import Login from "./Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {logout, login} from "../../redux/auth-reducer";

const LoginContainer =(props) => {
    return <Login isAuth={props.isAuth} login={props.login} logout={props.logout} captchaUrl={props.captchaUrl}/>
}


const mapStateToProps = (props) => ({
    isAuth: props.auth.isAuth,
    captchaUrl: props.auth.captchaUrl
})
export default compose(
    connect(mapStateToProps, {login, logout}))(LoginContainer)



// export default compose (
//     connect(mapStateToProps,{getProfile, getStatus, updateStatus}),
//     withRouter,
//     withAuthRedirect
// )(ProfileContainer)
