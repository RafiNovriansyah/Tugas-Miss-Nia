import React, { useState, useEffect } from 'react';  
import { Table, Button, Modal, Input, DatePicker, Space, Typography, Select, Pagination } from 'antd';  
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';  
import { Task, TaskData, deleteTask, updateTask, getTasks } from '../api/taskApi';  
import dayjs, { Dayjs } from 'dayjs';  
import 'dayjs/locale/id';  

const { Title, Paragraph } = Typography;  
const { Option } = Select;  

interface TaskTableProps {  
  tasks: Task[];  
  onDelete: (id: number) => void;  
  onUpdate: (id: number, taskData: TaskData) => Promise<void>;  
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;  
}  

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onDelete, onUpdate, setTasks }) => {  
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);  
  const [editingTask, setEditingTask] = useState<Task | null>(null);  
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);  
  const [filterStatus, setFilterStatus] = useState<string>('all');  

  // State for pagination  
  const [currentPage, setCurrentPage] = useState(1);  
  const pageSize = 10; // Number of items per page  

  useEffect(() => {  
    const fetchTasks = async () => {  
      try {  
        const tasks = await getTasks();  
        setTasks(tasks);  
        setFilteredTasks(tasks);  
      } catch (error) {  
        console.error('Error fetching tasks:', error);  
      }  
    };  
    fetchTasks();  
  }, [setTasks]);  

  useEffect(() => {  
    if (filterStatus === 'all') {  
      setFilteredTasks(tasks);  
    } else {  
      setFilteredTasks(tasks.filter((task) => task.status === filterStatus));  
    }  
  }, [tasks, filterStatus]);  

  const handleDelete = async (id: number) => {  
    try {  
      await deleteTask(id);  
      onDelete(id);  
    } catch (error) {  
      console.error('Error deleting task:', error);  
    }  
  };  

  const handleUpdate = async (id: number, taskData: TaskData) => {  
    try {  
      await updateTask(id, taskData);  
      onUpdate(id, taskData);  
      setIsEditModalVisible(false);  
      setEditingTask(null);  
    } catch (error) {  
      console.error('Error updating task:', error);  
      alert('Gagal memperbarui task');  
    }  
  };  

  const handleComplete = async (id: number, _status: string) => {  
    try {  
      const task = tasks.find((t) => t.id === id);  
      if (task && task.status !== 'Selesai') {  
        await updateTask(id, { ...task, status: 'Selesai' });  
        setTasks(tasks.map((t) => (t.id === id ? { ...t, status: 'Selesai' } : t)));  
        setFilteredTasks(filteredTasks.map((t) => (t.id === id ? { ...t, status: 'Selesai' } : t)));  
      }  
    } catch (error) {  
      console.error('Error completing task:', error);  
    }  
  };  

  const handleEdit = (task: Task) => {  
    setEditingTask({  
      ...task,  
      dimulai: task.dimulai ? dayjs(task.dimulai) : null,  
      selesai: task.selesai ? dayjs(task.selesai) : null,  
    });  
    setIsEditModalVisible(true);  
  };  

  const handleTaskChange = (field: keyof Task, value: string | Dayjs | null) => {  
    if (editingTask) {  
      setEditingTask({  
        ...editingTask,  
        [field]: typeof value === 'string' ? value : value ? dayjs(value).locale('id').toISOString() : null,  
      });  
    }  
  };  

  const handleFilterChange = (value: string) => {  
    setFilterStatus(value);  
  };  

  // Function to handle page change  
  const handlePageChange = (page: number) => {  
    setCurrentPage(page);  
  };  

  // Get current tasks for the page  
  const currentTasks = filteredTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);  

  const columns = [  
    {  
      title: 'Task',  
      dataIndex: 'task',  
      key: 'task',  
      render: (text: string) => <Paragraph ellipsis={{ rows: 2, expandable: true }}>{text}</Paragraph>,  
    },  
    {  
      title: 'Start Date',  
      dataIndex: 'dimulai',  
      key: 'dimulai',  
      render: (date: string | number | Date | dayjs.Dayjs | null | undefined) =>  
        date ? dayjs(date).locale('id').format('DD MMMM YYYY') : '',  
    },  
    {  
      title: 'End Date',  
      dataIndex: 'selesai',  
      key: 'selesai',  
      render: (date: string | number | Date | dayjs.Dayjs | null | undefined) =>  
        date ? dayjs(date).locale('id').format('DD MMMM YYYY') : '',  
    },  
    { title: 'Status', dataIndex: 'status', key: 'status' },  
    {  
      title: 'Action',  
      key: 'action',  
      render: (record: Task) => (  
        <Space size="middle" className="flex justify-center items-center">  
          {record.status !== 'Selesai' && (  
            <>  
              <Button  
                type="primary"  
                icon={<EditOutlined />}  
                onClick={() => handleEdit(record)}  
                shape="circle"  
              />  
              <Button  
                type="primary"  
                icon={<CheckOutlined />}  
                onClick={() => handleComplete(record.id, record.status)}  
                shape="circle"  
              />  
            </>  
          )}  
          <Button  
            type="primary"  
            danger  
            icon={<DeleteOutlined />}  
            onClick={() => handleDelete(record.id)}  
            shape="circle"  
          />  
        </Space>  
      ),  
    },  
  ];  

  return (  
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">  
      <div className="flex justify-between items-center mb-8">  
        <Title level={2}>Todo List</Title>  
        <Select  
          value={filterStatus}  
          onChange={handleFilterChange}  
          style={{ width: 200 }}  
        >  
          <Option value="all">All</Option>  
          <Option value="Pending">Pending</Option>  
          <Option value="Selesai">Selesai</Option>  
        </Select>  
      </div>  
      <div className="overflow-x-auto">  
        <Table columns={columns} dataSource={currentTasks} rowKey="id" pagination={false} />  
      </div>  
      {/* Pagination Component in the Flex Container */}  
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>  
        <Pagination  
          current={currentPage}  
          pageSize={pageSize}  
          total={filteredTasks.length}  
          onChange={handlePageChange}  
          showSizeChanger={false}  
        />  
      </div>  
      <Modal  
        visible={isEditModalVisible}  
        onCancel={() => setIsEditModalVisible(false)}  
        onOk={() => editingTask ? handleUpdate(editingTask.id, editingTask) : null}  
        title="Edit Task"  
      >  
        {editingTask && (  
          <div className="space-y-4">  
            <Input  
              value={editingTask.task}  
              onChange={(e) => handleTaskChange('task', e.target.value)}  
              placeholder="Task"  
            />  
            <DatePicker  
              value={editingTask.dimulai ? dayjs(editingTask.dimulai) : null}  
              onChange={(date) => handleTaskChange('dimulai', date)}  
              placeholder="Dimulai"  
            />  
            <DatePicker  
              value={editingTask.selesai ? dayjs(editingTask.selesai) : null}  
              onChange={(date) => handleTaskChange('selesai', date)}  
              placeholder="Selesai"  
            />  
          </div>  
        )}  
      </Modal>  
    </div>  
  );  
};  

export default TaskTable;