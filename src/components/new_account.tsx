import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, FormTitle, FormWrapper, Input, SubmitInput, Switch } from "./ui/account-ui";

export default function NewAccount(){
    const navigage = useNavigate();
    const [is_loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = e;

        if(name === "name"){
            setName(value)
        }else if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value)
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(is_loading || name === "" || email === "" || password === ""){
            setError("you need to input name, email and password.");
            return;
        }
        try{
            setLoading(true);
            //create account
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            // console.log(credentials.user);
            //update profile
            await updateProfile(credentials.user,{
                displayName: name
            })
            navigage("/")
        }catch(err){
            //error message
            console.log(err)
            if(err instanceof FirebaseError){
                setError(err.message.slice(10))
            }else{
                setError("the account already exists or the password is invalid.")
            }
        }finally{
            setLoading(false);
        }
        console.log(`${name}, ${email} ${password}`)
    }

    return(
        <FormWrapper>
            <FormTitle>Join ❌</FormTitle>
            <Form onSubmit={onSubmit}>
                <Input name="name" onChange={handleChange} value={name}
                    placeholder="Your Name" type="text" required/>
                <Input name="email" onChange={handleChange} value={email}
                    placeholder="Your email" type="email" required/>
                <Input name="password" onChange={handleChange} value={password}
                    placeholder="Your Password" type="password" required/>
                {/* <Input type="submit" value={is_loading ? "Loading..." : "Create Account"} /> */}
                <SubmitInput is_loading={is_loading} label="Create Account" />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switch>If you have an account. move to <Link to={"/login"}>Login</Link>.</Switch>
        </FormWrapper>
    )
}