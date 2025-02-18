import {
    FileAddOutlined,
    LockFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    OrderedListOutlined,
    AppstoreAddOutlined,
    ProfileOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
    SolutionOutlined,  // Icon for Transactions
    SearchOutlined,
    MenuOutlined,  // Icon for "All Products"
} from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Link, NavLink } from 'react-router-dom';

const Sider = () => {
    const [collapsed, setCollapsed] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const adminSiderData = [
        {
            key: '1',
            label: 'User Management',
            icon: <TeamOutlined />,
            url: '/dashboard/admin',
        },
        {
            key: '2',
            label: 'Product Management',
            icon: <AppstoreAddOutlined />,
            children: [
                {
                    key: '2.1',
                    label: 'Add Product',
                    icon: <FileAddOutlined />,
                    url: '/dashboard/admin/product/add',
                },
                {
                    key: '2.2',
                    label: 'All Products',
                    icon: <SearchOutlined />,
                    url: '/dashboard/admin/products',
                },
            ],
        },
        {
            key: '3',
            label: 'Order Management',
            icon: <ShoppingCartOutlined />,
            children: [
                {
                    key: '3.1',
                    label: 'Orders',
                    icon: <FileAddOutlined />,
                    url: '/dashboard/admin/orders',
                },
                {
                    key: '3.2',
                    label: 'Transactions',
                    icon: <SolutionOutlined />,
                    url: '/dashboard/admin/order/transactions',
                },
            ],
        },
    ];

    const customerSiderData = [
        {
            key: '1',
            label: 'Profile',
            icon: <ProfileOutlined />,
            url: '/dashboard/customer',
        },
        {
            key: '2',
            label: 'Orders',
            icon: <OrderedListOutlined />,
            url: '/dashboard/customer/orders',
        },
    ];

    const noRole = [
        {
            key: '1',
            label: 'No Data Available',
            icon: <LockFilled />,
            url: '/',
        },
    ];

    return (
        <>
            <div className='md:hidden '>
                
                <div className='absolute z-50 top-7 right-7' >
                    <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer}>
                    </Button>

                </div>
                <Drawer
                    placement="left"
                    onClose={onClose}
                    open={open}
                    width={220}
                    title="Gear Rush"
                >
                    <div className="max-w-56">
                     
                        <div className="flex justify-center flex-col items-center w-full">

                            <div>
                                {user && (
                                    <Menu

                                        defaultSelectedKeys={['1']}
                                        mode="inline"
                                        inlineCollapsed={false}
                                        


                                    >
                                        {user.role === 'admin' ? (
                                            adminSiderData.map((data) => {
                                                if (!data.children) {
                                                    return (
                                                        <Menu.Item icon={data.icon} key={data.key}>
                                                            <NavLink to={data.url}>{data.label}</NavLink>
                                                        </Menu.Item>
                                                    );
                                                }
                                                return (
                                                    <Menu.SubMenu icon={data.icon} key={data.key} title={data.label}>
                                                        {data.children.map((child) => (
                                                            <Menu.Item icon={child.icon} key={child.key}>
                                                                <NavLink to={child.url}>{child.label}</NavLink>
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.SubMenu>
                                                );
                                            })
                                        ) : user.role === 'customer' ? (
                                            customerSiderData.map((data) => (
                                                <Menu.Item icon={data.icon} key={data?.key}>
                                                    <NavLink to={data.url}>{data.label}</NavLink>
                                                </Menu.Item>
                                            ))
                                        ) : (
                                            noRole.map((data) => (
                                                <Menu.Item icon={data.icon} key={data.key}>
                                                    <NavLink to={data.url}>{data.label}</NavLink>
                                                </Menu.Item>
                                            ))
                                        )}
                                    </Menu>
                                )}
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
            <div className="max-w-56 hidden md:inline">
                <Link to="/" className="px-4 pb-2 mt-0 text-nowrap py-5 text-center font-bold">
                    <h1 className="text-4xl font-bold">
                        <span
                            className={`inline-block transition-all duration-1000 ${collapsed ? 'scale-0 opacity-0 w-0' : 'scale-100 opacity-100 w-auto'
                                }`}
                        >
                            <span className="text-blue-500">Gear</span>{' '}
                            <span className="text-orange-500">Rush</span>
                        </span>

                        <span
                            className={`inline-block transition-all duration-1000 ${collapsed ? 'scale-100 opacity-100 w-auto' : 'scale-0 opacity-0 w-0'
                                }`}
                        >
                            <span className="text-blue-500">G.</span>{' '}
                            <span className="text-orange-500">R.</span>
                        </span>
                    </h1>
                </Link>
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
                    <div>
                        {user && (
                            <Menu

                                defaultSelectedKeys={['1']}
                                mode="inline"
                                inlineCollapsed={collapsed}
                            >
                                {user.role === 'admin' ? (
                                    adminSiderData.map((data) => {
                                        if (!data.children) {
                                            return (
                                                <Menu.Item icon={data.icon} key={data.key}>
                                                    <NavLink to={data.url}>{data.label}</NavLink>
                                                </Menu.Item>
                                            );
                                        }
                                        return (
                                            <Menu.SubMenu icon={data.icon} key={data.key} title={data.label}>
                                                {data.children.map((child) => (
                                                    <Menu.Item icon={child.icon} key={child.key}>
                                                        <NavLink to={child.url}>{child.label}</NavLink>
                                                    </Menu.Item>
                                                ))}
                                            </Menu.SubMenu>
                                        );
                                    })
                                ) : user.role === 'customer' ? (
                                    customerSiderData.map((data) => (
                                        <Menu.Item icon={data.icon} key={data?.key}>
                                            <NavLink to={data.url}>{data.label}</NavLink>
                                        </Menu.Item>
                                    ))
                                ) : (
                                    noRole.map((data) => (
                                        <Menu.Item icon={data.icon} key={data.key}>
                                            <NavLink to={data.url}>{data.label}</NavLink>
                                        </Menu.Item>
                                    ))
                                )}
                            </Menu>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sider;
