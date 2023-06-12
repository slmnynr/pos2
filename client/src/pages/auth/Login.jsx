import { Button, Form,Input,Carousel, Checkbox,message } from "antd";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    const onFinish = async (values) => {
      setLoading(true);
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
  
        const user = await res.json();
  
        if (res.status === 200) {
          localStorage.setItem(
            "posUser",
            JSON.stringify({
              username: user.username,
              email: user.email,
            })
          );
          message.success("Giriş işlemi başarılı.");
          navigate("/");
        } else if (res.status === 404) {
          message.error("Kullanıcı bulunamadı!");
        } else if (res.status === 403) {
          message.error("Şifre yanlış!");
        }
        setLoading(false);
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
        setLoading(false);
      }
    };


  return (
    <div className='h-screen' >
        <div className='flex justify-between h-full'>
        <div className="left">
            <div className='xl:px-20 px-10  w-full flex flex-col h-full justify-center relative ' >
                <h1 className='text-center text-5xl font-bold mb-2'>LOGO</h1>
                <Form layout="vertical"
                 onFinish={onFinish}
                 initialValues={{
                    remember:false
                 }}
                 
                 >
                 
                 <Form.Item label="Email" name={"email"} rules={[{required:true,
                     message:"Email alanı boş bırakılamaz!"}]}>
                  
                    <Input />
                 </Form.Item>
                 <Form.Item label="Şifre" name={"password"} rules={[{required:true,
                     message:"Şifre alanı boş bırakılamaz!"}]}>
                  
                    <Input.Password />
                 </Form.Item>   

                <Form.Item name={"remember"} valuePropName="checked">
                    <div className="flex justify-between">
                        <Checkbox>Remember me</Checkbox>
                        <Link>Forgot Password</Link>
                    </div>
                </Form.Item>

                 <Form.Item>                  
                  <Button type="primary" 
                  htmlType="submit" 
                  className="w-full" 
                  loading={loading}
                  size="large">
                    
                    Giriş Yap</Button>
                 </Form.Item>                 
                </Form>

                <div className="flex justify-center absolute left-0 bottom-10 w-full" >Hesabınız yoksa şimdi&nbsp;
                <Link className="text-blue-600" to={"/register"} >kayıt olabilirsiniz</Link></div>
            </div>
        </div>
        <div className="xl:w-4/6 lg:w-/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full  items-center">
        <div className="w-full h-full ">
     <div className="w-full" >
     <Carousel className="!h-full px-6" autoplay >
     <AuthCarousel img="/images/images/responsive.svg" title="Responsive" desc="Tüm Cihaz Boyutlarıyla Uyumluluk"/>
     <AuthCarousel img="/images/images/statistic.svg" title="İstatistikler" desc="Geniş Kapsamlı İstatistikler"/>
     <AuthCarousel img="/images/images/customer.svg" title="Müşteri Memnuniyeti" desc="Mutlu Müşteriler"/>
     <AuthCarousel img="/images/images/admin.svg" title="Yönetim Paneli" desc="Kolay Yönetim"/>
    
    </Carousel>
     </div>

        </div>
        </div>
        </div>
    </div>
  )
}

export default Login