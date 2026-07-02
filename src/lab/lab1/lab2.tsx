import { Image,Table} from "antd";
function Lab2() {
    const columns = [
        {
            title: "ID",
            dataIndex: "id"
            
        },
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: boolean) => (
                <span style={{ color: status ? "green" : "red" }}>
                    {status ? "Active" : "Inactive"}
                </span>
            )
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            render: (avatar: string) => <Image src={avatar} />
        },
        {
            title: "Action",
            render: (_, record) => (
                <>
                <button>Edit</button>
                <button>Delete</button>
                </>
            )
        }
    ];
    const dataSource = [
        {
            key: "1",
            id: "1",
            name: "Linh",
            avatar: "https://www.bing.com/th/id/OIP.DlNxcHdsMudOeTn6t5OwuAHaEK?w=193&h=135&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=ImgAns&rm=2",
        },
        {
            key: "2",
            id: "2",
            name: "Hà",
            avatar: "https://www.bing.com/th/id/OIP.KoESgxAju02UFMJPaYwnjwHaEK?w=193&h=135&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=ImgAns&rm=2",
        },
        {
            key: "3",
            id: "3",
            name: "Hương",
            avatar: "https://www.bing.com/th/id/OIP.KoESgxAju02UFMJPaYwnjwHaEK?w=193&h=135&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=ImgAns&rm=2",
        }

    
    ];
    return <Table columns={columns} dataSource={dataSource} />;
}
export default Lab2;