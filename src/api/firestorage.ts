import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase"

const IMAGE_STORAGE = "tweet_image"
export const addFile = async (uid:string, doc_id:string, file:File) => {
    if(!file) return null;
    try{
        const _ref = ref(storage, `${IMAGE_STORAGE}/${uid}/${doc_id}`)
        const image_ref = await uploadBytes(_ref, file)
        const image_url = await getDownloadURL(image_ref.ref)
        console.log(image_ref, image_url)
        return image_url
    }catch(err){
        console.log(err)
        throw err
    }
    return null;
}

export const deleteFile = async (uid:string, doc_id:string) => {
    if(!uid || !doc_id) return
    try{
        const _ref = ref(storage, `${IMAGE_STORAGE}/${uid}/${doc_id}`)
        await deleteObject(_ref)
    }catch(err){
        console.log(err)
        throw err
    }
}