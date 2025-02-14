import axios from "axios";

const APILink: string = "http://localhost:3003/tasks";

export const createTask = async (
  task: string,
  category: string,
  user_id: number
) => {
  try {
    const response = await axios.post(`${APILink}/`, {
      task,
      category,
      user_id,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
    return errorMessage;
  }
};

export const timelineTasks = async (
  user_id: number,
  order_by: "asc" | "desc"
) => {
  try {
    const response = await axios.get(`${APILink}/timeline`, {
      params: { user_id, order_by },
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
    return { error: errorMessage };
  }
};

export const editTask = async (id: number, task: string, category: string) => {
  try {
    const response = await axios.put(`${APILink}/${id}`, {
      task,
      category,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
    return { error: errorMessage };
  }
};

export const editCompleted = async (id: number) => {
  try {
    const response = await axios.patch(`${APILink}/${id}/completed`);

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
    return { error: errorMessage };
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${APILink}/${id}`);

    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
    return { error: errorMessage };
  }
};
