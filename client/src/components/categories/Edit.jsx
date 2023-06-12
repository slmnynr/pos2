import { Modal, Form, Table, Input, Button, message } from "antd";
import React, { useState } from "react";

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories,setCategories }) => {

   const [editRow,setEditRow]=useState({})


    const onFinish =(values) =>{
        try {
          fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category",
            {
             method:"PUT",
            body: JSON.stringify({...values,categoryId:editRow._id}),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        
        })
        message.success("Kategori Güncellendi..")
        setCategories(categories.map((item) =>{
            if(item._id===editRow._id){
                return{...item,title:values.title}
            }
            else {
                return item;
            }
        }))
        } catch (error) {
            console.log(error);
            message.error("Hata Var..")
        }
    }

    const deleteCategory = (id)=>{
    if (window.confirm("Emin misiniz?")) {
        try {
          fetch(process.env.REACT_APP_SERVER_URL +"/api/categories/delete-category",
             {method:"DELETE" ,
            body:JSON.stringify({categoryId:id}) ,
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kayıt Silindi.");
        setCategories(categories.filter((item)=>item._id!==id))
            
        } catch (error) {
            message.error("Hata Alındı.")
        }
    }


    }

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_,record) => {
    
        if (record._id===editRow._id) {
            return (
                <Form.Item className="mb-0" name="title">
                  <Input defaultValue={record.title} />           
                </Form.Item>
              );
      
        }else{
            return <p>{record.title}</p>
        }
    },
    },
    {
        title:"Action",
        dataIndex:"action",
        render:(_,record)=>{
            return(
             <div>
                  <Button type="link" onClick={()=>setEditRow(record) } className="pl-0" >Düzenle</Button>
                  <Button type="text" htmlType="submit">Kaydet</Button>
                  <Button type="text" danger onClick={()=>deleteCategory(record._id)} >Sil</Button>
             </div>
            ) 
        }
        
    }
  ];
  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table bordered dataSource={categories} columns={columns} rowKey={"_id"} />
      </Form>
    </Modal>
  );
};

export default Edit;
