"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

import AddTask from "@/components/AddTask";
import {
  timelineTasks,
  createTask,
  editTask,
  editCompleted,
  deleteTask,
} from "@/service/taskService";
import TaskList from "@/components/TaskList";
import AlertModal from "@/components/AlertModal";
import { Task, User } from "@/types";
import { toast } from "sonner";

export default function Home() {
  const [tasksArr, setTasksArr] = useState<Task[]>([]);
  const usuario: User = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [userId, setUserId] = useState<number>(usuario.id ? usuario.id : 0);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const tasks: Task[] = await timelineTasks(userId, "desc");
      if (!Array.isArray(tasks)) {
        return toast.error("erro ao trazer posts");
      }
      setTasksArr(tasks);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleCreateTask = async (
    user_id: number,
    task: string,
    category: string
  ) => {
    try {
      if (!task.trim()) return alert("o conteudo nao pode ser vazio");
      await createTask(task, category, user_id);
      toast.success("Tarefa criada com sucesso!");
      task = "";
      category = "";
      setTasksArr([]);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleEditTask = async (id: number, task: string, category: string) => {
    try {
      if (!task.trim()) return alert("o conteudo nao pode ser vazio");
      await editTask(id, task, category);
      toast.success("Tarefa editada com sucesso!");
      setTasksArr([]);
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  const handleEditCompletedTask = async (id: number) => {
    try {
      await editCompleted(id);

      setTasksArr([]);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      toast.success("Tarefa deletada com sucesso!");
      setTasksArr([]);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    if (userId === 0) {
      router.push("/");
    }
    fetchTasks();
  }, [tasksArr]);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",

        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          marginTop: "20vh",
          height: "60vh",
          width: "40%",
          minWidth: "300px",
          flexDirection: "column",
        }}
      >
        <AddTask onCreateTask={handleCreateTask} />
        <TaskList
          tasks={tasksArr}
          onEditTask={handleEditTask}
          onEditCompletedTask={handleEditCompletedTask}
          onDeletetTask={handleDeleteTask}
        />
      </Card>
    </div>
  );
}
