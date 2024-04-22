import { FakeProduct } from "@/types/fakeProduct";
import axios from "axios";

  export async function getProduct(id_product:any): Promise<any> {
    
    const response = await axios.get(`https://fakestoreapi.com/products/${id_product}`);
    return response;
  }