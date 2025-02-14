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
import { userRegister } from "@/service/userService";
import React, { useState } from "react";
import { notification, User } from "@/types";
import AlertModal from "@/components/AlertModal";
import validator from "validator";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationConfig, setNotificationConfig] = useState<notification>({
    variant: "default",
    title: "",
    description: "",
  });
  const router = useRouter();

  const handleUserRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !password) {
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

    if (!validator.isEmail(email)) {
      setNotificationConfig({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, insira um email válido.",
      });
      setOpenNotification(true);
      setTimeout(() => {
        setOpenNotification(false);
      }, 3000);
      return;
    }

    if (!validator.isLength(password, { min: 6 })) {
      setNotificationConfig({
        variant: "destructive",
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
      });
      setOpenNotification(true);
      setTimeout(() => {
        setOpenNotification(false);
      }, 3000);
      return;
    }

    try {
      const user: User = await userRegister(name, email, password);

      if (!user) {
        return setNotificationConfig({
          variant: "destructive",
          title: "erro ao cadastrar",
          description: "",
        });
      }

      setNotificationConfig({
        variant: "default",
        title: "Sucesso",
        description: "Usuário registrado com sucesso.",
      });
      setOpenNotification(true);
      setTimeout(() => {
        setOpenNotification(false);
        router.push("/");
      }, 3000);
    } catch (error) {
      setNotificationConfig({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao registrar o usuário.",
      });
      setOpenNotification(true);
      setTimeout(() => {
        setOpenNotification(false);
      }, 3000);
    }
  };
  return (
    <div style={{ flexDirection: "column" }}>
      <form
        onSubmit={handleUserRegister}
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
            <CardTitle>Cadastro</CardTitle>
            <CardDescription>Crie sua conta</CardDescription>
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
                marginBottom: "2vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <UserSquareIcon size={30} />
              </div>
              <div style={{ marginLeft: "5%", width: "90%" }}>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value.replace(/\s/g, ""))}
                  placeholder={"Nome"}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                marginBottom: "2vh",
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
                  placeholder={"Email"}
                  style={{ width: "100%" }}
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
                  placeholder={"Senha"}
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
                  router.push("/"), 2000;
                });
              }}
              variant={"link"}
            >
              Já tem conta? Faça login
            </Button>
          </CardFooter>
        </Card>
        <footer></footer>
      </form>
      <div
        style={{
          width: "400px",
          display: "flex",
          position: "revert",
        }}
      >
        {openNotification && <AlertModal notification={notificationConfig} />}
      </div>
    </div>
  );
}
