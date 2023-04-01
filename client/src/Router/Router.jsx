// Client side routing
import { createBrowserRouter, Outlet } from "react-router-dom";

// importing componnet from Component Folder
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
// Importing all pages from WebPage folder
import Home from "../WebPage/Home/Home";
import Login from "../WebPage/Login/Login";
import Register from "../WebPage/Register/Register";
import Single from "../WebPage/Single/Single";
import Write from "../WebPage/Write/Write";
const Layout = () => {
  return (
    <>
      <Navbar />
      {/* An <Outlet> should be used in parent route elements to render their child route elements.  */}
      <Outlet />
      <Footer />
    </>
  );
};
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default Router;
