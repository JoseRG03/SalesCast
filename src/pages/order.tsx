import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Link } from "@heroui/link";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import AppLayout from "@/layouts/app";
import { CustomTableRowProps, OrderItem } from "@/types";
import { getProductList } from "@/api/products";
import AddRowSelect from "@/components/add-row-select";
import { formatNumber } from "@/utils/functions";
import { SendOCRequest, sendPurchase } from "@/api/orders";

const ITEMS: OrderItem[] = [
  {
    product_id: 1,
    product_name: "smart watch",
    items_per_unit: 8,
    quantity: 50,
    unit_price: 300,
  },
  {
    product_id: 2,
    product_name: "gaming console",
    quantity: 35,
    items_per_unit: 9,
    unit_price: 300,
  },
  {
    product_id: 3,
    product_name: "tablet",
    quantity: 50,
    items_per_unit: 10,
    unit_price: 300,
  },
  {
    product_id: 4,
    product_name: "smart TV",
    quantity: 20,
    items_per_unit: 11,
    unit_price: 300,
  },
  {
    product_id: 5,
    product_name: "drone",
    quantity: 40,
    items_per_unit: 12,
    unit_price: 300,
  },
];

export function CustomTableRow({
  children,
  className,
  columns,
}: CustomTableRowProps) {
  return (
    <tr className={`grid grid-cols-${columns} pb-2 my-2 ${className ?? ""}`}>
      {children}
    </tr>
  );
}

export default function OrderPage() {
  const TABLE_COLUMNS = 5;

  const { orderId } = useParams<{ orderId: string }>();

  const [itemList, setItemList] = useState<Array<OrderItem>>(ITEMS);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    const sum = itemList.reduce(
      (sum, currentItemValue) =>
        sum + currentItemValue.quantity * currentItemValue.unit_price,
      0,
    );

    setTotalCost(sum);
  }, [itemList]);
  const { data } = useQuery({
    queryKey: ["get-products"],
    queryFn: getProductList,
  });

  const mappedData = useCallback(() => {
    return (
      data?.map((product) => ({
        key: product.product_id,
        label: product.product_name,
      })) || []
    );
  }, [data]);

  const handleItemRemove = (index: number) => () => {
    setItemList([...itemList.slice(0, index), ...itemList.slice(index + 1)]);
  };

  const handleItemValueChange = (index: number, newValue: string) => {
    if (isNaN(parseInt(newValue || "0"))) return;

    const newItem = { ...itemList[index], quantity: parseInt(newValue || "0") };

    setItemList([
      ...itemList.slice(0, index),
      newItem,
      ...itemList.slice(index + 1),
    ]);
  };

  const handleOCCreate = async () => {
    const payload: SendOCRequest = {
      item_list: itemList,
      client_id: orderId || "0",
      subtotal: totalCost,
    };

    await toast.promise(() => sendPurchase(payload), {
      success: () => {
        print();

        return "Éxito!";
      },
      loading: "Cargando...",
      error: "Ha ocurrido un error",
    });
  };

  const renderItems = useMemo(() => {
    return itemList.map(
      (
        { product_id, product_name, quantity, items_per_unit, unit_price },
        index,
      ) => (
        <CustomTableRow key={product_id} columns={TABLE_COLUMNS}>
          <p className="text-small md:text-lg text-start ml-4">
            {product_name}
          </p>
          <Input
            size="sm"
            value={quantity.toString()}
            variant="bordered"
            onChange={(event) =>
              handleItemValueChange(index, event.target.value)
            }
          />
          <h2 className="text-small md:text-lg">{items_per_unit}</h2>
          <Button
            className="mx-auto print:hidden"
            color="danger"
            size="sm"
            onPress={handleItemRemove(index)}
          >
            <Trash2 />
          </Button>
          <p className="text-small md:text-lg">
            ${formatNumber(unit_price * quantity)} USD
          </p>
        </CustomTableRow>
      ),
    );
  }, [itemList]);

  function handleAddProduct(value?: string): void {
    if (!value) return;

    const itemFromData = data?.find(
      (product) => product.product_id.toString() === value,
    );

    if (!itemFromData) return;

    const newItem = {
      ...itemFromData,
      quantity: 0,
      unit_price: itemFromData.product_unit_price,
    };

    setItemList([...itemList, newItem]);
    setAddingItem(false);
  }

  return (
    <AppLayout
      titleText="Generar Orden de Compra"
      trailingContent={
        <Link className="hover:underline cursor-pointer" href="/calendar">
          Volver
        </Link>
      }
    >
      <p className="my-4 print:hidden">
        En base al historial del cliente, te generamos la siguiente propuesta de
        orden de compra:
      </p>
      <span className="text-3xl font-bold">Cliente X</span>
      <p className="mt-4">Fecha: 02/02/2025</p>

      <table className="flex flex-col text-center mt-8">
        <CustomTableRow className="border-b-1" columns={TABLE_COLUMNS}>
          <h2 className="text-small md:text-xl font-bold">Producto</h2>
          <h2 className="text-small md:text-xl font-bold">Cantidad</h2>
          <h2 className="text-small md:text-xl font-bold">Items por Unidad</h2>
          <h2 className="text-small md:text-xl font-bold print:hidden">
            Eliminar
          </h2>
          <h2 className="text-small md:text-xl font-bold">Precio total</h2>
        </CustomTableRow>
        {renderItems}
        {addingItem && (
          <AddRowSelect
            options={mappedData()}
            onSend={(value) => handleAddProduct(value)}
          />
        )}
      </table>

      <div className="my-2 w-full flex justify-between">
        <span className="text-3xl font-bold">Subtotal: </span>
        <span className="text-3xl">${formatNumber(totalCost)} USD</span>
      </div>
      <div className="my-2 w-full flex justify-between">
        <span className="text-3xl font-bold">Impuestos: </span>
        <span className="text-3xl">${formatNumber(totalCost * 0.18)} USD</span>
      </div>
      <div className="my-2 w-full flex justify-between">
        <span className="text-3xl font-bold">Total: </span>
        <span className="text-3xl">
          ${formatNumber(totalCost + totalCost * 0.18)} USD
        </span>
      </div>
      <span className="print:hidden">
        <Button
          className="w-full my-4"
          color="primary"
          radius="full"
          onPress={() => setAddingItem(true)}
        >
          <p>Agregar Item</p>
        </Button>
      </span>
      <span className="print:hidden">
        <Button
          className="w-full my-4"
          color="success"
          radius="full"
          onPress={handleOCCreate}
        >
          <p>Registrar Orden de Compra</p>
        </Button>
      </span>
    </AppLayout>
  );
}
