import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import AppLayout from "@/layouts/app";
import { CustomTableRowProps, OrderItem } from "@/types";

const TABLE_COLUMNS = 5;

const ITEMS: OrderItem[] = [
  {
    product_id: 1,
    product_name: "Item X",
    items_per_unit: 8,
    quantity: 50,
    unit_price: 300,
  },
  {
    product_id: 2,
    product_name: "Item Y",
    quantity: 35,
    items_per_unit: 9,
    unit_price: 300,
  },
  {
    product_id: 3,
    product_name: "Item Z",
    quantity: 50,
    items_per_unit: 10,
    unit_price: 300,
  },
  {
    product_id: 4,
    product_name: "Item A",
    quantity: 20,
    items_per_unit: 11,
    unit_price: 300,
  },
  {
    product_id: 5,
    product_name: "Item B",
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
  const { orderId } = useParams<{ orderId: string }>();

  const [itemList, setItemList] = useState<Array<OrderItem>>(ITEMS);

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

  const handleOCCreate = () => {
    print();
  };

  const renderItems = useMemo(() => {
    return itemList.map(
      (
        { product_id, product_name, quantity, items_per_unit, unit_price },
        index,
      ) => (
        <CustomTableRow key={product_id} columns={TABLE_COLUMNS}>
          <p className="text-lg text-start ml-4">{product_name}</p>
          <Input
            value={quantity.toString()}
            variant="bordered"
            onChange={(event) =>
              handleItemValueChange(index, event.target.value)
            }
          />
          <h2 className="text-lg">{items_per_unit}</h2>
          <Button
            className="mx-auto print:hidden"
            color="danger"
            onPress={handleItemRemove(index)}
          >
            <Trash2 />
          </Button>
          <p className="text-lg">{unit_price * quantity}</p>
        </CustomTableRow>
      ),
    );
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
        <CustomTableRow className="border-b-1" columns={TABLE_COLUMNS}>
          <h2 className="text-xl font-bold">Producto</h2>
          <h2 className="text-xl font-bold">Cantidad</h2>
          <h2 className="text-xl font-bold">Items por Unidad</h2>
          <h2 className="text-xl font-bold print:hidden">Eliminar</h2>
          <h2 className="text-xl font-bold">Precio total</h2>
        </CustomTableRow>
        {renderItems}
      </table>

      <div className="my-2 w-full flex justify-between">
        <span className="text-3xl font-bold">Subtotal: </span>
        <span className="text-3xl">$9.99</span>
      </div>
      <div className="my-2 w-full flex justify-between">
        <span className="text-3xl font-bold">ITBIS: </span>
        <span className="text-3xl">$9.99</span>
      </div>
      <div className="my-2 w-full flex justify-between">
        <span className="text-3xl font-bold">Total: </span>
        <span className="text-3xl">$9.99</span>
      </div>
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
