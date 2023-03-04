import style from './ProfileInfo.module.css'
import user from '../../../assets/images/user.png'
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import React, {useState} from "react";
import ProfileData from "./ProfileData";
import ProfileReduxForm from "./ProfileReduxForm";

const ProfileInfo = ({profile, ...props}) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const sendPhoto = (e) => {
        let imageFile = e.currentTarget.files[0]
        props.savePhoto(imageFile)
    }
    const onSubmit =  (formData) => {
         props.saveProfile(formData).then(
             ()=> {
             setEditMode(false)
         })
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <div>
                    <img src={profile.photos.large || user} alt={''}/>
                    {props.isOwner &&
                        <div>
                            <input className={style.customFileInput} type="file" id='photo' onChange={sendPhoto}/>
                        </div>
                    }
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                    {editMode
                        ? <ProfileReduxForm initialValues={profile}
                                            profile={profile}
                                            onSubmit={onSubmit}/>
                        : <ProfileData profile={profile}
                                       isOwner={props.isOwner}
                                       goToEditMode={() => setEditMode(true)}/>}
                </div>
            </div>
        </div>
    )
}


export default ProfileInfo
