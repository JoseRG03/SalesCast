import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";

export default function CalendarListDateCard() {
  return (
    <Card className="aspect-1/2">
      <CardBody>
        <CardHeader>
          <h1>Cliente X</h1>
        </CardHeader>
        <CardBody>
          <p>Se espera vender: $56,000.00 USD</p>
        </CardBody>
        <CardFooter>
          <Button className="mx-auto w-full" color="primary" radius="full">
            Generar Orden de Compra
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
