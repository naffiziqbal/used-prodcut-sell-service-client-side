import Adminroutes from "./Adminroutes/Adminroutes";
import Allusers from "../Components/Dashboard/Admin/Allusers";
import Dashboard from "../Components/Dashboard/Dashboard";
import Sellers from "../Components/Dashboard/Sellers/Sellers";
import MyOrders from "../Components/Dashboard/Users/MyOrders";
import Products from "../Components/Products/Products";
import Login from "../Components/UserData/Login";
import Register from "../Components/UserData/Register";
import DashboardLayOut from "../Layout/DashboardLayOut";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoutes from "./SellerRoutes/SellerRoutes";
import MyProducts from "../Components/Dashboard/Sellers/MyProducts";
import AddAProduct from "../Components/Dashboard/Sellers/AddAProduct";
import MyBuyers from "../Components/Dashboard/Sellers/MyBuyers";
import Allbuyers from "../Components/Dashboard/Admin/Allbuyers";
import Sports from "../Components/Sports/Sports";
import Blog from "../Components/Blogs/Blog";
import AddBlog from "../Components/Blogs/AddBlog";
import ReportedItems from "../Components/Dashboard/Admin/ReportedItems";

const { createBrowserRouter } = require("react-router-dom");
const { default: Error } = require("../Components/Shared/Error/Error");
const { default: Home } = require("../Components/Home/Home/Home");
const { default: Main } = require("../Layout/Main");

export const router = createBrowserRouter(

    [
        {
            path: '/',
            element: <Main />,
            errorElement: <Error />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/register',
                    element: <Register />
                },
                {
                    path: '/sports',
                    element: <Sports />
                },
                {
                    path: '/blog',
                    element: <Blog />
                },
                {
                    path: '/addblog',
                    element: <AddBlog />
                },
                {
                    path: '/products/:category',
                    element:
                        <PrivateRoute>
                            <Products />
                        </PrivateRoute>,
                    loader: ({ params }) => fetch(`https://second-sell.vercel.app/product/${params.category}`)
                }
            ]
        },
        {
            path: '/dashboard',
            element:
                <PrivateRoute>
                    <DashboardLayOut>
                        <Dashboard />
                    </DashboardLayOut>
                </PrivateRoute>,
            children:
                [

                    {
                        path: '/dashboard',
                        element: <Dashboard />
                    },
                    {
                        path: '/dashboard/admin/users',
                        element:
                            <Adminroutes>
                                <Allusers />
                            </Adminroutes>

                    },
                    {
                        path: '/dashboard/admin/sellers',
                        element:
                            <Adminroutes>
                                <Sellers />
                            </Adminroutes>

                    },
                    {
                        path: '/dashboard/admin/buyers',
                        element:
                            <Adminroutes>
                                <Allbuyers />
                            </Adminroutes>

                    },
                    {
                        path: '/dashboard/admin/reported',
                        element:
                            <Adminroutes>
                                <ReportedItems />
                            </Adminroutes>

                    },
                    {
                        path: '/dashboard/users/myorders',
                        element:
                            <MyOrders />
                    },
                    {
                        path: '/dashboard/users/myorders',
                        element:
                            <SellerRoutes>
                                <MyProducts />
                            </SellerRoutes>

                    },
                    {
                        path: '/dashboard/sellers/myproducts',
                        element:
                            <SellerRoutes>
                                <MyProducts />
                            </SellerRoutes>

                    },
                    {
                        path: '/dashboard/sellers/addproducts',
                        element:
                            <SellerRoutes>
                                <AddAProduct />
                            </SellerRoutes>

                    },
                    {
                        path: '/dashboard/users/mybuyers',
                        element:
                            <SellerRoutes>
                                <MyBuyers />
                            </SellerRoutes>

                    },
                ]
        }

    ])
