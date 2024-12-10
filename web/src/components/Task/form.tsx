import { useTaskStore } from "@/stores/useTaskStore";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters long")
    .required("Title is required"),
  description: Yup.string()
    .required("Description is required"),
  statut: Yup.string().required("Status is required"),
});

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TaskEditDialog({ isOpen, setIsOpen }: Props) {
  const { updateTask, addTask, setSelectedTask, selectedTask } = useTaskStore();

  const initialValues = {
    title: selectedTask?.title || "",
    description: selectedTask?.description || "",
    statut: selectedTask?.statut || "",
  };

  const handleSubmit = async (values: typeof initialValues, actions: any) => {
    if (selectedTask) {
      updateTask(selectedTask.id!, values);
    } else addTask(values);
    setIsOpen(false);
    actions.resetForm();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedTask(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedTask ? "Edit" : "Create"} Task</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Field
                  name="title"
                  as={Input}
                  id="title"
                  placeholder="Enter task title"
                  className="mt-1"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Field
                  name="description"
                  as={Textarea}
                  id="description"
                  placeholder="Enter task description"
                  className="mt-1"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="statut">Status</Label>
                <Field
                  name="statut"
                  as={Input}
                  id="statut"
                  placeholder="Enter task status"
                  className="mt-1"
                />
                <ErrorMessage
                  name="statut"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {selectedTask ? "Update" : "Create"}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
