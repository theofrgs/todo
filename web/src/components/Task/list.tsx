"use client";
import { Task, useTaskStore } from "@/stores/useTaskStore";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { TaskEditDialog } from "./form";
import { useState } from "react";
import { useEffect } from "react";

export function TaskList() {
  const { deleteTask, setSelectedTask, fetchTasks, tasks } = useTaskStore(
    (state) => state
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const refetch = () => {
      fetchTasks();
    };
    refetch();
  }, [fetchTasks]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task: Task) => (
        <Card
          key={task.id}
          className="shadow-md"
          onClick={async () => {
            await setSelectedTask(task);
            setIsOpen(true);
          }}
        >
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mt-2">
              Description: {task.description}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Status: {task.statut}
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteTask(task.id!);
                }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card
        className="shadow-md cursor-pointer"
        onClick={async () => {
          await setSelectedTask(null);
          setIsOpen(true);
        }}
      >
        <CardHeader>
          <CardTitle>Add new task</CardTitle>
        </CardHeader>
      </Card>
      <TaskEditDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
