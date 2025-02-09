import { Avatar ,Modal, Table, Tag } from "antd";
import { DashboardHeader } from "../../../components/sider/DashboardHeader";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDeleteProductMutation, useGetProductsQuery, useUpdateAvailableStatusProductMutation } from "../../../redux/features/product/productApi";
import { DeleteOutlined,  EditOutlined, ExclamationCircleFilled, RetweetOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export function ProductManagement() {
  const { data: getProductData, isLoading, refetch } = useGetProductsQuery({});
  const { confirm } = Modal
  const [status, { error:upError, data:upData}]= useUpdateAvailableStatusProductMutation();
  const [deleteProduct, { error:delError, data:delData}]= useDeleteProductMutation();

  const handleDelete = (name:string,id:string) => {
    confirm({
      title: 'Do you want to delete the product?',
      icon: <ExclamationCircleFilled />,
      content: `Name: ${name}`,
      onOk() {
        deleteProduct(id)
      },
     
    });
  };
  const handleStatus =(available:boolean,id:string)=>{
    confirm({
      title: 'Are you sure about the change?',
      icon: <ExclamationCircleFilled />,
      content: `After this the product will be ${available?'not available':' available'}`,
      onOk() {
        status(id)
      },
     
    });
  }
  useEffect(() => {
    
    if ((delData as any)?.success) {
      toast.success(
        (delData as any).message || "Successfully deleted product"
      );
      refetch();
    }
    if (delError) {
      toast.error("Failed to delete product");
    }
    if ((upData as any)?.success) {
      toast.success(
        (upData as any).message || "Successfully updated product status"
      );
      refetch();
    }
    if (upError) {
      toast.error("Failed to update product status");
    }
  }, [delError,delData,upError,upData]);
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Photo",
      dataIndex: "photoURL",
      render: (_: any, action: any) => {
        return <Avatar shape="square" size="large" src={action?.photoURL} />;
      },
    },
    {
      title: "Stock",
      dataIndex: "isAvailable",
      render: (_: any, action: any) => {
        if (action?.isAvailable === true) {
          return <Tag color="green">In Stock</Tag>;
        } else {
          return <Tag color="red">Out of Stock</Tag>;
        }
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, action: any) => {
        return (
          <div className="dropdown bg-white z-10 dropdown-left">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm bg-white border-none shadow-blue-200 rounded-full text-black m-1"
            >
              Action
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu text-left bg-white text-gray-500 shadow-xl rounded-box  p-2 "
            >
              <li className="flex justify-start w-full " >
                <Link
                  to={`/dashboard/admin/product/edit/${action?._id}`}
                  className="text-gray-500 btn border-none btn-sm "
                >
                  <EditOutlined />
                  Edit
                </Link>
              </li>
              <li className="flex justify-start w-full text-red-500">
                <a onClick={()=>handleDelete(action?.productName,action?._id)} className="btn btn-error btn-sm text-red-500 border-none ">
                  <DeleteOutlined />
                  Delete
                </a>
              </li>
              <li className="flex justify-start w-full">
                <a onClick={()=>handleStatus(action?.isAvailable,action?._id)} className="btn btn-error text-nowrap btn-sm border-none text-gray-500">
                <RetweetOutlined />
                  {action?.isAvailable?'Make Unavailable':'Make available'}
                </a>
              </li>
            </ul>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4 space-y-5">
      <DashboardHeader title="Product Management" />
      <div className="text-center p-5 bg-white">
        <Table
          columns={columns}
          loading={isLoading }
          dataSource={getProductData?.data}
          size="small"
        />
      </div>
    </div>
  );
}
