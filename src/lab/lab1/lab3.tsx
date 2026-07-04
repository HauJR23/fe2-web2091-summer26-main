import {Button, Card, Form, Input, InputNumber} from "antd";

type ProductValues = {
    name: string;
    price: number;
    quantity: number;
    description: string;
};

function Lab3(){
    const onFinish = (values: ProductValues)=> {
        console.log("Product data:", values);

    };
    return (
        < Card title="Bai 3" style={{maxWidth: 500, margin: "20px auto" }}>
        <Form layout="vertical" onFinish={onFinish}>   
        <Form.Item
        label ="Ten"
        name="name"
        rules={[{required: true, message: "Vui long nhap ten san pham"}]}
        >
            <Input />
        </Form.Item>

        <Form.Item
        label="Giá"
        name="price"
        rules={[{required: true, message: "Vui long nhap gia"}]}
>
    <InputNumber min={0} style={{width:"100%"}} />
</Form.Item>
<Form.Item
label="So luong"
name="quantity"
rules={[{required: true, message: "Vui long nhap so luong"}]}
>
    <InputNumber min={0} style={{width:"100%"}} />
</Form.Item>
<Form.Item label ="Mo ta" name="description">
    <Input.TextArea rows={3} />
    </Form.Item>
    <Button type="primary" htmlType="submit">
        Submit
    </Button>
         </Form>
         </Card>
    );
}
export default Lab3;