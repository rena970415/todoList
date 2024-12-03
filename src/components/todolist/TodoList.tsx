import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../../services/api";
import "./TodoList.css";


type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  // API로부터 모든 할 일 가져오기
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    loadTasks();
  }, []);

  // 새 할 일 추가
  const handleAddTask = async () => {
    if (inputValue.trim() === "") return;
  
    try {
      const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1, // 가장 큰 ID + 1
        title: inputValue,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setInputValue("");
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  // 할 일 완료 상태 토글
  const handleToggleComplete = async (id: number) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (!taskToUpdate) return;
      const updatedTask = await updateTask(id, {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  // 할 일 삭제
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
  {tasks.map((task) => (
    <li key={task.id} className={task.completed ? "completed" : ""}>
      <span onClick={() => handleToggleComplete(task.id)}>{task.title}</span>
      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default TodoList;
