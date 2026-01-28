import { addDoc, collection, deleteDoc, doc, FirestoreError, 
    getDoc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import type { ITweet } from "../types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addFile, deleteFile } from "./firestorage";

enum ErrorCode {
    permission_denied = "permission-denied",
    not_found = "not-found",
    aborted = "aborted"
}
const COLLECTION = "tweet"
const IMAGE_STORAGE = "tweet_image"
const DefaultErrorMessage = "알수 없는 오류 입니다. 다시시도해주세요."

const errorMessage = (code: ErrorCode) => {
    switch(code){
        case ErrorCode.permission_denied:
            return "권한이 없습니다."
        case ErrorCode.not_found:
            return "문서를 찾을 수 없습니다."
        case ErrorCode.aborted:
            return "치리중 문제가 발생하였습니다. 다시시도해주세요."
        default:
            return DefaultErrorMessage
    }
}

export interface IResult{
    result: boolean
    data: ITweet[]
    message: string | null
}

export const getTweets = async () => {
    let result : IResult = {
        result: false,
        data: [],
        message: null
    }
    try{
        const doc_query = query(
            collection(db,COLLECTION),
            orderBy("created_at", "desc")
        )
        const snapshot = await getDocs(doc_query)
        const tweets = snapshot.docs.map(doc => ({
            ...doc.data(),
            doc_id: doc.id
        }));
        result.result = true
        result.data = tweets as ITweet[]
    }catch(err){
        result.result = false
        if(err instanceof FirestoreError){
            result.message = errorMessage(err.code as ErrorCode)
        }else{
            result.message = DefaultErrorMessage
        }
    }
    return result;
}

export const addTweet = async (uid:string, 
    display_name: string | null, 
    message:string, 
    image_file:File | null) => {
    let result : IResult = {
        result: false,
        data: [],
        message: null
    }
    try{
        const doc_ref = await addDoc(collection(db,COLLECTION),{
                created_at: Date.now(),
                user_id: uid,
                display_name: display_name,
                message: message ? message : "",
                views: 0
        })
        //folder structure tweet_image/{user_id}/{doc_id}
        if(image_file){
            const image_url = await addFile(uid, doc_ref.id, image_file)
            await updateDoc(doc_ref, {
                "image_link": image_url
            })
        }
        console.log(doc_ref);
        result.result = true;
    }catch(err){
        console.log(err);
        result.result= false;
        if(err instanceof FirestoreError){
            result.message = errorMessage(err.code as ErrorCode)
        }else{
            result.message = DefaultErrorMessage
        }
    }
    return result;
}

export const deleteTweet = async (uid:string,doc_id:string) => {
    let result : IResult = {
        result: false,
        data: [],
        message: null
    }
    if(!uid || !doc_id) return result
    try{
        await deleteDoc(doc(db, COLLECTION, doc_id))
        await deleteFile(uid,doc_id)
        result.result = true;
    }catch(err){
        console.log(err);
        result.result= false;
        if(err instanceof FirestoreError){
            result.message = errorMessage(err.code as ErrorCode)
        }else{
            result.message = DefaultErrorMessage
        }       
    }
    return result;
}

export const deleteImage = async (uid:string,doc_id:string) => {
    let result : IResult = {
        result: false,
        data: [],
        message: null
    }
    if(!uid || !doc_id) return result
    console.log(uid,doc_id)
    try{
        await deleteFile(uid,doc_id)
        // update image link
        await updateDoc(doc(db, COLLECTION, doc_id),{
            "image_link":""
        })
        result.result = true;
    }catch(err){
        console.log(err);
        result.result= false;
        if(err instanceof FirestoreError){
            result.message = errorMessage(err.code as ErrorCode)
        }else{
            result.message = DefaultErrorMessage
        }       
    }
    return result;
}