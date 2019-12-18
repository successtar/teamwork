import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Logo from '../../assets/image/logo.png';
import classes from './Login.module.scss'
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link, Redirect } from 'react-router-dom';

const Login = props => {

    return(
        <Grid container className={classes.loginCont} >
            <Box className={classes.logoBox}>
                <Link to="/">
                    <img src={Logo} alt="Teamwork" className={classes.logo}/>
                </Link>
            </Box>
                <Grid item  xs={false} md={6} className={classes.leftSide} >
                
                </Grid>
                <Grid item xs='auto' md={6} className={classes.rightSide} >
                    <form onSubmit={props.action} noValidate >

                        <Grid container alignItems="flex-end"  spacing={2}>
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField 
                                    id="email" 
                                    label="Email" 
                                    type="email"
                                    value={props.email}
                                    error={props.invalidemail}
                                    onChange={props.change} 
                                    autoComplete="off"
                                />
                            </Grid>  
                        </Grid>
                            <Box marginLeft="40px">
                                <FormHelperText 
                                    error={props.invalidemail}>
                                    {props.emailError}
                                </FormHelperText>
                            </Box>
                        
                        <Grid container alignItems="flex-end" spacing={2} >
                            <Grid item>
                                <LockIcon />
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <InputLabel htmlFor="password" 
                                        error={props.invalidpassword}>
                                        Password
                                    </InputLabel>
                                    <Input label="Password" 
                                        error={props.invalidpassword}
                                        id="password"
                                        type={props.showPassword ? 'text' : 'password'}
                                        value={props.password}
                                        onChange={props.change} 
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={props.passToggle}
                                            //onMouseDown={handleMouseDownPassword}
                                            >
                                            {props.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid> 
                        </Grid>
                            <Box marginLeft="40px">
                                <FormHelperText 
                                error={props.invalidpassword}
                                >{props.passwordError}</FormHelperText>
                            </Box>
                        <Grid> 
                            { props.loading ?
                                <CircularProgress 
                                    size={24}
                                    color="inherit"
                                    className={classes.loginButton}
                                />
                                :
                                <Button
                                    variant="outlined" 
                                    size="small" 
                                    className={classes.loginButton}
                                    endIcon={<LockOpenIcon/>}
                                    type="submit"
                                >
                                    Login
                                </Button>
                            }
                        </Grid>
                    </form> 
                </Grid>
          
            </Grid>
    )
}

export default Login;