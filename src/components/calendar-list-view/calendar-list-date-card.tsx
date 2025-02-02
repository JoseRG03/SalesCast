import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";

export type CalendarListDateCardProps = {
  client: string;
  cost: number;
};
export default function CalendarListDateCard(props: CalendarListDateCardProps) {
    const {client, cost} = props;

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
          <Button className="mx-auto w-full" color="primary" radius="full">
            Generar Orden de Compra
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
