import React from 'react'
import { Modal,Input,Form,Select,Button,Card,message } from "antd";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";



const CreateBill = ({isModalOpen, setIsModalOpen}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const onFinish =async (values) =>{
       try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
            method: "POST",
            body: JSON.stringify({
              ...values,
              subTotal: cart.total,
              tax: ((cart.total * cart.tax) / 100).toFixed(2),
              totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
              cartItems: cart.cartItems,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });
    
          if (res.status === 200) {
            message.success("Fatura başarıyla oluşturuldu.");
            dispatch(reset());
            navigate("/bills");
          }
       } catch (error) {
        console.log(error)
       }
    }

    const cart = useSelector((state)=>state.cart)

    
  return (
    <>
        <Modal title="Yeni Fatura Oluştur"
         open={isModalOpen} 
         footer={false} 
         onCancel={()=>setIsModalOpen(false)}
         
       
          >
     
     <Form onFinish={onFinish} layout={'vertical'}>
        <Form.Item   name={"customerName"} label="Müşteri Adı" rules={[{required:true,message:"Müşteri Adı Boş Geçilemez."}]}>
            <Input  placeholder='Müşteri Adı'/>
        </Form.Item>
        <Form.Item   name={"phoneName"} label="Tel No" rules={[{required:true,message:"Telefon No Geçilemez."}]}>
            <Input maxLength={11} placeholder='Tel No'/>
        </Form.Item>       
        <Form.Item  name={"paymentMode"} label="Ödeme Yöntemi" rules={[{required:true,message:"Ödeme Yöntemi Seçilmelidir."}]}>
        <Select  placeholder="Ödeme Yöntemi Seçiniz">
                <Select.Option value="Nakit">Nakit</Select.Option>
                <Select.Option value="Kredi Kart"> Kredi Kartı</Select.Option>
            </Select>
        </Form.Item>
    
            <Card className="">
            <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>{cart.total.toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between my-2">
                    <span>Kdv %8</span>
                    <span className="text-red-600">{((cart.total * cart.tax) / 100).toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between">
                    <b> Toplam</b>
                    <b> {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)} ₺</b>
                </div>
                <div className='flex justify-end'>
                <Button
                  className="mt-4 "
                   type="primary"
                    size="large" 
                    onClick={()=>setIsModalOpen(true)}
                    htmlType='submit'
                    disabled={
                        cart.cartItems.length===0
                    }
                    >Sipariş Oluştur
                    
                </Button>
                </div>          
            </Card>     

         
        
     </Form>
      </Modal>
    </>
  )
}

export default CreateBill