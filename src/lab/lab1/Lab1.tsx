import { Button, Card, Form, Input, Modal, Select, Table, Typography } from "antd";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const initialUsers: User[] = [
  { id: 1, name: "Nguyễn Văn An", email: "an@example.com", role: "Admin" },
  { id: 2, name: "Trần Thị Bình", email: "binh@example.com", role: "Member" },
  { id: 3, name: "Phạm Đức Cường", email: "cuong@example.com", role: "Viewer" },
];

const sidebarItems = ["Overview", "Users", "Reports", "Settings"];

function Lab1() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<User>();

  const handleSubmit = (values: User) => {
    const newUser: User = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      role: values.role,
    };

    setUsers((prev) => [...prev, newUser]);
    form.resetFields();
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-200 bg-blue-600 px-6 py-4 text-white">
          <div>
            <Typography.Title level={4} style={{ color: "white", margin: 0 }}>
              Dashboard Lab 1
            </Typography.Title>
            <p className="text-sm text-blue-100">Bài tập React + Ant Design</p>
          </div>
          <Button type="primary" ghost onClick={() => setIsModalOpen(true)}>
            Add User
          </Button>
        </header>

        <div className="flex flex-col lg:flex-row">
          <aside className="w-full border-b border-slate-200 bg-slate-50 p-4 lg:w-64 lg:border-b-0 lg:border-r">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Sidebar
            </h3>
            <div className="space-y-2">
              {sidebarItems.map((item, index) => (
                <div
                  key={item}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium ${
                    index === 1 ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <main className="flex-1 space-y-6 p-4 md:p-6">
            <section className="grid gap-4 md:grid-cols-3">
              <Card className="shadow-sm">
                <p className="text-sm text-slate-500">Total Users</p>
                <p className="mt-2 text-2xl font-semibold">{users.length}</p>
              </Card>
              <Card className="shadow-sm">
                <p className="text-sm text-slate-500">Active Roles</p>
                <p className="mt-2 text-2xl font-semibold">3</p>
              </Card>
              <Card className="shadow-sm">
                <p className="text-sm text-slate-500">Status</p>
                <p className="mt-2 text-2xl font-semibold">Online</p>
              </Card>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Card title="Bài 2: Form đăng ký" className="shadow-sm">
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                  >
                    <Input placeholder="Nhập tên" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email" },
                      { type: "email", message: "Email không hợp lệ" },
                    ]}
                  >
                    <Input placeholder="Nhập email" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                  >
                    <Input.Password placeholder="Nhập mật khẩu" />
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form>
              </Card>

              <Card title="Bài 3: Bảng danh sách user" className="shadow-sm">
                <Table dataSource={users} columns={columns} rowKey="id" pagination={false} />
              </Card>
            </section>
          </main>
        </div>
      </div>

      <Modal
        title="Add User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item label="Role" name="role" initialValue="Member">
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Member">Member</Select.Option>
              <Select.Option value="Viewer">Viewer</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Lab1;
