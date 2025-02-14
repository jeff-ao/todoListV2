"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
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

export default function Home() {
  const [tasksArr, setTasksArr] = useState<Task[]>([]);
  const usuario: User = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [userId, setUserId] = useState<number>(usuario.id ? usuario.id : 0);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const tasks: Task[] = await timelineTasks(userId, "desc");
      if (!Array.isArray(tasks)) {
        return console.log("erro ao trazer posts");
      }
      setTasksArr(tasks);
    } catch (error) {
      alert(error);
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
      task = "";
      category = "";
      setTasksArr([]);
    } catch (error) {
      alert(error);
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
        <AddTask onClick={handleCreateTask} />
        <TaskList tasks={tasksArr} />
      </Card>
    </div>
  );
}
