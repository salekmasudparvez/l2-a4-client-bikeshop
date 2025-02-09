import { Outlet } from "react-router-dom";
import Sider from "../sider/Sider";

export default function DashboardLayout() {

    return (
        <div className="bg-white h-full flex">
            <Sider/>
            <div className="bg-gray-100 w-full min-h-screen">
                
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}