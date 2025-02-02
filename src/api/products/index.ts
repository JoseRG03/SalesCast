import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { GenericResponse } from "../orders";

import customAxios from "@/global-config/axios";

type GetProductsResponse = {
  products: InventoryProduct[];
};
type InventoryProduct = {
  product_id: number;
  product_name: string;
  items_per_unit: number;
  product_unit_price: number;
};

export async function getProductList(): Promise<InventoryProduct[]> {
  const jwt = localStorage.getItem("jwt");

  const response:
    | AxiosResponse<GenericResponse<GetProductsResponse>>
    | undefined = await customAxios
    .get("products", {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .catch((reason) => {
      toast.error(reason?.response?.data?.message || "Ha ocurrido un error");

      return undefined;
    });

  return response?.data.data.products || [];
}
