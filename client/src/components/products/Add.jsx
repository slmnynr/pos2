import React from "react";
import { Form, Modal, Input, Button, message,Select } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setProducts,
  products
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-products", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün Başarıyla Eklenmiştir");
      form.resetFields();
      setProducts([...products, {
        _id:Math.random(),
        price:Number(values.price)
        
      }]);
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez" }]}
        >
          <Input placeholder="Ürün Adı Giriniz" />
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Görseli"
          rules={[{ required: true, message: "Ürün Görseli Alanı Boş Geçilemez" }]}
        >
          <Input placeholder="Ürün Görseli Giriniz" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[{ required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez" }]}
        >
          <Input placeholder="Ürün Fiyatı Giriniz" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Kategori Seç"
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez" }]}
        >
     <Select
    showSearch   
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.title ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.title ?? '').localeCompare((optionB?.title ?? ''))
    }
    options={categories}
  />
        </Form.Item>
        


        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
