import styled from "styled-components"

const Wrapper = styled.div`
    height: 100vh;
    /* width: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;

`;
const Message = styled.span`
    font-size: 18px;
`;

export default function Loading(){
    return(
        <Wrapper>
            <Message>
                Loading...
            </Message>
        </Wrapper>
    )
}