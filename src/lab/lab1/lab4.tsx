import { Table } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
function Lab4() {

  const queryClient =  useQueryClient();
  queryClient.invalidateQueries ({ queryKey: ["stroies"]});
  const { data } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });
  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/stories/${id}`);
  };
  const columns = [
    { title: "Ten TRuyen", dataIndex: "title" },

    { title: "Tac gia", dataIndex: "author" },
    { title: "hinh anh", dataIndex: "cover" },
    {
      title: "Ngay tao",
      dataIndex: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Action",
      render: (_, record) => (
        <button onClick={() => handleDelete(record.id)}>Xóa</button>
      ),
    },
  ];

  return (
    <div>
      Lab4
      <Table pagination={{ pageSize: 5}} columns={columns} dataSource={data} />
    </div>
  );
}
export default Lab4;
