import { Select, Table, Tag } from "antd";
import { DashboardHeader } from "../../../components/sider/DashboardHeader";
import { useGetAllUserQuery, useUpdateStatusMutation } from "../../../redux/features/auth/authApi";
import { useEffect } from "react";
import { toast } from "sonner";

export function UserManagement() {
  const { data: getAllUsers, isLoading,refetch } = useGetAllUserQuery({});
  const [update, { error,data, isLoading: isUpdateLoading }] = useUpdateStatusMutation({});
  const handleUser = (action: any, id: any) => {
    update({
      id,
      action
    })
  };
  useEffect(() => {
    if ((data as any)?.success) {
        toast.success((data as any).message || "Successfully updated user status");
        refetch()
    }
    if(error){
      toast.error('Failed to update')
    }

}, [data,error]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (_: any, action: any) => {
        if (action?.isActive === true && action?.isBlocked === false) {
          return <Tag color="green">ACTIVE</Tag>;
        } else if (action?.isActive === false && action?.isBlocked === false) {
          return <Tag color="blue">Deactivated</Tag>;
        } else if (action?.isBlocked === true) {
          return <Tag color="red">BLOCKED</Tag>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, action: any) => {
        return (
          <Select onChange={(value) => handleUser(value, action?._id)} style={{ width: "100%" }} placeholder="Select" disabled={action?.isBlocked||action?.role==="admin"} defaultValue={action?.isBlocked === true ? "block" : action?.isActive ? "active" : "deactive"} >
            <Select.Option value="block">
              Block
            </Select.Option>
            <Select.Option value="active">
              Active
            </Select.Option>
            <Select.Option value="deactive">
              Deactive
            </Select.Option>
          </Select>
        );
      },
    },
  ];
 

  return (
    <div className="p-4 space-y-5">
      <DashboardHeader title="User Management" />
      <div className="text-center p-5 bg-white overflow-x-auto">
        <Table
          columns={columns}
          loading={isLoading ||isUpdateLoading}
          dataSource={getAllUsers?.data}
          size="small"
        />
      </div>
    </div>
  );
}
