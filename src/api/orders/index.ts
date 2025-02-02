import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

import customAxios from "@/global-config/axios";
import { OrderItem } from "@/types";

export type GenericResponse<G> = {
  data: G;
};

type FutureOrdersResponse = {
  future_orders: Array<FutureOrder>;
};

export type FutureOrder = {
  client_id: number;
  proposal: Proposal;
  proposal_date: string;
};

type Proposal = {
  bundle_offer: {
    items: Array<Item>;
    name: string;
    total_bundle_price: number;
  };
};

type Item = {
  product_id?: number;
  product_name?: string;
  quantity?: number;
  total_price?: number;
};

type GroupedDate = {
  date: string;
  dateList: FutureOrder[];
};

const groupOrdersByDate = (orders: FutureOrder[]) => {
  return orders.reduce((acc, order) => {
    const { proposal_date } = order;

    let dateEntry = acc.find(
      (entry) => entry.date === proposal_date,
    ) as GroupedDate;

    if (!dateEntry) {
      dateEntry = { date: proposal_date, dateList: [] };
      acc.push(dateEntry);
    }

    dateEntry?.dateList.push(order);

    return acc;
  }, [] as GroupedDate[]);
};

export async function getFuturePurchaseCalendar(): Promise<GroupedDate[]> {
  const jwt = localStorage.getItem("jwt");

  const response:
    | AxiosResponse<GenericResponse<FutureOrdersResponse>>
    | undefined = await customAxios
    .get("orders/predictions", {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .catch((reason) => {
      toast.error(reason?.response?.data?.message || "Ha ocurrido un error");

      return undefined;
    });

  const groupedOrders = groupOrdersByDate(
    response?.data.data.future_orders || [],
  );

  return groupedOrders;
}


export type SendOCRequest = {
  item_list: Array<OrderItem>;
  client_id: string;
  subtotal: number;
}

export async function sendPurchase(data: SendOCRequest) {
  const jwt = localStorage.getItem("jwt");

  const response = await customAxios.post('orders', data, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
 
  return response;
}