import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {Navigate, redirect, useParams} from "react-router-dom";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";

const ProfileContainer = ({userId, ...props}) => {
    const params = useParams()
    const isOwner = String(userId) === params.userId

    useEffect(() => {
        let currentUserId = params.userId
        if (!currentUserId) {
            if (userId) {
                currentUserId = userId
            } else {
                redirect('Login')
            }
        }
        props.getProfile(currentUserId)
        props.getStatus(currentUserId)
    }, [params.userId])


    if (!props.isAuth) return <Navigate to={'/login'}/>
    return (
        <div>
            <Profile {...props} userId={userId} profile={props.profile} isOwner={isOwner} saveProfile={props.saveProfile}/>
        </div>
    )
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.profileStatus,
    userId: state.auth.userId
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
)(ProfileContainer)
// export default connect(mapStateToProps,{getProfile})(withRouter(ProfileContainer));


