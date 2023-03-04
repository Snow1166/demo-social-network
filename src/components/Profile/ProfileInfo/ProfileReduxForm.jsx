import React from "react";
import {Field, reduxForm} from "redux-form";
import style from './ProfileInfo.module.css'

const ProfileForm = ({profile, ...props}) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div className={style.errorMessage}>
                    {props.error}
                </div>
                <div>
                    <button>сохранить</button>
                </div>
                <div>
                    <b>FullName: </b>
                    <Field placeholder={'fullName'} name={'fullName'} component={'input'} type={'text'}/>
                </div>
                <div>
                    <b>Looking for a Job: </b>
                    <Field name={'lookingForAJob'} component={'input'} type={'checkbox'}/>
                </div>

                <div>
                    <b>My skills: </b>
                </div>
                <Field name={'lookingForAJobDescription'} component={'textarea'} type={'textarea'}/>

                <div>
                    <b>About me:</b>
                </div>
                <Field name={'aboutMe'} component={'textarea'} type={'textarea'}/>
            </div>
            <div>
                <b>contacts: </b>
                {Object.keys(profile.contacts).map(key => {
                    return (
                        <div className={style.contactsMargin} key={key}>
                            <b>{key}: </b>
                            <Field name={`contacts.${key}`} component={'input'} type={'text'} placeholder={key}/>
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

const ProfileReduxForm = reduxForm({form: 'editProfile'})(ProfileForm)

export default ProfileReduxForm
