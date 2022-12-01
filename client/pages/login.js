import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import login from "../styles/login.module.scss";
import { addUser } from '../store/user';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';

const Login = ({ addUser }) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [user, setUser] = useState("")
    const router = useRouter();
    
    const onLogin = (e) => {
        e.preventDefault()
        if(user.length) {
            addUser(user)
            setCookie("user", user)
            router.push("/")
        }
    }

    return (
        <div className={login.login}>
            <h2 className={login.login__title}>Login</h2>
            <Form
                onSubmit={e => onLogin(e)}
            >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>You name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={user}
                        onChange={e => setUser(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <div className={login.login__button}>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addUser: bindActionCreators(addUser, dispatch)
})

export default connect(null, mapDispatchToProps)(Login);