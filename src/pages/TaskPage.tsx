import React, { useState, useEffect } from 'react';  
import TaskForm from '../components/TaskForm';  
import TaskTable from '../components/TaskTable';  
import { createTask, getTasks, Task, TaskData, updateTask } from '../api/taskApi';  

const TaskPage: React.FC = () => {  
  const [tasks, setTasks] = useState<Task[]>([]);  

  useEffect(() => {  
    const fetchTasks = async () => {  
      try {  
        const tasks = await getTasks();  
        console.log('Tasks received:', tasks);  
        setTasks(tasks);  
      } catch (error) {  
        console.error('Error fetching tasks:', error);  
      }  
    };  
    fetchTasks();  
  }, []);  

  const handleSubmit = async (taskData: TaskData) => {  
    try {  
      const newTask = await createTask(taskData);  
      setTasks([...tasks, newTask]);  
      console.log('Task berhasil ditambahkan');  
    } catch (error) {  
      console.error('Error saving task:', error);  
      alert('Gagal menambahkan task');  
    }  
  };  

  const handleDelete = (id: number) => {  
    setTasks(tasks.filter((task) => task.id !== id));  
  };  

  const handleUpdate = async (id: number, taskData: TaskData) => {  
    try {  
      const updatedTask = await updateTask(id, taskData);  
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));  
    } catch (error) {  
      console.error('Error updating task:', error);  
      alert('Gagal memperbarui task');  
    }  
  };  

  return (  
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">  
      <h1 className="text-3xl font-extrabold text-gray-900">Todo List</h1>  
      <div className="mt-8 w-full md:w-3/4 lg:w-full">  
        <TaskForm onSubmit={handleSubmit} />  
      </div>  
      <div className="mt-8 w-full md:w-3/4 lg:w-full">  
        <TaskTable tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate} setTasks={setTasks} />  
      </div>  
    </div>  
  );  
};  

export default TaskPage;