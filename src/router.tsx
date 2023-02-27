import {
  createBrowserRouter,
  createMemoryRouter,
  Navigate,
} from "react-router-dom";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import Favor from "./pages/Favor";
import MainPage from "./pages/MainPage";
import Suggest from "./pages/Suggest";
import Search from "./pages/Search";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "favor",
        element: <Favor />,
      },
      {
        path: "suggest",
        element: <Suggest />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

export default router;
