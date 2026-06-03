import { useState } from "react";
import { createTask } from "../../api/api.js";
import axios from "axios";
import { validate } from "../../utils/validate.js";
// import Button from "../UI/Buttons/Button.js";
import { Button, Input, Form } from "antd";
import type { TaskData, Validator } from "../../types/Todos.js";

import styles from "./AddTask.module.css";

interface Props {
  handleUpdate: () => Promise<void>;
}

export default function AddTask({ handleUpdate }: Props) {
  const [form] = Form.useForm();
  const [taskName, setTaskName] = useState<string>("");
  const [validation, setValidation] = useState<Validator>({ isValid: true });

  function handleTaskName(event: React.ChangeEvent<HTMLInputElement>): void {
    setTaskName(event.target.value);
    // setValidation({ isValid: true });
  }

  async function setSubmit(value): Promise<void> {
    const taskData: TaskData = { isDone: false, title: value };
    console.log(value);
    try {
      const response = await createTask(taskData);
      console.log(`"${value}" task created`, response);
   
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("HTTP error", error.response?.status, error.message);
      } else {
        console.log(`Failed to create task! ${error}`);
      }
    }
    handleUpdate();
    form.resetFields();
    // if (validate(taskName).isValid) {
    // } else {
    //   setValidation(validate(taskName));

    //   setTaskName("");
    // }
  }

  return (
    <div className={styles.taskcreator}>
      <Form
        form={form}
        name="addTask"
        className={styles.taskcreatorrow}
        onFinish={setSubmit}
      >
        <Form.Item
          rules={[
            { required: true, message: "Please enter the title!" },
            { min: 3, message: "Minimum 3 characters" },
            { max: 64, message: "Maximum 64 characters" },
          ]}
        >
          <Input placeholder="Task to be done..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>

      {!validation.isValid && (
        <p className={styles.errortext}>{validation.errorMessage}</p>
      )}
    </div>
  );
}
