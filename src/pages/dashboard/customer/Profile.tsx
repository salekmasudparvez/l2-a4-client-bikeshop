import { Avatar, Button, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { DashboardHeader } from "../../../components/sider/DashboardHeader";
import { useAppSelector } from "../../../redux/hooks";
import { useGetsinglecustomerQuery } from "../../../redux/features/auth/authApi";
import { Link } from "react-router-dom"; 


const Profile = () => {
    const user = useAppSelector((state)=>state.auth.user)
     if(!user){
        return 
     }
    const {data, isLoading} = useGetsinglecustomerQuery({email:user?.email});
    const singleCustomer =(data as any)?.data 
   
 
   
    return (
        <Spin spinning={isLoading || !user}>
            <div className="p-4 space-y-5">
            <DashboardHeader title="Profile Management" />
            <div className="bg-white shadow rounded-lg relative">
                <div className="bg-blue-300 h-32 w-full"></div>

                <div className="flex justify-center -mt-12">
                    <Avatar size={80} src={singleCustomer?.photoURL}  className="border-4 border-white shadow" />
                </div>
                {/* edit button */}
                <Link to="update" className="absolute top-0 right-0">
                    <Button  icon={<EditOutlined/>}></Button>
                </Link>
                {/* customer Info */}
                <div className="text-center text-gray-500 p-5 space-y-2">
                    <h1 className="text-xl font-semibold">{singleCustomer?.name}</h1>
                    <p className="text-sm text-gray-500">Email: {singleCustomer?.email}</p>
                </div>
            </div>
        </div>
        </Spin>
    );
};

export default Profile;
