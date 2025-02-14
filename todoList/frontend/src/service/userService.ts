import axios from "axios";

const APILink: string = "http://localhost:3003/users"; //localhost:3003

export const userLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${APILink}/login`, {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    return error instanceof Error
      ? error.message
      : "Ocorreu um erro desconhecido";
  }
};

export const userRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${APILink}/`, {
      name: name,
      email: email,
      password: password,
    });
    if (!response) {
      return { error: "erro ao fazer login" };
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
    return errorMessage;
  }
};
