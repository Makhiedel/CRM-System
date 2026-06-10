import { useState } from "react";
import { changeTask, deleteTask } from "../../api/api.js";
import type { TaskData, Todo } from "../../types/Todos.js";
import { Button, Input, Form, Checkbox } from "antd";
import styles from "./Task.module.css";

interface Props {
  task: Todo;
  fetchData: () => Promise<void>;
}

export default function Task({ task, fetchData }: Props) {
  const [isEditing, setEditing] = useState<boolean>(false); //editing mode for conditional output
  const [isComplete, setIsDone] = useState<boolean>(task.isDone); //taks status handler
  const [savedTitle, setSavedTitle] = useState<string>(task.title); 
  const [form] = Form.useForm(); //form state;
  const [buttonNames, setButtonNames] = useState<
    ["Edit" | "Save", "Delete" | "Cancel"]
  >(["Edit", "Delete"]); //button names

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
      form.resetFields();
      setEditing(false);
      setButtonNames(["Edit", "Delete"]);
    }
  }

  async function submit(value: { title: string }): Promise<void> {
    if (!isEditing) {
      const taskData: TaskData = { title: value.title, id: task.id };

      try {
        await changeTask(taskData);
        console.log(`Task changed to ${value.title}`);
      } catch (error) {
        alert(`Failed to change title, ${error}`);
      }
      setSavedTitle(value.title);
      setEditing(false);
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
          initialValue={task.title}
          name="title"
          className={styles.taskholderrow}
          rules={[
            { required: true, message: "Please enter the title!" },
            { min: 2, message: "Minimum 2 characters" },
            { max: 64, message: "Maximum 64 characters" },
          ]}
        >
          {!isEditing ? (
            <p className={styles.selected}>{savedTitle}</p>
          ) : (
            <Input
              className={styles.selected}
              type="text"
              disabled={!isEditing}
            />
          )}
        </Form.Item>
        <div className={styles.buttons}>
          <Button onClick={() => editSaveButton()} htmlType="submit">
            {buttonNames[0]}
          </Button>
          <Button onClick={() => deleteCancelButton()}>{buttonNames[1]}</Button>
        </div>
      </Form>
    </li>
  );
}