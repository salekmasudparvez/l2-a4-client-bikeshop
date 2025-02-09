import LoginPic from "../../assets/images/login/login.png";
import { Button, Form, Input, Spin } from "antd";
import Logo from "../../components/ui/Logo";
import { useSignupMutation } from '../../redux/features/auth/authApi';
import { toast } from "sonner";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Registration() {
    const [signup, { data, isLoading, error }] = useSignupMutation();
    const navigate = useNavigate()
   
    useEffect(()=>{
        if (error) {
           
            toast.error((error as any)?.data?.message || "Failed to register");
        }
        if (data) {
            toast.success((data as any)?.data?.message || "Registration Successful");
            navigate('/login');
        }
    },[data,error])
   

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not a valid email!",
        },
    };

    const onFinish = (values: { name: string; password: string; email: string }) => {
        if (!values.name) {
            return toast.error("Name must be provided");
        }
        if (!values.email) {
            return toast.error("Email must be provided");
        }
        if (!values.password) {
            return toast.error("Password must be provided");
        }
        signup(values);
    };

    return (
        <div className="bg-white min-h-screen max-w-screen">
            <div
                style={{ backgroundImage: `url(${LoginPic})` }}
                className="md:h-[300px] h-[200px] w-full bg-cover bg-center"
            ></div>
            <div className="flex justify-center mx-auto flex-col items-center w-full bg-white px-5 py-8 shadow-md rounded-sm -mt-32 md:w-2/3">
                <Logo />
                <Spin spinning={isLoading}>
                    <Form {...layout} name="nest-messages" onFinish={onFinish} style={{ maxWidth: 600 }} validateMessages={validateMessages}>
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ required: true, min: 4, message: "Password must be at least 4 characters" }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </div>
    );
}
