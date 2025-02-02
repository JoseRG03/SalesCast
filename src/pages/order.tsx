import AppLayout from "@/layouts/app";
import { useParams } from "react-router-dom";

export default function OrderPage() {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <AppLayout titleText="Generar Orden de Compra">
      <p>{orderId}</p>
    </AppLayout>
  );
}
