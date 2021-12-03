import React from 'react';
import { Button, Form, Header, Message } from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContext';
import { getPublicAxios, createAxiosInstance } from '../utils/axiosConfig';
import { useHistory } from 'react-router-dom';
import '../Styles/login.css';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';

function Login (props) {
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const [msid, setMsid] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [authSuccess, setAuthSuccess] = useState(false);   
    
    const handleLogin = () => {
        const isEmpty = (msid === '' || password === '');
        if (isEmpty) {
            setError('Please fill all the fields')
            return;
        }

        setLoading(true);
        getPublicAxios().post('/authenticate', {
            username: msid,
            password: password
        })
            .then((res) => {
                const { data: { token, displayName, role, expiresAt } } = res;
                setLoading(false);
                setAuthSuccess(true);
                setTimeout(() => {
                    createAxiosInstance(axios, token)
                    authContext.setAuthInfoWrapper({ token, username: displayName, role, expiresAt });
                    history.push('/home');
                }, 1500);
            })
            .catch(err => {
                let statusCode = 401;
                let message = ''
                if (err.response) {
                    statusCode = err.response.status;
                }
                if (statusCode === 403) {
                    message = 'Authentication Failed'
                }
                if (statusCode === 401) {
                    message = 'Error Logging in. Please contact site administrator.'
                }
                setLoading(false);
                setError(message);
            })
    }

        return (
            <>
                <div className='loginContainer'>
                    <div className='formDiv'>
                        <Header size="medium" className='marginTopSmall' textAlign='center'>Login using MSID</Header>
                        {error && <Message error>{error}</Message>}
                        <Form className='loginForm marginTopLarge' size='large'>
                            <Form.Input
                                className="formInput"
                                icon="user outline"
                                required
                                name="msid"
                                iconPosition="left"
                                value={msid}
                                label="MSID"
                                onChange={(e) => {
                                    setMsid(e.target.value);
                                    setError('');
                                }}
                                placeholder="MSID" />

                            <Form.Input
                                className='formInput'
                                icon="lock"
                                required
                                iconPosition="left"
                                name="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                value={password}
                                label="Password"
                                placeholder="Password"
                                type="password"
                            />
                            <Button
                                className="loginButton"
                                loading={loading}
                                type='Submit'
                                onClick={handleLogin}
                            >
                                Login
                        </Button>
                        </Form>
                        {authSuccess && <Message success >Authentication Successful</Message>}
                    </div>
                </div>
            </>
        )
    
}

export default Login;
