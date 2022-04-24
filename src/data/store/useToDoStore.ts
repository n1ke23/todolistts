import create from "zustand";
import { generateId } from "../helpers";

interface Task {
    id: string;
    title: string;
    createdAd: number;
}
interface ToDoSotre{
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoSotre>((set, get) => ({
    tasks: [],
    createTask: (title) => {
        const { tasks } = get()
        const newTask = {
            id: generateId(),
            title,
            createdAd: Date.now()
        }

        set({
            tasks: [newTask].concat(tasks)
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        });
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        });
    }
}))