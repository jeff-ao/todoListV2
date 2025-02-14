import { Card, CardContent } from "../ui/card";
import { TasksProp } from "@/types";
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
import { Switch } from "../ui/switch";
import { Pen, Trash, Circle, Check } from "lucide-react";
import { Label } from "../ui/label";

export default function TaskList({ tasks }: TasksProp) {
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
            <Button variant={"ghost"}>
              {task.completed ? <Check /> : <Circle />}
            </Button>
            <Button variant={"ghost"}>
              <Pen />
            </Button>
            <Button variant={"ghost"}>
              <Trash />
            </Button>
          </div>
        </Card>
      ))}
    </CardContent>
  );
}
