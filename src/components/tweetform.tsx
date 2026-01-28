import React, { useState } from "react"
import styled from "styled-components"
import { auth, db, storage } from "../firebase"
import { addDoc, collection, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { addTweet } from "../api/firestore"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 8px;
`
const MessageInput = styled.textarea`
    height: 120px;
    resize: none;
    border: 2px solid white;
    border-radius: 12px;
    padding: 8px 12px;
    outline: none;
    /* box-shadow: inset 0 0 0 0px; */
    background-color: darkblue;
    color: white;
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &:focus{
        border: none;
        outline: 2px solid darkorange;
        /* box-shadow: inset 0 0 0 0px; */
    }
    &::placeholder{
        color: wheat;
        font-size: 14px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`
const AttachImageLabel = styled.label`
    border: 2px solid darkgreen;
    padding: 12px 0px;
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 560;
    font-size: 18px;
    border-radius: 24px;
    background-color: #060650;
    cursor: pointer;
`
const AttachImage = styled.input`
    display: none;
`
const SubmitInput = styled.input`
    border-radius: 24px;
    border: 2px solid darkgray;
    padding: 12px 0px;
    font-size: 18px;
    font-weight: 540;
    background-color: steelblue;
    opacity: 0.9;
`

export default function TweetForm(){
    const [is_loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState<File|null>(null);

    const onMessageChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }
    const onImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {target:{files}} = e;
        if(files && files.length > 0){
            setImage(files[0])
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
        if(!auth.currentUser || !message || message.length <= 0) return;
        setLoading(true);
        const result = await addTweet(auth.currentUser.uid,
            auth.currentUser.displayName,
            message, image)
        console.log(result);
        setLoading(false);
        setMessage("");
        setImage(null);
        // try{
        //     setLoading(true);
        //     console.log("add tweet document")
            // const doc_ref = await addDoc(collection(db,"tweet"),{
            //         created_at: Date.now(),
            //         user_id: auth.currentUser.uid,
            //         message: message,
            //         views: 0
            // })
            // console.log("upload image")
            // //folder structure tweet_image/{user_id}/{doc_id}
            // if(image){
            //     const storage_ref = ref(storage, `tweet_image/${auth.currentUser.uid}/${doc_ref.id}`)
            //     const image_ref = await uploadBytes(storage_ref, image)
            //     const image_url = await getDownloadURL(image_ref.ref)
            //     console.log(image_ref, image_url);
            //     console.log("update image link")
            //     await updateDoc(doc_ref, {
            //         "image_link": image_url
            //     })
            // }
            // console.log(doc_ref);
            
        // }catch(err){
        //     console.log(err);
        // }finally{
        //     setLoading(false);
        //     setMessage("");
        //     setImage(null);
        // }
    }
    return(
        <>
        <Form onSubmit={onSubmit}>
            <MessageInput onChange={onMessageChange} maxLength={150} value={message} placeholder="나의 하루는...(150자이내)"/>
            <AttachImageLabel htmlFor="upload_image">Select Image{image ? ` [${image.name}]` : ""}</AttachImageLabel>
            <AttachImage onChange={onImageChange} id="upload_image" type="file" accept="image/*"></AttachImage>
            <SubmitInput type="submit" value={is_loading?"Loading...":"Tweet"}/>
        </Form>
        </>
    )
}