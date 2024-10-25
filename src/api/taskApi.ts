import axios from 'axios';  

const taskApi = axios.create({  
  baseURL: 'http://localhost:3000/api/tasks',  
  withCredentials: true, 
}); 

export interface TaskData {  
  task: string;  
  dimulai: Date | null;  
  selesai: Date | null;  
  status: string;  
}  

export interface Task {  
  id: number;  
  task: string;  
  dimulai: Date | null;  
  selesai: Date | null;  
  status: string;  
}  

export const createTask = async (taskData: TaskData): Promise<Task> => {  
  try {  
    const response = await taskApi.post('/', taskData);  
    return response.data;  
  } catch (error) {  
    console.error('Error creating task:', error);  
    if (axios.isAxiosError(error)) {  
      console.error('Response:', error.response?.data);  
    }  
    throw error;  
  }  
};  

export async function updateTask(id: number, taskData: TaskData): Promise<Task> {  
  const response = await taskApi.patch(`/${id}`, taskData);  
  return response.data;  
}  

export const getTasks = async (): Promise<Task[]> => {  
  const response = await taskApi.get('/');  
  return response.data;  
};  

export const deleteTask = async (id: number): Promise<void> => {  
  await taskApi.delete(`/${id}`);  
};  