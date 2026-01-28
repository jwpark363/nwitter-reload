import { RouterProvider } from "react-router-dom"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { router } from "./router"

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
    background-color: black;
    color: whitesmoke;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <Wrapper>
    <GlobalStyles />
    <RouterProvider router={router} />
    </Wrapper>
  )
}

export default App
