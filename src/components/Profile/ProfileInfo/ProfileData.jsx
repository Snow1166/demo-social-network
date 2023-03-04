import React from "react";
import style from './ProfileInfo.module.css'

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            <div>
                {isOwner && <button onClick={goToEditMode}>редактировать профиль</button>}
            </div>
            <div>
                <b>FullName: </b>{profile.fullName}
            </div>
            <div>
                <div>
                    <b>Looking for a Job: </b> {profile.lookingForAJob ? 'Да' : 'Нет'}
                </div>
                <div>
                    <b>My skills: </b>{profile.lookingForAJobDescription}
                </div>
                <div>
                    <b>About me:</b> {profile.aboutMe}
                </div>
            </div>
            <div>
                <b>contacts: </b>
                {Object.keys(profile.contacts).map(key => {
                    return <Contact className={style.contactsMargin} key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>
        </div>
    )
}


const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={style.contactsMargin} ><b>{contactTitle}: </b>{contactValue}</div>
    )
}

export default ProfileData
