import { useState } from "react";
import { changeTask, deleteTask } from "../../api/api.js";
import { validate } from "../../utils/validate.js";
import type { TaskData, Todo } from "../../types/Todos.js";
import { Button, Input, Form, Checkbox } from "antd";
import styles from "./Task.module.css";

interface Props {
  task: Todo;
  fetchData: () => Promise<void>;
}

export default function Task({ task, fetchData }: Props) {
  // const [validation, setValidation] = useState<Validator>({ isValid: true }); //validation control
  const [isEditing, setEditing] = useState<boolean>(false); //editing mode for conditional output
  const [newTitle, setNewTitle] = useState<string>(task.title); //title change handler
  const [oldTitle, setOldTitle] = useState<string>(task.title); //old title saver
  const [isComplete, setIsDone] = useState<boolean>(task.isDone); //taks status handler
  const [submitAction, setSubmitAction] = useState<"delete" | "change">(
    "delete",
  );
  const [form] = Form.useForm(); //form state;
  const [buttonNames, setButtonNames] = useState<
    ["Edit" | "Save", "Delete" | "Cancel"]
  >(["Edit", "Delete"]); //button names

  function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewTitle(event.target.value);
    // setValidation({ isValid: true }); //to hide error message
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
      setButtonNames(["Save", "Cancel"]);
    } else if (isEditing) {
      setEditing(false);
      setButtonNames(["Edit", "Delete"]);

      // const taskData: TaskData = { title: newTitle, id: task.id };

      // try {
      //   await changeTask(taskData);
      //   console.log(`Task changed to ${newTitle}`);
      // } catch (error) {
      //   alert(`Failed to change title, ${error}`);
      // }
      // setEditing(false);
      // setOldTitle(newTitle); //if cancel
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

      setEditing(false);
      console.log(task);
      setButtonNames(["Edit", "Delete"]);
    }
  }

  async function submit(value: { title: string }) {
    if (!isEditing) {
      const taskData: TaskData = { title: value.title, id: task.id };

      try {
        await changeTask(taskData);
        console.log(`Task changed to ${newTitle}`);
      } catch (error) {
        alert(`Failed to change title, ${error}`);
      }
      setEditing(false);
      setOldTitle(newTitle); //if cancel
    }
  }

  return (
    <li key={task.id} className={styles.taskholder}>
      <Form className={styles.taskholderrow} form={form} onFinish={submit}>
        <Form.Item className={styles.taskholderrow}>
          <Checkbox
            className={styles.checkbox}
            type="checkbox"
            defaultChecked={isComplete}
            onChange={handleStatusChange}
          />
        </Form.Item>
        <Form.Item
          initialValue={newTitle}
          name="title"
          className={styles.taskholderrow}
          rules={[
            { required: true, message: "Please enter the title!" },
            { min: 3, message: "Minimum 3 characters" },
            { max: 64, message: "Maximum 64 characters" },
          ]}
        >
          <Input
            className={styles.selected}
            type="text"
            disabled={!isEditing}
            // value={newTitle}
            onChange={handleInput}
          />
        </Form.Item>
        <Button onClick={() => editSaveButton()} htmlType="submit">
          {buttonNames[0]}
        </Button>
        <Button onClick={() => deleteCancelButton()}>{buttonNames[1]}</Button>
      </Form>
    </li>
  );
}
