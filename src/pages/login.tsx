import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { LogIn } from "@/api/auth";
import { LoginFormRequest } from "@/api/auth/login-types";

export default function LoginPage() {
  const nav = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    username: string | null;
    password: string | null;
  }>({ username: null, password: null });

  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Handles Form Validation
  const handleLogin = () => {
    let isInvalid = false;
    let username = userRef.current?.value || "";
    let password = userRef.current?.value || "";

    if (!userRef.current?.value) {
      isInvalid = true;
      username = "Debe de ingresar un usuario valido";
    }

    if (!passwordRef.current?.value) {
      isInvalid = true;
      password = "Debe de ingresar una contraseña válida";
    }

    if (isInvalid) {
      setErrors({ username, password });

      return;
    }

    submitHandler({
      username,
      password,
    });
  };

  // Handles UI response after submitting API Request
  const submitHandler = async (data: LoginFormRequest) => {
    setIsSubmitting(true);
    try {
      const response = await LogIn(data);

      if (response.status === 200) {
        nav("/calendar");
      }
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        let errorMessage = "";

        switch ((error as unknown as { status: number }).status) {
          case 403:
            errorMessage =
              "Ha ingresado las credenciales incorrectas. Favor intente de nuevo";
            break;
          default:
            errorMessage = error.message;
            break;
        }
        toast.error(errorMessage);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col h-full items-center justify-center gap-4 py-8 md:py-10">
        <span className={title()}>Iniciar Sesión</span>
        <Card className="mt-10 w-[50%]">
          <CardBody className=" px-8 py-16 flex flex-col gap-10">
            <form onSubmit={handleLogin}>
              <Input
                ref={userRef}
                className="pb-8"
                errorMessage={errors.username}
                isInvalid={!!errors.username}
                label="Correo Electrónico"
                radius="full"
              />
              <Input
                ref={passwordRef}
                errorMessage={errors.password}
                isInvalid={!!errors.password}
                label="Contraseña"
                radius="full"
                type="password"
              />
            </form>
            {isSubmitting ? (
              <Spinner />
            ) : (
              <Button
                color="primary"
                radius="full"
                variant="shadow"
                onPress={handleLogin}
              >
                Iniciar Sesión
              </Button>
            )}
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}
