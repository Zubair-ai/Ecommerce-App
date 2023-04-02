import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useContext } from "react";
import AuthContext from "../../usecontext/AuthContext";
import { toast } from "react-hot-toast";
import SearchForm from "../Forms/SearchForm";
import useCategory from "../../Hooks/useCategory";
import CartContext from "../../usecontext/CartContextProvider";
import { Badge } from "antd";
import {AiOutlineShoppingCart} from "react-icons/ai"

export default function Header() {
  const Authctx = useContext(AuthContext);
  const catrgories = useCategory();
  const { cart } = useContext(CartContext);
  const onLogoutHandler = () => {
    Authctx.setAuth({
      ...Authctx,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("you are Loggout Successfully");
  };
  console.log("ctx.cart?.length", cart?.length);
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <RiShoppingBag3Fill style={{ marginBottom: "5px" }} />
          Buy Brands
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 p-3">
            <SearchForm />
            <li className="nav-item">
              <Link to={"/"} className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li class="nav-item dropdown">
              <Link
                class="nav-link dropdown-toggle"
                to={"/"}
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to={"/fullcategories"}>
                  <li>All Categories</li>
                </Link>
                {catrgories?.map((c) => (
                  <li>
                    <Link
                      to={`/selectedcategory/${c.slug}`}
                      className="dropdown-item"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {Authctx.Auth.userData === undefined &&
            Authctx.Auth.token.length === 0 ? (
              <>
                <li className="nav-item">
                  <Link to={"/signin"} className="nav-link">
                    Signin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle text-uppercase nav-link  "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {Authctx.Auth.user.name}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li className="nav-item">
                      <Link
                        to={`/dashboard/${
                          Authctx.Auth.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item "
                      >
                        Dashborad
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/"}
                        className="dropdown-item "
                        onClick={onLogoutHandler}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
               <li className="nav-item">
                  <Badge color="black" count={cart?.length} showZero>
                    <Link to={"/cartpage"} className="nav-link fw-bold">
                      <AiOutlineShoppingCart size={30}/>
                    </Link>
                  </Badge>
                </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
