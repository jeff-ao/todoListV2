"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Mails, KeyRound, UserSquareIcon } from "lucide-react";
import { userLogin } from "@/service/userService";
import React, { useState } from "react";
import { notification, User } from "@/types";
import AlertModal from "@/components/AlertModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [openNotification, setOpenNotification] = useState(false);
  const [notificationConfig, setNotificationConfig] = useState<notification>({
    variant: "default",
    title: "",
    description: "",
  });
  const router = useRouter();

  const handleUserLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setNotificationConfig({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
      });
      setOpenNotification(true);
      setTimeout(() => {
        setOpenNotification(false);
      }, 3000);
      return;
    }

    try {
      console.log(email, password);
      const response = await userLogin(email, password);
      console.log(response);

      if (response.error) {
        setNotificationConfig({
          variant: "destructive",
          title: "Erro",
          description: "Falha no login. Verifique suas credenciais.",
        });
        setOpenNotification(true);
        return;
      }

      if (response && response.usuario) {
        localStorage.setItem("usuario", JSON.stringify(response.usuario));

        const usuario: User = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        setNotificationConfig({
          variant: "default",
          title: "Login realizado!",
          description: `Bem-vindo, ${usuario.name}!`,
        });
        setOpenNotification(true);

        // Esconde o alerta depois de 3 segundos
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      }
    } catch (error) {
      setNotificationConfig({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao fazer login. Por favor, tente novamente.",
      });
      setOpenNotification(true);
    }
  };

  return (
    <div style={{ flexDirection: "column" }}>
      <form
        onSubmit={handleUserLogin}
        style={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          marginTop: "20vh",
          height: "50vh",
        }}
      >
        <Card
          style={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
          }}
        >
          <CardHeader
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <CardTitle>Login</CardTitle>
            <CardDescription>Seja Bem-vindo(a)</CardDescription>
          </CardHeader>
          <CardContent
            style={{
              justifyContent: "-moz-initial",
            }}
          >
            <div
              style={{
                width: "100%",

                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <Mails size={30} />
              </div>
              <div style={{ marginLeft: "5%", width: "90%" }}>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
                  placeholder={"email"}
                  style={{ marginBottom: "5vh", width: "100%" }}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",

                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <KeyRound size={30} />
              </div>
              <div style={{ marginLeft: "5%", width: "90%" }}>
                <Input
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value.replace(/\s/g, ""))
                  }
                  type="password"
                  placeholder={"senha"}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              type="submit"
              variant="outline"
              style={{ position: "relative", width: "100px" }}
            >
              Enviar
            </Button>
            <Button
              type={"button"}
              onClick={() => {
                setTimeout(() => {
                  router.push("/register"), 2000;
                });
              }}
              variant={"link"}
            >
              não tem conta ainda? faça agora
            </Button>
          </CardFooter>
        </Card>
        <footer></footer>
      </form>
      <div
        style={{
          width: "400px",
          display: "flex",
        }}
      >
        {openNotification && <AlertModal notification={notificationConfig} />}
      </div>
    </div>
  );
}
