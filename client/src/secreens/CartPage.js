import React, { useState,useEffect } from "react";
import Layout from "../components/Layout/Layout";
import CartContext from "../usecontext/CartContextProvider";
import AuthContext from "../usecontext/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";


const CartPage = () => {
  const AuthCtx = useContext(AuthContext);
  const CartCtx = useContext(CartContext);
  // console.log("Cartctx",CartCtx.cart)

  const [clientToken,setClientToken]=useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice=()=>{
    try {
      let total=0;
      CartCtx.cart?.map(item=>{total=total+item.price})
      return total.toLocaleString("en-US",{
        style:"currency",
        currency:"USD"
      });
    } catch (error) {
      console.log(error)
    }

  }

  const onRemoveCart=(pid)=>{
    try {
      let myCart=[...CartCtx.cart];
      let index=myCart.findIndex(item => item._id === pid);
      myCart.splice(index,1);
      CartCtx.setCart(myCart);
      localStorage.setItem("cart",JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }

  
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api//braintreetoken`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [AuthCtx.Auth?.token]);

  //handle payments
  const handlePayment = async () => {
    const Cart=CartCtx.cart;
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`http://localhost:8000/api//payments`, {
        nonce,
        Cart
      });
      setLoading(false);
      localStorage.removeItem("cart");
      CartCtx.setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="contanier">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${AuthCtx.Auth?.token && AuthCtx.Auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {CartCtx.cart?.length > 1
                ? `You have ${CartCtx.cart?.length} items in your cart ${
                    AuthCtx.Auth ? "" : "Please login to Checkout"
                  }`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {CartCtx.cart?.map((p) => (
              <div className="row md-2 card flex-row p-3 mb-3">
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8000/api//getphoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width={100}
                    height={150}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0,30)}</p>
                  <h4>Price:{p.price}</h4>
                  <button className="btn btn-danger" onClick={()=>{onRemoveCart(p._id)}}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {AuthCtx.Auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{AuthCtx.Auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {AuthCtx.Auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2"> 
              {!clientToken || !CartCtx.cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !AuthCtx.Auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
