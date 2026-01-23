import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Wrapper = styled.div`
    width: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Title = styled.h1`
    margin-top: 48px;
    font-size: 24px;
    font-weight: 800;
`;
const Form = styled.form`
    margin-top: 32px;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
const Input = styled.input`
    height: 48px;
    border-radius: 24px;
    padding: 4px 16px;
    font-size: 16px;
    font-weight: 600;
    color: darkblue;
    &[type="submit"]{
        background-color: slategrey;
        color: linen;
        cursor: pointer;
        &:hover{
            opacity: 0.8;
        }
    }
`;
const Error = styled.span`
    width: 64%;
    margin-top: 8px;
    font-size: 20px;
    color: darkred;
    font-weight: 600;
`
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
            console.log(credentials.user);
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
        <Wrapper>
            <Title>Join ❌</Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" onChange={handleChange} value={name}
                    placeholder="Your Name" type="text" required/>
                <Input name="email" onChange={handleChange} value={email}
                    placeholder="Your email" type="email" required/>
                <Input name="password" onChange={handleChange} value={password}
                    placeholder="Your Password" type="password" required/>
                <Input type="submit" value={is_loading ? "Loading..." : "Create Account"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
        </Wrapper>
    )
}