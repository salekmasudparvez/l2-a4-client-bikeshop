import { DashboardHeader } from "../../../components/sider/DashboardHeader";
import { Button, Form, Input, InputNumber, Spin } from "antd";
const { TextArea } = Input;
import { useEffect, useState } from "react";
import PhotoUpload from "../../../components/form/PhotoUpload";
import { toast } from "sonner";
import { useAddProductMutation } from "../../../redux/features/product/productApi";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [fileList, setFileList] = useState([]);
  const [addproduct,{data,error,isLoading}] = useAddProductMutation();
  const navigate = useNavigate()
  const [form]= Form.useForm()
  useEffect(()=>{
    if(data){
      toast.success((data as any)?.data?.message||"Added Product Successfully")
      form.resetFields();
      navigate('/dashboard/admin/products')
    }
    if(error){
      toast.error((error as any)?.data?.message||"Added Product failed")
    }
  },[data,error])
  const handleAddProduct = async (values: any) => {
    if (fileList.length === 0) {
      return toast.error("Please provide an image");
    }

    if (!values?.productName) {
      return toast.error("Please provide a product name");
    }
    if (!values?.category) {
      return toast.error("Please provide a category");
    }
    if (!values?.brand) {
      return toast.error("Please provide a brand");
    }
    if (!values?.price) {
      return toast.error("Please provide a price");
    }
    if (!values?.description) {
      return toast.error("Please provide a description");
    }
    if (!values?.model) {
      return toast.error("Please provide a model");
    }

    const productDoc = {
      productName: values.productName,
      model: values.model,
      category: values.category,
      brand: values.brand,
      price: values.price,
      description: values.description,
    };

    const formData = new FormData();
    formData.append("file", fileList[0]);
    formData.append("data", JSON.stringify(productDoc));

    try {
      await addproduct(formData);
    } catch (error) {
      toast.error("An error occurred while adding the product");
      console.error(error);
    }
  };

  return (
    <div className="p-4 space-y-5">
      <DashboardHeader title="Add Product" />
      <div>
       <Spin spinning={isLoading}>
       <Form
          name="productUpload"
          layout="vertical"
          onFinish={handleAddProduct}
        >
          <div className="grid grid-cols-1 place-items-center md:grid-cols-2 p-3 gap-3 bg-white">
            <Form.Item
              rules={[{ required: true, message: "Must be provide name" }]}
              className="w-full"
              name="productName"
              label="Product Name"
            >
              <Input placeholder="Product name" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Must be provide model" }]}
              className="w-full"
              name="model"
              label="Model"
            >
              <Input placeholder="Model" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Must be provide category" }]}
              className="w-full"
              name="category"
              label="Category"
            >
              <Input placeholder="Category" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Must be provide brand" }]}
              className="w-full"
              name="brand"
              label="Brand"
            >
              <Input placeholder="brand" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Must be provide price" }]}
              className="w-full"
              name="price"
              label="Price"
            >
              <InputNumber style={{ width: "100%" }} placeholder="price" />
            </Form.Item>
            <Form.Item className="w-full" label="Upload photo" name="photoURL">
              <PhotoUpload fileList={fileList} setFileList={setFileList} />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Must be provide description" },
              ]}
              className="w-full md:col-span-2"
              name="description"
              label="Product desscription"
            >
              <TextArea placeholder="Enter product description" />
            </Form.Item>
          </div>
          <div className="flex justify-start items-center px-4 bg-white">
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Add Prodcut
              </Button>
            </Form.Item>
          </div>
        </Form>
       </Spin>
      </div>
    </div>
  );
};

export default AddProduct;
