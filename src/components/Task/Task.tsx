import { useState } from "react";
import { changeTask, deleteTask } from "../../api/api.js";
import { validate } from "../../utils/validate.js";
import type { TaskData, Todo, Validator } from "../../types/Todos.js";
import { Button, Input, Form, Checkbox } from "antd";
import styles from "./Task.module.css";

interface Props {
  task: Todo;
  fetchData: () => Promise<void>;
}

export default function Task({ task, fetchData }: Props) {
  const [validation, setValidation] = useState<Validator>({ isValid: true }); //validation control
  const [isEditing, setEditing] = useState<boolean>(false); //editing mode for conditional output
  const [newTitle, setNewTitle] = useState<string>(task.title); //title change handler
  const [oldTitle, setOldTitle] = useState<string>(task.title); //old title saver
  const [isComplete, setIsDone] = useState<boolean>(task.isDone); //taks status handler
  const [form] = Form.useForm(); //form state;
  const [button1, setButton1] = useState<"Edit" | "Save">("Edit");
  const [button2, setButton2] = useState<"Delete" | "Cancel">("Delete");

  function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewTitle(event.target.value);
    setValidation({ isValid: true }); //to hide error message
  }

  async function handleStatusChange(): Promise<void> {
    setIsDone((value) => !value);
    const taskData: TaskData = { isDone: !task.isDone, id: task.id };
    try {
      await changeTask(taskData);
      fetchData();
    } catch (error) {
      alert(`Failed to change status, ${error}`);
    }
  }

  async function editSaveButton(): Promise<void> {
    if (!isEditing) {
      setEditing(true);
      setButton1("Save");
      setButton2("Cancel");
    } else if (isEditing) {
      setButton1("Edit");
      setButton2("Delete");
      const taskData: TaskData = { title: newTitle, id: task.id };

      if (validate(newTitle).isValid) {
        try {
          await changeTask(taskData);
          console.log(`Task changed to ${newTitle}`);
        } catch (error) {
          alert(`Failed to change title, ${error}`);
        }
        setEditing(false);
        setOldTitle(newTitle); //if cancel
      } else {
        setValidation(validate(newTitle)); //showing error
      }
    }
  }

  async function deleteCancelButton(): Promise<void> {
    if (!isEditing) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        alert(`Failed to delete task, ${error}`);
      }
      fetchData();
      console.log(`Task "${task.title}" deleted`);
    } else if (isEditing) {
      setNewTitle(oldTitle);
      setValidation({ isValid: true }); //to hide error message
      setEditing(false);
      console.log(task);
      setButton1("Edit");
      setButton2("Delete");
    }
  }

  return (
    <li key={task.id} className={styles.taskholder}>
      <Form
        className={styles.taskholderrow}
        form={form}
        onFinish={undefined}
      >
        <Form.Item className={styles.taskholderrow}>
          <Checkbox
            name="status"
            className={styles.checkbox}
            type="checkbox"
            defaultChecked={isComplete}
            onChange={handleStatusChange}
          />
          <Input
            name="title"
            className={styles.selected}
            type="text"
            disabled={!isEditing}
            value={newTitle}
            onChange={handleInput}
          />
          <Button onClick={() => editSaveButton()}>{button1}</Button>
          <Button onClick={() => deleteCancelButton()}>{button2}</Button>
        </Form.Item>
      </Form>
      {!validation.isValid && (
        <p className={styles.errortext}>{validation.errorMessage}</p>
      )}
    </li>
  );
}
