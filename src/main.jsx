import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainDetail from "./pages/MainDetail/MainDetail.jsx";
import DetailPage from "./pages/DetailPage/index.jsx";
import AddTransaction from "./pages/AddTransaction/index.jsx";
import AddCategory from "./pages/AddCategory/index.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/main-detail",
    element: <MainDetail />,
  },
  {
    path: "/main-detail/:category",
    element: <MainDetail />,
  },
  {
    path: "/:id",
    element: <DetailPage />,
  },
  {
    path: "/add",
    element: <AddTransaction />,
  },
  {
    path: "/add/category",
    element: <AddCategory />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
