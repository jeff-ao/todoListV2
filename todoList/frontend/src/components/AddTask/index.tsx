"use client";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { onClickProp, User } from "@/types";
import { useState } from "react";
import { Plus, NotebookPen } from "lucide-react";

export default function AddTask({ onClick }: onClickProp) {
  const usuario: User = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [id, setId] = useState(usuario.id ? usuario.id : 0);
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  return (
    <CardHeader className="flex flex-col items-center">
      <CardTitle className="flex">
        <NotebookPen size={28} strokeWidth={3} style={{ marginRight: "1vh" }} />
        Todo List
      </CardTitle>
      <CardDescription className="" style={{ marginBottom: "2vh" }}>
        Crie sua e administre suas tarefas!
      </CardDescription>
      <div className="flex flex-wrap w-full gap-2 mt-2">
        <Input
          required
          className="flex-1 min-w-0"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Adicione uma tarefa"
        />
        <Input
          required
          className="flex-1 min-w-0 "
          style={{
            maxWidth: "20vh",
          }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoria"
        />
        <Button
          variant="outline"
          size="icon"
          className="px-4"
          onClick={() => {
            setTask((prev) => prev.trim());
            setCategory(
              (prev) =>
                prev.trim()[0].toLocaleUpperCase() + prev.trim().slice(1)
            );
            onClick(id, task, category);
            setTask("");
            setCategory("");
          }}
        >
          <Plus size={28} strokeWidth={3} />
        </Button>
      </div>
    </CardHeader>
  );
}
