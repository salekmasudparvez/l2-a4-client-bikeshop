
import { Button, Form, Input, Spin } from "antd";
import LoginPic from "../../assets/images/login/login.png"
import Logo from "../../components/ui/Logo";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setToken } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";



export default function Login() {
    const [login, { data, isLoading, error }] = useLoginMutation();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    if (error) {
        const errMsg = (error as any)?.data?.message || "Failed to login";
        toast.error(errMsg);
    }


    useEffect(() => {
        if ((data as any)?.success) {
            dispatch(setToken({ token: (data as any).data.accessToken, user: (data as any).data.user }));
            toast.success((data as any).message || "Login Successful");
            navigate('/')
        }

    }, [data, dispatch]);
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values: any) => {
        login(values);

    };

    return (
        <div className="bg-white min-h-screen max-w-screen">
            <div style={{ backgroundImage: `url(${LoginPic})` }} className={` md:h-[300px] h-[200px] w-full `}>

            </div>
            <Spin spinning={isLoading}>
                <div className="flex justify-center mx-auto flex-col   items-center w-full bg-white px-5 py-8 shadow-md rounded-sm   -mt-32 md:w-2/3 " >
                    <Logo />

                    <Form

                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        validateMessages={validateMessages}
                    >
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ type: 'string', min: 4 }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>


        </div>
    );
}