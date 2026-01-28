import React, { useState } from "react";
import { Error, Form, FormTitle, FormWrapper, Input, SubmitInput, Switch } from "./ui/account-ui";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const location = useLocation();
    const [is_loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleChange = async (event:React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = event;
        if(name === 'email'){
            setEmail(value);
        }else if(name === 'password'){
            setPassword(value);
        }
    }
    const onSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try{
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            if(location.hash) navigate(`/${location.hash.slice(1)}`)
            else navigate("/")
        }catch(err){
            console.log(err);
            if(err instanceof FirebaseError){
                setError(err.message.slice(10));
            }else{
                setError("the email or password is invalid.")
            }
        }finally{
            setLoading(false);
        }
    }
    return(
        <FormWrapper>
            <FormTitle>Login ❌</FormTitle>
            <Form onSubmit={onSubmit}>
                <Input name="email" onChange={handleChange} value={email}
                    placeholder="Your email" type="email" required/>
                <Input name="password" onChange={handleChange} value={password}
                    placeholder="Your Password" type="password" required/>
                {/* <Input type="submit" value={is_loading ? "Loading..." : "Create Account"} /> */}
                <SubmitInput is_loading={is_loading} label="Login" />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switch>If you are not the member of X. move to <Link to={"/new-account"}>Join X</Link>.</Switch>
        </FormWrapper>
    )
}