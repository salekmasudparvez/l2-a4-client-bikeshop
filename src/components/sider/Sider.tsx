import {
    DashboardFilled,
    FileAddOutlined,
    LockFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    OrderedListOutlined,
    ProductOutlined,
    ProfileOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { NavLink } from 'react-router-dom';



const Sider = () => {

    const [collapsed, setCollapsed] = useState(false);
    const user = useAppSelector((state) => state.auth.user);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const adminSiderData = [
        {
            key: '1',
            label: 'User Management',
            icon: <TeamOutlined />,
            url: '/dashboard/admin'
        },
        {
            key: '2',
            label: 'Product Management',
            icon: <ProductOutlined />,
            children: [
                {
                    key: '2.1',
                    label: 'Add Product',
                    icon:<FileAddOutlined/>,
                    url: '/dashboard/admin/product/add'
                },
                {
                    key: '2.2',
                    label: 'All Products',
                    icon:<DashboardFilled/>,
                    url: '/dashboard/admin/products'
                },
            ],
        },
        {
            key: '3',
            label: 'Order Management',
            icon: <ProductOutlined />,
    
            children: [
                {
                    key: '3.1',
                    label: 'Place Order',
                    url: '/dashboard/admin/order/add'
                },
                {
                    key: '3.2',
                    label: 'Transactions',
                    url: '/dashboard/admin/order/add'
                },
            ],
        },
    ];
    
    const customerSiderData = [
        {
            key: '1',
            label: 'Orders',
            icon: <OrderedListOutlined />,
            url: '/dashboard/customer'
    
        },
        {
            key: '2',
            label: 'Profile Management',
            icon: <ProfileOutlined />,
            url: '/dashboard/customer/profile'
           
        },
        
    ];
    
    const noRole = [
        {
            key: '1',
            label: 'No Data Available',
            icon: <LockFilled />,
        },
    ];
   

    return (
        <div className="max-w-56">
            <div className="px-4 pb-2 mt-0 text-nowrap py-5 text-center font-bold">
                <h1 className="text-4xl font-bold">
                    <span
                        className={`inline-block transition-all duration-1000 ${collapsed ? "scale-0 opacity-0 w-0" : "scale-100 opacity-100 w-auto"
                            }`}
                    >
                        <span className="text-blue-500">Gear</span>{" "}
                        <span className="text-orange-500">Rush</span>
                    </span>

                    <span
                        className={`inline-block transition-all duration-1000 ${collapsed ? "scale-100 opacity-100 w-auto" : "scale-0 opacity-0 w-0"
                            }`}
                    >
                        <span className="text-blue-500">G.</span>{" "}
                        <span className="text-orange-500">R.</span>
                    </span>
                </h1>
            </div>
            <div className="flex justify-center flex-col items-center w-full">
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                        marginBottom: 16,
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                {user && (
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        inlineCollapsed={collapsed}
                    >{
                        user?.role==="admin" ? (adminSiderData?.map((data, idx) => {
                                if (!data?.children) {
                                    return <Menu.Item icon={data?.icon} key={idx}><NavLink to={data?.url}>{data?.label}</NavLink></Menu.Item>
                                }
                                if (data?.children) {
                                    return <Menu.SubMenu icon={data?.icon} key={idx} title={data?.label}>
                                        {data?.children?.map((child) => (<Menu.Item icon={child?.icon} key={child?.key}><NavLink to={child?.url}>{child?.label}</NavLink></Menu.Item>))}
                                    </Menu.SubMenu>
                                }
                            })):user?.role==="customer" ?(customerSiderData?.map((data, idx) => {
                               
                                if (data?.children) {
                                    return <Menu.SubMenu icon={data?.icon} key={idx} title={data?.label}>
                                        {data?.children?.map((child) => (<Menu.Item icon={child?.icon} key={child?.key}><NavLink to={child?.url}>{child?.label}</NavLink></Menu.Item>))}
                                    </Menu.SubMenu>
                            }else{
                                return <Menu.Item icon={data?.icon} key={idx}><NavLink to={data?.url}>{data?.label}</NavLink></Menu.Item>
                            }
                            })):(noRole?.map((data, idx) => {
                                if (!data?.children) {
                                    return <Menu.Item icon={data?.icon} key={idx}><NavLink to={data?.url}>{data?.label}</NavLink></Menu.Item>
                                }
                                if (data?.children) {
                                    return <Menu.SubMenu icon={data?.icon} key={idx} title={data?.label}>
                                        {data?.children?.map((child) => (<Menu.Item icon={child?.icon} key={child?.key}><NavLink to={child?.url}>{child?.label}</NavLink></Menu.Item>))}
                                    </Menu.SubMenu>
                                }
                            }))
                        }

                    </Menu>
                )}
            </div>
        </div>
    );
};

export default Sider;