import styled from "styled-components";

export const FormWrapper = styled.div`
    width: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const FormTitle = styled.h1`
    margin-top: 48px;
    font-size: 24px;
    font-weight: 800;
`;
export const Form = styled.form`
    margin-top: 32px;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
export const Input = styled.input`
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
export const Error = styled.span`
    width: 64%;
    margin-top: 8px;
    font-size: 20px;
    color: darkred;
    font-weight: 600;
`;
export const Switch = styled.span`
    width: 76%;
    margin-top: 8px;
    font-size: 16px;
    color: darkgray;
    font-weight: 360;
    text-align: center;
`;


interface SubmitProps{
    label:string
    is_loading:boolean
}
export function SubmitInput({label, is_loading}:SubmitProps){
    return(
        <Input type="submit" value={is_loading ? "Loading..." : label}/>
    )
}