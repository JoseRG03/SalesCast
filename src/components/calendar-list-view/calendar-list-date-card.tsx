import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { useNavigate } from "react-router-dom";

import { CalendarListDateCardProps } from "@/types";


export default function CalendarListDateCard(props: CalendarListDateCardProps) {
  const { client, cost, orderId } = props;
  const nav = useNavigate();

  const handleGenerateOCClick = () => {
    nav(`/order/${orderId}`);
  };

  return (
    <Card className="aspect-1/2 flex-grow">
      <CardBody>
        <CardHeader>
          <h1>{client}</h1>
        </CardHeader>
        <CardBody>
          <p>Se espera vender: ${cost} USD</p>
        </CardBody>
        <CardFooter>
          <Button
            className="mx-auto w-full"
            color="primary"
            radius="full"
            onPress={handleGenerateOCClick}
          >
            Generar Orden de Compra
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
};
