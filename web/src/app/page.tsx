import { TaskList } from "@/components/Task/list";
import { Task } from "@/stores/useTaskStore";

async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch("http://localhost:8080/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

export default async function TasksPage() {
  // TODO add caching logic => tanstack query
  // const tasks = await fetchTasks();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <TaskList />
    </div>
  );
}
