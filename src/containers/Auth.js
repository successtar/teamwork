import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/auth/Login'
import cogoToast from 'cogo-toast';




const Auth = props => {

    const [values, setValues] = React.useState({
                                                email: "",
                                                password: "",
                                                showPassword: false,
                                                invalidemail: false,
                                                invalidpassword: false,
                                                emailError: "",
                                                passwordError: "",
                                                loading: false
                                            });

    const handleChange = event =>  {

        const el = event.target;

        const update = {...values};

        update[el.id] = el.value;

        update[`invalid${el.id}`] = false;

        update[`${el.id}Error`] = "";

        setValues(update);
        
    };

    const handleMouseDownPassword = () => {

    }
    
    const handleClickShowPassword = () => {

        setValues({...values, showPassword: !values.showPassword})
        
    };

    const signIn = event => {

        event.preventDefault();

        const regEmail = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;

        const regPass = /[^]{8,}/;

        const update = {...values};

        /* Validate Email field */

        const emailCheck = regEmail.test(values.email);

        update.invalidemail =  !emailCheck;

        update.emailError = emailCheck ? "" : "Kindly type a valid email address";

        /* Validate Password Field */

        const passCheck = regPass.test(values.password);

        update.invalidpassword =  !passCheck;

        update.passwordError = passCheck ? "" : "Password has minimum of eight characters";

        if (emailCheck && passCheck){

            setValues({...update, loading: true});

            const reqObj = {
                                method: "POST",
                                headers: {
                                            "Content-Type" : "application/json",
                                            "Accept" : "application/json"
                                        },

                                body : JSON.stringify({
                                                        email : values.email,
                                                        password : values.password
                                                    })
                            }
            fetch(`${props.host}/api/v1/auth/signin`, reqObj)

            .then(resp => resp.json())
            
            .then(data => {

                setValues({...update, email: "", password: "", loading: false});

                if (data.status === "success"){

                    //cogoToast.success("Login Successful");

                    return props.loginSuccess(data.data);
                }
                else{

                    const errMess = typeof(data.error) == "object" ? "Internal Server Error" : data.error;

                    cogoToast.error(errMess);
                }
            })
            .catch( err => {

                setValues({...update, loading: false});

                cogoToast.error("Unable to process your request at this time");
            })


        }
        else{

            setValues(update);

        }

    }

    return <Login
                action = {signIn}
                email = {values.email}
                invalidemail = {values.invalidemail}
                emailError = {values.emailError}

                password = {values.password}
                invalidpassword = {values.invalidpassword}
                showPassword = {values.showPassword}
                passToggle = {handleClickShowPassword}
                passwordError = {values.passwordError}

                change = {handleChange}
                loading = {values.loading}
            />
    }




const mapStateToProps = state => {

    return {
      ...state
    }
};

const mapDispatchToProps = dispatch => {
    return {

        loginSuccess: data => dispatch({type: "LOGGED_IN", data: data})
    }
};
      
export default connect(mapStateToProps, mapDispatchToProps)(Auth);