import Header from "../components/Header/Header";
import { Button, Card, Input, Space, Table,Spin } from "antd";
import { useState,useEffect,useRef } from "react";
import PrintBill from "../components/Bills/PrintBill";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState();
  const [customer,setCustomer]=useState()
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await  fetch(process.env.REACT_APP_SERVER_URL +"/api/bills/get-all");
        const data = await res.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBills()
  }, []);


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });



  const columns = [
  {  title: "Müşteri Adı",
    dataIndex: "customerName",
    key: "customerName",
    ...getColumnSearchProps("customerName")
  },
  {
    title: "Telefon Numarası",
    dataIndex: "phoneName",
    key: "phoneName",
    ...getColumnSearchProps("phoneName")
  },
  {
    title: "Oluşturma Tarihi",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text)=>{
      return <span>{text.substring(0, 10)}</span>
    }
  },
  {
    title: "Ödeme Yöntemi",
    dataIndex: "paymentMode",
    key: "paymentMode",
    ...getColumnSearchProps("paymentMode")
  },
  {
    title: "Toplam Fiyat",
    dataIndex: "totalAmount",
    key: "totalAmount",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
    render: (text)=>{
      return <span>{text}₺</span>
    }
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
    render: (_,record)=>{
      return <Button type="link" 
      className="pl-0" onClick={()=>{
        setIsModalOpen(true)
        setCustomer(record)
      }}>Yazdır
      
      </Button>
    }
  },
  ];



  return (
    <>
      <div>
        <Header />
        <h1 className="text-4xl font-bold text-center">Faturalar</h1>

        {billItems ? ( <div className="px-6">
          <Table
            dataSource={billItems}
            columns={columns}
            bordered
            pagination={false}
            rowKey="_id"
            scroll={{
              x:1000,
              y:300
            }}
          />
          ;
          <div className="cart-total flex justify-end mt-4">
            <Card className="w-72">
              <Button
                className="mt-4 w-full "
                type="primary"
                size="large"
                onClick={() => setIsModalOpen(true)}
              >
                Yazdır
              </Button>
            </Card>
          </div>
        </div>):<Spin size="large" className="absolute h-screen w-screen flex justify-center" />}
      </div>

      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} customer={customer}/>
    </>
  );
};

export default BillPage;
