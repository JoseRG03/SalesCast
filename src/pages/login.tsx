import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

export default function LoginPage() {
  const nav = useNavigate();

  const handleLogin = () => {
    nav("/calendar");
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col h-full items-center justify-center gap-4 py-8 md:py-10">
        <span className={title()}>Iniciar Sesión</span>
        <Card className="mt-10 w-[50%]">
          <CardBody className=" px-8 py-16 flex flex-col gap-10">
            <Input label="Correo Electrónico" radius="full" />
            <Input label="Contraseña" radius="full" />
            <Button
              color="primary"
              radius="full"
              variant="shadow"
              onPress={handleLogin}
            >
              Iniciar Sesión
            </Button>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}
