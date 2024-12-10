import { create } from "zustand";
import axios from "axios";

export interface Task {
  id?: string;
  title: string;
  description: string;
  statut: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskStore {
  tasks: Task[];
  selectedTask: Task | null;
  fetchTasks: () => Promise<void>;
  setTasks: (tasks: Task[]) => Promise<void>;
  setSelectedTask: (task: Task | null) => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (id: string, updatedData: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const baseUrl = "http://localhost:8080";
export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  selectedTask: null,
  fetchTasks: async () => {
    const response = await axios.get(baseUrl + "/task");
    set({ tasks: response.data });
  },
  setTasks: async (tasks: Task[]) => {
    set({
      tasks: tasks,
    });
  },
  setSelectedTask: async (task: Task | null) => {
    set({
      selectedTask: task,
    });
  },

  addTask: async (task) => {
    const response = await axios.post(baseUrl + "/task", task);
    set((state) => ({
      tasks: [...state.tasks, response.data],
    }));
    await get().fetchTasks();
  },

  updateTask: async (id, updatedData) => {
    const response = await axios.patch(baseUrl + `/task/${id}`, updatedData);
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...response.data } : task
      ),
    }));
    await get().fetchTasks();
  },

  deleteTask: async (id) => {
    await axios.delete(baseUrl + `/task/${id}`);
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
    await get().fetchTasks();
  },
}));
