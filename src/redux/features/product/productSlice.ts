import {  createSlice } from "@reduxjs/toolkit";

export interface TProduct {
  _id?: string;
  productId?: number;
  productName: string;
  model: string;
  category: string;
  brand: string;
  price: number;
  description: string;
  available: boolean;
  photoURL: string;
}
export interface TSearch {
  searchTerm: string;
  minPrice: number;
  maxPrice: number;
  model: string;
  brand: string;
}

interface ProductsState {
  products: TProduct[];
  search: TSearch;  
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  search:{
    searchTerm: "",
    minPrice: 0,
    maxPrice: Infinity,
    model: "",
    brand: "",
  },
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
 
});

export const {
  
} = productsSlice.actions;

export default productsSlice.reducer;
