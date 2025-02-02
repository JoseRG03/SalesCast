import AppLayout from "@/layouts/app";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ReactNode, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { CustomTableRowProps, OrderItem } from "@/types";

const items: OrderItem[] = [
  {
    itemId: 1,
    itemName: "Item X",
    quantity: 50,
  },
  {
    itemId: 2,
    itemName: "Item Y",
    quantity: 35,
  },
  {
    itemId: 3,
    itemName: "Item Z",
    quantity: 50,
  },
  {
    itemId: 4,
    itemName: "Item A",
    quantity: 20,
  },
  {
    itemId: 5,
    itemName: "Item B",
    quantity: 40,
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
  const { orderId } = useParams<{ orderId: string }>();

  const [itemList, setItemList] = useState<Array<OrderItem>>(items);

  const handleItemRemove = (index: number) => () => {
    setItemList([...itemList.slice(0, index), ...itemList.slice(index + 1)]);
  };

  const handleOCCreate = () => {
    print();
  };

  const renderItems = useMemo(() => {
    return itemList.map(({ itemId, itemName, quantity }, index) => (
      <CustomTableRow key={itemId} columns={4}>
        <p className="text-lg text-start ml-4">{itemName}</p>
        <Input defaultValue={(quantity ?? 0).toString()} variant="bordered" />
        <Button
          className="mx-auto print:hidden"
          color="danger"
          onPress={handleItemRemove(index)}
        >
          <Trash2 />
        </Button>
        <p className="text-lg ml-4">$5,400.00</p>
      </CustomTableRow>
    ));
  }, [itemList]);

  return (
    <AppLayout titleText="Generar Orden de Compra">
      <p className="my-4 print:hidden">
        En base al historial del cliente, te generamos la siguiente propuesta de
        orden de compra:
      </p>
      <span className="text-3xl font-bold">Cliente X</span>
      <p className="mt-4">Fecha: 02/02/2025</p>

      <table className="flex flex-col text-center mt-8">
        <CustomTableRow className="border-b-1" columns={4}>
          <h2 className="text-xl font-bold">Producto</h2>
          <h2 className="text-xl font-bold">Cantidad</h2>
          <h2 className="text-xl font-bold print:hidden">Eliminar</h2>
          <h2 className="text-xl font-bold">Precio total</h2>
        </CustomTableRow>
        {renderItems}
      </table>
      <span className="print:hidden">
        <Button className="w-full my-4" color="primary" radius="full">
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
          <p>Generar Orden de Compra</p>
        </Button>
      </span>
    </AppLayout>
  );
}
