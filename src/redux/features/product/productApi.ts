
import { baseApi } from "../../api/baseApi";



const productsApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    getProducts: builder.query<
      any,
      {
        search?: string;
        minPrice?: any; 
        maxPrice?: any;
        model?: any;
        brand?: any;
        limit?: number;
        isAvailable?:boolean
      }
    >({
      query: ({ search, minPrice, maxPrice, model, brand, limit,isAvailable }) => ({
        url: "api/product/get",
        method: "GET",
        params: { search, minPrice, maxPrice, model, brand, limit,isAvailable },
      }),
    }),
    getSingleProduct: builder.query<any, { id: any }>({
      query: ({ id }) => ({
        url: `api/product/get/${id}`,
        method: "GET",
      }),
    }),
    allbrandandcategory: builder.query({
      query: () => ({
        url: `api/product/category-and-brand`,
        method: "GET",
      }),
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "api/product/create",
        method: "POST",
        body: newProduct,
        
      }),
    }),
    updateProduct: builder.mutation({
      query: (formData) => ({
        url: `api/product/update`,
        method: "PATCH",
        body: formData,
      }),
    }),
    updateAvailableStatusProduct: builder.mutation({
      query: (id) => ({
        url: `api/product/available/${id}`,
        method: "PATCH",
      }),
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (productId) => ({
        url: `api/product/delete/${productId}`,
        method: "DELETE",
      }),
      
    }),
    
    
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useAllbrandandcategoryQuery,
  useUpdateAvailableStatusProductMutation,
} = productsApi;

export default productsApi;
