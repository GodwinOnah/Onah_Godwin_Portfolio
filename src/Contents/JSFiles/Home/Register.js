import '../../../Contents/CSSFiles/Login.css';
import {useState, useEffect} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {Login} from './Login.js';
import {ForgottenPassword} from './ForgottenPassword.js';
import bcrypt from 'bcryptjs-react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const Register = () => {

    const navigate = useNavigate();

    const [name,
        SetName] = useState('');
    const [email,
        SetEmail] = useState('');
    const [maidenName,
        setMaidenName] = useState('');
    const [password,
        SetPassword] = useState('');
    const [confirmPassword,
        SetConfirmPassword] = useState('');
    const [isRegistering,
        setIsRegistering] = useState(false);
    const [isRegistered,
        setIsRegistered] = useState(false);
    const [loginStatus,
        setLoginStatus] = useState(false);
    const [isUnderConstruction,
        setIsUnderConstruction] = useState([]);

    useEffect(() => {
        const data = window.localStorage.getItem('login')
        if (data != null) 
            setLoginStatus(JSON.parse(data))
    }, [loginStatus]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/underconstruction`).then((res) => {
            if(res)
            setIsUnderConstruction(res.data);

        }).catch(err => {
            console.log(err);
        })
    }, []);

    const logout = () => {
        window
            .localStorage
            .setItem('login', JSON.stringify(false));
        window
            .location
            .reload();
    }

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_URL}/register`).then((res) => {
            if(res)
            if (res.data.length > 0) 
                setIsRegistered(true);
            }
        ).catch(err => {
            toast.warning("Couldn't fetch data: make sure there is network or call the admin on: +447751776" +
                    "483")
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const hash = bcrypt.hashSync(password); //Hashing password here
        const datax = {name,email,maidenName,hash};
        if (!name || !email || !maidenName || !password || !confirmPassword) 
            return toast.warning("Enter all field");
        if (password !== confirmPassword) {
            toast.warning("Password missmatch")
            return
        }

        if (isRegistered) {
            return toast.warning("Only Admin can register");
        }

        setIsRegistering(true);

        fetch(`${process.env.REACT_APP_URL}/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datax)
        }).then(res => {
            if(res.length!=0){
            SetName("");
            SetEmail("");
            setMaidenName("");
            SetPassword("");
            SetConfirmPassword("")
            toast.success("Registeration successful")
            setIsRegistering(false);
            setTimeout(() => {
                window
                    .location
                    .reload();
            }, 2000);
        }}).catch(err => {
            toast.warning("Registeration failed");
            setIsRegistering(false);

        })
    };

    return (
        loginStatus && navigate("/Admin") ||
        !loginStatus && <div style={{
            cursor: "pointer"
        }}>
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'/>
            <div class="">
                <form onSubmit={handleSubmit}>
                    <div class="container">
                    {!isRegistered &&   <div class="row  ">
                            <div class="col-12 login">
                                <input
                                    value={name}
                                    onChange=
                                    {(e)=>SetName(e.target.value)}
                                    type='text'
                                    placeholder="Name"/>
                            </div>
                            <div class="col-12 login">
                                <input
                                    value={email}
                                    onChange=
                                    {(e)=>SetEmail(e.target.value)}
                                    type='email'
                                    placeholder="Email"/>
                            </div>
                            <div class="col-12 login">
                                <input
                                    value={maidenName}
                                    onChange=
                                    {(e)=>setMaidenName(e.target.value)}
                                    type='test'
                                    placeholder="Maiden Name"/>
                            </div>
                     

                        <div class="col-12 login">
                            <input
                                value={password}
                                onChange=
                                {(e)=>SetPassword(e.target.value)}
                                type='password'
                                placeholder="Choose Password"/>
                        </div>
                        <div class="col-12 login">
                            <input
                                value={confirmPassword}
                                onChange=
                                {(e)=>SetConfirmPassword(e.target.value)}
                                type='password'
                                placeholder="Confirm Password"/>
                        </div>
                        </div>
      }
                        <div class="col-12 login">
                            {isRegistering && <strong>Registration going on...</strong>}
                        </div>
                        <div class="col-12 login">
                            {!isRegistered && <button class="btn btn-primary">Register</button>}
                            {isRegistered && <button disabled class="btn btn-primary">Admin Registered</button>}
                        </div>
                    </div>
                </form>
                <div
                    class="d-flex justify-content-center"
                    style={{
                    margin: '20px'
                }}>
                    {!loginStatus && <ForgottenPassword/>}
                    {!loginStatus && <Login/>}
                    {isUnderConstruction
                        ?.map((isUnderConstruction) => (!isUnderConstruction.underconstruction && loginStatus && <button class="btn btn-primary" onClick={logout}>Logout</button>))}

                </div>
            </div>
        </div>
    );
}
