import { useEffect, useState } from "react"
import styled from "styled-components"
import type { ITweet } from "../types"
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { auth, db } from "../firebase"
import { CircleQuestionMark, ImageOff, Trash2, UserPen } from "lucide-react"
import { deleteImage, deleteTweet } from "../api/firestore"
import { useConfirm } from "./use-confirm"

const Wrapper = styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    overflow-y: scroll;
    scrollbar-width: none;
`
const LineItem = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: 120px;
    border: 1px solid wheat;
    border-radius: 24px;
    padding: 12px 18px;
`
const Message = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 16px;
    .display{
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
    }
    .button{
        padding: 2px 8px;
        border: 1px solid white;
        border-radius: 4px;
        opacity: 0.8;
        cursor: pointer;
    }
`
const Image = styled.div`
    img{
        width: 100px;
        height: 100px;
        border: 2px solid darkgreen;
        border-radius: 24px;
    }
`;

export default function Timeline(){
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const confirm = useConfirm();
    useEffect(()=> {
        // (async() => {
        //     const result = await getTweets();
        //     console.log(result);
        //     if(result.result){
        //         setTweets(result.data);
        //     }
        // })();
        const ref = query(
            collection(db,"tweet"),
            orderBy("created_at", "desc")
        )
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
                ...doc.data(),
                doc_id: doc.id,
            }));
            console.log(list)
            setTweets(list as ITweet[])
        });
        return () => unsubscribe()
    },[])
    const handleDeleteTweet = async (doc_id:string) => {
        console.log('delete tweet')
        const is_confirm = await confirm({
            message:"해당 트윗을 삭제하시겠습니다?",
            title:"삭제 확인"
        })
        if(!is_confirm) return;
        if(!auth.currentUser?.uid || !doc_id) return
        await deleteTweet(auth.currentUser.uid,doc_id)
    }
    const handleDeleteImage = async (doc_id:string) => {
        console.log('delete image')
        const is_confirm = await confirm({
            message:"해당 트윗의 이미지를 삭제하시겠습니다?",
            title:"삭제 확인"
        })
        if(!is_confirm) return;
        if(!auth.currentUser?.uid || !doc_id) return
        await deleteImage(auth.currentUser.uid,doc_id)
    }
    return (
        <Wrapper>
        {tweets.map((tweet) => 
            <LineItem key={tweet.doc_id}>
                    <Message>
                        <div className="display">
                            {tweet.display_name ? <UserPen size={18} /> : <CircleQuestionMark size={18}/>}
                            <span>{tweet.display_name}</span>
                        </div>
                        <span>{tweet.message}</span>
                        {auth.currentUser?.uid && auth.currentUser.uid === tweet.user_id &&
                        <div className="display">
                            <div className="button">
                                <Trash2 size={16} onClick={()=>handleDeleteTweet(tweet.doc_id)}/>
                            </div>
                            <div className="button">
                                <ImageOff size={16} onClick={()=>handleDeleteImage(tweet.doc_id)}/>
                            </div>
                        </div>}
                    </Message>
                    <Image>{tweet.image_link && <img src={tweet.image_link} />}</Image>

            </LineItem>
        )}
        </Wrapper>
    )
}