import React, { useState } from 'react';  
import { Input, DatePicker, Button } from 'antd';  
import { TaskData } from '../api/taskApi';  

interface TaskFormProps {  
  onSubmit: (taskData: TaskData) => void;  
}  

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {  
  const [task, setTask] = useState<string>('');  
  const [dimulai, setDimulai] = useState<Date | null>(null);  
  const [selesai, setSelesai] = useState<Date | null>(null);  

  const handleSubmit = () => {  
    const formattedData = {  
      task,  
      dimulai: dimulai || null,  
      selesai: selesai || null,  
      status: 'Pending',  
    };  
    onSubmit(formattedData);  
    setTask('');  
    setDimulai(null);  
    setSelesai(null);  
  };

  return (  
    <div className="shadow-lg rounded-lg p-8 space-y-6">  
      <div>  
        <label htmlFor="task" className="block text-gray-700 font-medium">  
          Judul Task  
        </label>  
        <Input  
          id="task"  
          value={task}  
          onChange={(e) => setTask(e.target.value)}  
          placeholder="Masukkan judul task"  
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-400 focus:border-red-400 sm:text-sm"  
        />  
      </div>  

      <div className="grid grid-cols-2 gap-6">  
        <div>  
          <label htmlFor="dimulai" className="block text-gray-700 font-medium">  
            Tanggal Mulai  
          </label>  
          <DatePicker  
            id="dimulai"  
            value={dimulai}  
            onChange={(date) => setDimulai(date)}  
            placeholder="Pilih tanggal mulai"  
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-400 focus:border-red-400 sm:text-sm"  
          />  
        </div>  
        <div>  
          <label htmlFor="selesai" className="block text-gray-700 font-medium">  
            Target Selesai  
          </label>  
          <DatePicker  
            id="selesai"  
            value={selesai}  
            onChange={(date) => setSelesai(date)}  
            placeholder="Pilih tanggal selesai"  
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-400 focus:border-red-400 sm:text-sm"  
          />  
        </div>  
      </div>  

      <div className="flex justify-end">  
        <Button  
          type="default"  
          onClick={handleSubmit}  
          className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"  
        >  
          Simpan Task  
        </Button>  
      </div>  
    </div>  
  );  
};  

export default TaskForm;