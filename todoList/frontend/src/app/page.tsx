"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
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
import { User } from "@/types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleUserLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.info("envie todos campos");
      return;
    }

    try {
      const response = await userLogin(email, password);

      if (response.error || !response || response.status) {
        toast.error("erro ao fazer login");
        return;
      }

      if (response && response.usuario) {
        localStorage.setItem("usuario", JSON.stringify(response.usuario));

        const usuario: User = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        toast.success(`Login realizado com sucesso! 
          Bem vindo ${usuario.name}`);

        // Esconde o alerta depois de 3 segundos
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      }
    } catch (error) {
      toast.error("erro interno, por favor tente outra hora");
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
      ></div>
    </div>
  );
}
