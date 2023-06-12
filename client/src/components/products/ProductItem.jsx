import { addProduct } from "../../redux/cartSlice"
import {useDispatch} from "react-redux"
import { message } from "antd";

const ProductItem = ({item}) => {

  const dispatch = useDispatch()

  const handleClick = () =>{
    dispatch(addProduct({...item,quantity:1}));
    message.success("Sepet Sepete Eklendi");
  }
  return (
    <div  className="product-item border hover:shadow-lg cursor-pointer transition-all select-none" onClick={handleClick}>
          <div className="product-img">
            <img
              src={item.img}
              alt=""
              className="h-28 object-cover w-full border-b"
            />
          </div>
          <div className="product-info flex flex-col p-3">
            <span className="font-bold">{item.title}</span>
            <span>{item.price}₺</span>
          </div>

          
        </div>
  )
}

export default ProductItem

//ddd //  single  lock double lock // solid //http lifecyle ve metodları requset attribitleri -- request lifesclye middleware nedir cache handle etmek
//Onur CAN20:45
// https://www.pluralsight.com/guides/lock-statement-best-practices
// Onur CAN20:46
// http://diranieh.com/NetDataStructures/Figures/CollectionHierarchy.png
// https://jbcedge.com/2018/03/08/c-collections/
// Onur CAN20:48
// https://gokhana.medium.com/solid-nedir-solid-yaz%C4%B1l%C4%B1m-prensipleri-nelerdir-40fb9450408e
// https://mbilgil0.medium.com/http-metotlar%C4%B1-http-request-methods-90d57d574dfa
// Onur CAN20:52
// https://feyyazacet.medium.com/asp-net-core-mvc-request-life-cycle-ff2588a2af8f
// cnz-serj-dqd
// Onur CAN20:55
// https://muratsuzen.github.io/posts/aspnet-core-middleware-nedir-nasil-kullanilir/