import styled from "styled-components";
import TweetForm from "../components/tweetform";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
    margin-top: 24px;
    display: grid;
    grid-template-rows: 1fr 4fr;
`;

export default function Home(){
    return(
        <Wrapper>
            <TweetForm />
            <Timeline />
        </Wrapper>
    )
}