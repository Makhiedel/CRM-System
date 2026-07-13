import { createTask } from "../../api/api.js";
import axios from "axios";
import { Button, Input, Form } from "antd";
import type { TaskData } from "../../types/Todos.js";
import { FileAddOutlined } from "@ant-design/icons";
import { rules } from "../../utils/validate.js";
import styles from "./AddTask.module.css";

interface Props {
  handleUpdate: () => Promise<void>;
}

export default function AddTask({ handleUpdate }: Props) {
  const [form] = Form.useForm();

  async function setSubmit(value: { title: string }): Promise<void> {
    const taskData: TaskData = { isDone: false, title: value.title };
    try {
      const response = await createTask(taskData);
      // console.log(`"${value.title}" task created`, response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("HTTP error", error.response?.status, error.message);
      } else {
        console.log(`Failed to create task! ${error}`);
      }
    }
    handleUpdate();
    form.resetFields();
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
          name="title"
          rules={rules}
        >
          <Input className={styles.input} placeholder="Task to be done..." />
        </Form.Item>
        <Form.Item>
          <Button
            icon={<FileAddOutlined />}
            type="primary"
            size="large"
            htmlType="submit"
          />
        </Form.Item>
      </Form>
    </div>
  );
}
