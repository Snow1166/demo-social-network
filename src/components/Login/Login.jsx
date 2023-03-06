import {Field, reduxForm} from "redux-form";
import {ControlInputText} from "../../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {Navigate} from "react-router-dom";
import style from './../../common/FormControls/FormControls.module.css'

const LoginForm = ({captchaUrl, ...props}) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'} component={ControlInputText} tag={'input'}
                       validate={required}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'} component={ControlInputText}
                       tag={'input'} validate={required}/>
            </div>

            <div>
                <Field type="checkbox" name={'rememberMe'} component={'input'}/> Remember me
            </div>
            <div className={style.errorMessage}>
                {props.error}

            </div>
            {captchaUrl &&
                <div>
                    <div>
                        <Field placeholder={'please inter captcha'}
                               name={'captcha'}
                               component={'input'}
                               type={'text'}
                               validate={required}/>
                    </div>
                    <div>
                        <img src={captchaUrl} alt={''}/>
                    </div>
                </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData)
    }

    if (!props.isAuth) {
        return (
            <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            </div>
        )
    } else {
        return <Navigate to={'/news'}/>
    }
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

export default Login;
