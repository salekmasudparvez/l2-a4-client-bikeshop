import { DashboardHeader } from "../../../components/sider/DashboardHeader";
import { Avatar, Button, Form, Input, InputNumber, Spin } from "antd";
const { TextArea } = Input;
import { useEffect, useState } from "react";
import PhotoUpload from "../../../components/form/PhotoUpload";
import { toast } from "sonner";
import {

  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/features/product/productApi";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm(); 
  const [updateProduct,{data}] = useUpdateProductMutation();
  const params = useParams();
  const { data: product, isLoading } = useGetSingleProductQuery({ id: params.id });

  //console.log(product)
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        productName: product?.data?.productName || "",
        model: product?.data?.model || "",
        category: product?.data?.category || "",
        brand: product?.data?.brand || "",
        price: product?.data?.price || 0,
        description: product?.data?.description || "",
      });
    }
  }, [product, form]);
  useEffect(() => {
   if(data){
    toast.success('Product successfully updated')
   }
  }, [data]);

  const handleUpdateProduct = async (values: any) => {
  

    if (!values?.productName) return toast.error("Please provide a product name");
    if (!values?.category) return toast.error("Please provide a category");
    if (!values?.brand) return toast.error("Please provide a brand");
    if (!values?.price) return toast.error("Please provide a price");
    if (!values?.description) return toast.error("Please provide a description");
    if (!values?.model) return toast.error("Please provide a model");

    const productDoc = {
      productName: values.productName,
      model: values.model,
      category: values.category,
      brand: values.brand,
      price: values.price,
      description: values.description,
      productId:product?.productId,
      photoURL:product?.photoURL,
      id:params?.id
    };

    const formData = new FormData();
    if(fileList.length > 0){
      formData.append("file", fileList[0]);
    }
    formData.append("data", JSON.stringify(productDoc));

    try {
      await updateProduct(formData);
    } catch (error) {
      toast.error("An error occurred while updating the product");
      console.error(error);
    }
  };

  return (
    <div className="p-4 space-y-5">
      <DashboardHeader title="Edit Product" />
      <div>
        <Spin spinning={isLoading || !product} size="large">
          <Form
            form={form} 
            name="productEdit"
            layout="vertical"
            onFinish={handleUpdateProduct}
            onFinishFailed={(e) => console.log(e)}
          >
            <div className="grid grid-cols-1 place-items-center md:grid-cols-2 p-3 gap-3 bg-white">
              <Form.Item
                rules={[{ required: true, message: "Must provide name" }]}
                className="w-full"
                name="productName"
                label="Product Name"
              >
                <Input placeholder="Product name" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must provide model" }]}
                className="w-full"
                name="model"
                label="Model"
              >
                <Input placeholder="Model" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must provide category" }]}
                className="w-full"
                name="category"
                label="Category"
              >
                <Input placeholder="Category" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must provide brand" }]}
                className="w-full"
                name="brand"
                label="Brand"
              >
                <Input placeholder="Brand" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must provide price" }]}
                className="w-full"
                name="price"
                label="Price"
              >
                <InputNumber style={{ width: "100%" }} placeholder="Price" />
              </Form.Item>
              <Form.Item className="w-full " label="Upload photo" >
                <div className="flex"><PhotoUpload fileList={fileList} setFileList={setFileList} />
               {fileList.length===0 && <Avatar size="large" src={product?.data?.photoURL}></Avatar>}
                </div>
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must provide description" }]}
                className="w-full md:col-span-2 "
                name="description"
                label="Product Description"
              >
                <TextArea placeholder="Enter product description" />
              </Form.Item>
            </div>
            <div className="flex justify-start items-center px-4 bg-white">
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Update Product 
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default EditProduct;
