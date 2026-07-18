import { Alert, Button, Card, Checkbox, Form, Input, Select, Typography } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Category {
  id: number;
  title: string;
  description?: string;
  active: boolean;
}

interface Story {
  title: string;
  description?: string;
  categoryId?: number | null;
}

interface CategoryFormValues {
  title: string;
  description?: string;
  active: boolean;
}

function Lab5() {
  const [categoryForm] = Form.useForm<CategoryFormValues>();
  const [storyForm] = Form.useForm<Story>();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get<Category[]>("http://localhost:3000/categories");
      return res.data;
    },
  });

  const categoryMutation = useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      const res = await axios.post<Category>("http://localhost:3000/categories", values);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      categoryForm.resetFields();
    },
  });

  const storyMutation = useMutation({
    mutationFn: async (values: Story) => {
      const res = await axios.post("http://localhost:3000/stories", {
        ...values,
        createdAt: new Date().toISOString(),
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["stories"] });
      storyForm.resetFields();
    },
  });

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  return (
    <div className="space-y-6 text-left">
      <Card title="Bài 1-3: Tạo danh mục mới" className="shadow-sm">
        <Form layout="vertical" form={categoryForm} onFinish={categoryMutation.mutate}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input placeholder="Nhập tiêu đề danh mục" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Nhập mô tả" />
          </Form.Item>

          <Form.Item name="active" valuePropName="checked" initialValue={true}>
            <Checkbox>Active</Checkbox>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={categoryMutation.isPending}>
            Submit
          </Button>

          {categoryMutation.isSuccess && (
            <Alert
              type="success"
              message="Tạo danh mục thành công"
              showIcon
              className="mt-4"
            />
          )}

          {categoryMutation.isError && (
            <Alert
              type="error"
              message="Tạo danh mục thất bại"
              showIcon
              className="mt-4"
            />
          )}
        </Form>
      </Card>

      <Card title="Bài 4: Thêm truyện mới" className="shadow-sm">
        <Typography.Paragraph type="secondary">
          Chọn một danh mục trước khi tạo truyện mới.
        </Typography.Paragraph>

        <Form layout="vertical" form={storyForm} onFinish={storyMutation.mutate}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề truyện" }]}
          >
            <Input placeholder="Nhập tên truyện" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Nhập mô tả truyện" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select
              placeholder="Chọn danh mục"
              loading={isCategoriesLoading}
              options={categoryOptions}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={storyMutation.isPending}>
            Submit
          </Button>

          {storyMutation.isSuccess && (
            <Alert type="success" message="Tạo truyện thành công" showIcon className="mt-4" />
          )}
        </Form>
      </Card>
    </div>
  );
}

export default Lab5;
