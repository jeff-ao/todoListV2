"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { User } from "@/types";
import { Mails, KeyRound, UserSquareIcon } from "lucide-react";
import { userRegister } from "@/service/userService";
import React, { useState } from "react";

import validator from "validator";
import { toast } from "sonner";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleUserRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !password) {
      toast.info("preencha todos os campos");
      return;
    }

    if (!validator.isEmail(email)) {
      toast.error("email invalido");
      return;
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 3,
      })
    ) {
      toast.error("senha fraca");
      return;
    }

    try {
      const user: User = await userRegister(name, email, password);

      if (!user) {
        toast.error("erro ao cadastrar usuario");
        return;
      }

      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      toast.error("senha fraca");
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
      ></div>
    </div>
  );
}
