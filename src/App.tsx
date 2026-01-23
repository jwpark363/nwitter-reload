import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import Login from "./components/login"
import NewAccount from "./components/new_account"

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"/profile",
        element:<Profile />
      }
    ]
  },
  {
    path:"login",
    element:<Login />
  },
  {
    path:"new-account",
    element:<NewAccount />
  }

])

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
