import { Link, useNavigate } from "react-router-dom";
import { Navitem } from "./Navitem";
import Logo from "../../assets/logo//logo.png"
import {   isAuthenticated, logout } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Avatar, Button } from "antd";
import { DashboardFilled, LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";



export function Navbar() {
    const isLogin = useSelector(isAuthenticated);
    const user = useAppSelector((state)=>state.auth.user)
   
  
    const dispatch = useAppDispatch()
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate()
    const navItemData = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "All Products",
            path: "/all-products"
        },
        {
            name: "About Us",
            path: "/about-us"
        }
    ]

    return (
        <div className="max-w-[1200px] bg-white shadow-md w-full rounded-full">
            <div className="navbar bg-white rounded-full  shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn bg-white border-none rounded-b-full lg:hidden">

                            <svg className="h-5 w-5"
                                fill="none"
                                stroke="black" xmlns="http://www.w3.org/2000/svg" width={28} height={24} viewBox="0 0 28 24"><path fill="black" d="M0 0h27.65v5.219H0zm0 9.39h27.65v5.219H0zm0 9.391h27.65V24H0z"></path></svg>
                        </div>
                        <div
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                navItemData?.map((item, index) => (

                                    < Navitem key={index} path={item.path} name={item.name} />
                                ))
                            }
                        </div>
                    </div>
                    <Link to="/" className="font-bold pl-4 tracking-widest text-xl font-sans">
                        <img className="w-40" src={Logo} alt="Gear Rush" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className="menu menu-horizontal px-1">
                        {
                            navItemData?.map((item, index) => (
                                < Navitem key={index} path={item.path} name={item.name} />
                            ))
                        }
                    </div>
                </div>
                <div className="navbar-end gap-0 pr-4 relative">
                    {isLogin ?
                        (<button onClick={() => setMenu(!menu)} className="btn btn-circle hover-none border-none" ><Avatar size="large" src={user?.photoURL||"https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"} /></button>)
                        : (<>
                            <Link to="/login" className="btn border-none rounded-l-full m-0 rounded-r-0 text-white pr-4 bg-[#FF6F00]">Login</Link>
                            <Link to="/signup" className="btn border-none rounded-r-full m-0 rounded-l-0  text-white pr-4 bg-[#007BFF]">Signup</Link></>)}
                    {menu && isLogin && user &&
                        (
                            <ul className="menu-normal menu-sm absolute right-6 bg-white top-7 z-10 dropdown-content text-black text-lg text-left rounded-box mt-3 w-40 p-2 shadow">

                                <li className="active:bg-transparent focus:bg-transparent"><div className="w-full"><Button onClick={()=>navigate(`/dashboard/${user?.role}`)} style={{ width: '110px' }} icon={<DashboardFilled />}> Dashboard</Button></div></li>
                                <li className="active:bg-transparent focus:bg-transparent"><div className="w-full"><Button style={{ width: '110px' }} onClick={() => dispatch(logout())} icon={<LogoutOutlined />}>Logout</Button></div></li>
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
    );
}