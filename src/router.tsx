import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./Error";
import Developer from "./views/DeveloperSection/Developer";
import LandingPage from './views/LandingPage/LandingPage.tsx';
import About from "./views/AboutSection/About";


const appRouter = createBrowserRouter([
    {
        path:"/", 
        element: <App/>,
        errorElement:<Error/>,
        children:[
            {
                path:"developers", 
                element:<Developer/>,
            },
            {
                path:"/", 
                element:<LandingPage/>,
            },
            {
              path: "about",
              element: <About />,
            },
        ]
    }
])

export default appRouter; 