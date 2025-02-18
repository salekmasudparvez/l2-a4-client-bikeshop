import {  DeleteOutlined } from "@ant-design/icons";
import { DashboardHeader } from "../../../components/sider/DashboardHeader";
import { useDeleteOrderMutation, useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "../../../redux/features/order/orderApi";
import { Button, Popconfirm, Select, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const OrderManage = () => {
    const { data, isLoading, refetch } = useGetAllOrdersQuery({})
    const [open, setOpen] = useState(false);
    const [deleteOrder, { isLoading: deleteLoading, data: delData, error: delError }] = useDeleteOrderMutation()
    const [updateTrackStatus, { data: trackData, error: trackError, isLoading: trackLoading }] = useUpdateOrderStatusMutation()

    useEffect(() => {
        if (delData) {
            toast.success((delData as any)?.data?.message || "Delete order successfully")
            refetch()
        }
        if (delError) {
            toast.error((delError as any)?.data?.message || "Failed to delete order")
        }
        if (trackData) {
            toast.success((trackData as any)?.data?.message || "Updated track status")
            refetch()
        }
        if (trackError) {
            toast.error((trackError as any)?.data?.message || "Failed to update track status")
        }
    }, [delData, delError, trackData, trackError])
    const showPopconfirm = () => {
        setOpen(true);
    };
    const handleOk = async (id: string) => {
        await deleteOrder({ id })
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleTrackStatusChange = async (trackId: string, id: string) => {
        await updateTrackStatus({ trackId, id })
    }
    const columns = [
        {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: any) => `$${price}`,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Customer",
            dataIndex: ["userInfo", "name"],
            key: "customer",
        },
        {
            title: "Email",
            dataIndex: ["userInfo", "email"],
            key: "email",
        },
        {
            title: "Delivery Status",
            dataIndex: "orderActiveTrack",
            key: "deliveryStatus",
            render: (status: any) => {
                const color = status === 1 ? "orange"
                    : status === 2 ? "blue" : status === 3 ? "purple" : "green";
                return <Tag color={color}>{status === 1 ? "Pending"
                    : status === 2 ? "Processing" : status === 3 ? "Shipped" : status === 4 ? "Delivered" : ""}</Tag>;
            },
        },
        {
            title: "Order ID",
            dataIndex: "orderId",
            key: "orderId",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, data: any) => {

                return <div className="flex gap-1"><Popconfirm
                    title="Title"
                    description="Open Popconfirm with async logic"
                    open={open}
                    onConfirm={() => handleOk(data?._id)}
                    okButtonProps={{
                        loading: deleteLoading,
                    }}
                    onCancel={handleCancel}
                ></Popconfirm><Select
                    defaultValue={data?.orderActiveTrack}
                    style={{ width: "100px" }}
                    onChange={(value) => handleTrackStatusChange(value, data?._id)}>
                        <Select.Option value={1}>Pending</Select.Option>
                        <Select.Option value={2}>Processing</Select.Option>
                        <Select.Option value={3}>Shipped</Select.Option>
                        <Select.Option value={4}>Delivered</Select.Option>

                    </Select><Button onClick={showPopconfirm} icon={<DeleteOutlined />}></Button></div>;
            },
        },

    ];

    return (<div className="p-4 space-y-5">
        <DashboardHeader title="Order Management" />
        <div className="overflow-x-auto">
            <Table loading={isLoading || deleteLoading || trackLoading} columns={columns} dataSource={data?.data} rowKey="_id" />;
        </div>

    </div>)
};

export default OrderManage;
