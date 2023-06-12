import Header from "../components/Header/Header";
import { useState, useEffect } from "react";
import StatisticCard from "../components/statistic/StatisticCard";
import { Area, Pie } from "@ant-design/plots";
import { Spin } from "antd";


const StaticticPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const user =JSON.parse(localStorage.getItem("posUser"))

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-all"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };



  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam Değer",
      },
    },
  };



  const totalAmount = ()=>{
   const amount = data.reduce((total,item)=>item.totalAmount + total,0) 
   return amount.toFixed(2);
  }

  return (
    <>
      <Header />
      {data ? (  <div className="px-6 md:pb-0 pb-20" >
        <h1 className="text-4xl font-bold text-center">İstatiskler</h1>
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş Geldin {""}
            <span className="text-green-700 font-bold  text-xl">{user.userName}</span>
          </h2>

          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={data?.length}
              img={"images/images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={totalAmount()}
              img={"images/images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={data?.length}
              img={"images/images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={products?.length}
              img={"images/images/product.png"}
            />
          </div>
          <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
            <div className="lg:w-1/2 lg:h-72 h-72">           
            <Area {...config} />
            </div>
          <div className="lg:w-1/2 lg:h-72 h-72" >
            <Pie {...config2} />
          </div>

          </div>
        </div>
      </div>):<Spin size="large" className="absolute h-screen w-screen flex justify-center" />}
    
    </>
  );
};

export default StaticticPage;
