"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";
import {
  onEditTaskProp,
  onDeletetTaskProp,
  onEditCompletedTaskProp,
  TasksProp,
} from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Pen, Trash, Circle, Check } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function TaskList({
  tasks,
  onEditTask,
  onEditCompletedTask,
  onDeletetTask,
}: TasksProp & onEditTaskProp & onEditCompletedTaskProp & onDeletetTaskProp) {
  const [taskModal, setTaskModal] = useState({
    id: 0,
    task: "",
    category: "",
    completed: false,
  });

  return (
    <CardContent className="flexh-80 overflow-y-auto ">
      <div
        className="flex mb-3"
        style={{
          width: "100%",
          borderBottom: "0.1px solid rgb(44, 44, 44)",
          borderRadius: "5px",
        }}
      >
        <div className="flex " style={{ width: "100%" }}>
          <div style={{ display: "flex", width: "80%" }}>
            <Label style={{ marginLeft: "1vh" }}>Tarefa</Label>
          </div>
          <div
            className="flex "
            style={{ width: "25%", justifyContent: "center" }}
          >
            <Label>Categoria</Label>
          </div>
        </div>

        <div className="flex " style={{ width: "50%" }}>
          <Label style={{ marginLeft: "3vh" }}>Feito</Label>
        </div>
      </div>
      {tasks.map((task) => (
        <Card
          className="flex p-1 h-10 mb-3"
          style={{ marginLeft: "1vh" }}
          key={task.id}
        >
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ display: "flex", width: "80%", marginLeft: "1vh" }}>
              {task.completed ? <del>{task.task}</del> : <p>{task.task}</p>}
            </div>
            <div
              className="flex "
              style={{ width: "25%", justifyContent: "center" }}
            >
              {task.category}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              position: "relative",
            }}
          >
            <Button
              variant={"ghost"}
              onClick={() => {
                onEditCompletedTask(task.id);
                if (!task.completed) {
                  toast.success("Tarefa concluida!");
                }
              }}
            >
              {task.completed ? <Check /> : <Circle />}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setTaskModal(task);
                  }}
                >
                  <Pen />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Edite sua tarefa:</AlertDialogTitle>
                  <AlertDialogDescription className="flex">
                    <Input
                      placeholder="Tarefa"
                      value={taskModal.task || ""}
                      onChange={(e) =>
                        setTaskModal({ ...taskModal, task: e.target.value })
                      }
                      style={{
                        width: "90%",
                        marginRight: "1vh",
                      }}
                    />
                    <Input
                      placeholder="Categoria"
                      value={taskModal.category || ""}
                      onChange={(e) =>
                        setTaskModal({ ...taskModal, category: e.target.value })
                      }
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      onEditTask(task.id, taskModal.task, taskModal.category);
                    }}
                  >
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              variant={"ghost"}
              onClick={() => {
                onDeletetTask(task.id);
              }}
            >
              <Trash />
            </Button>
          </div>
        </Card>
      ))}
    </CardContent>
  );
}
