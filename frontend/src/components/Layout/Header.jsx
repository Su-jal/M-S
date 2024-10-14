import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setSearchData(null);
    } else {
      const filteredProducts = productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchData(filteredProducts);
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden lg:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://i.ibb.co/Y3GfSM4/M-S-market.png"
                alt="logo"
                className="w-[240px] h-auto absolute top-3 left-7 lg:w-[200px] lg:top-2"
              />
            </Link>
          </div>
          {/* Search box */}
          <div className="w-[40%] relative lg:w-[60%] md:w-[80%]">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((i) => (
                  <Link to={`/product/${i._id}`} key={i._id}>
                    <div className="w-full flex items-start py-3">
                      {i.images && (
                        <img
                          src={`${i.images[0]?.url}`}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                      )}
                      <h1>{i.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : null
        } hidden lg:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div className={`${styles.section} relative flex justify-between`}>
          {/* Categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden xl:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
              />
              {dropDown && <DropDown categoriesData={categoriesData} />}
            </div>
          </div>
          <Navbar active={activeHeading} />
          <div className="flex">
            {/* Wishlist, Cart, Profile */}
            <div className="relative cursor-pointer mr-[15px]">
              <AiOutlineHeart size={30} className="text-white" />
              <span className="absolute right-0 top-0 rounded-full bg-[#FFA500] w-4 h-4 text-white text-xs text-center">
                {wishlist.length}
              </span>
            </div>
            <div className="relative cursor-pointer mr-[15px]">
              <AiOutlineShoppingCart size={30} className="text-white" />
              <span className="absolute right-0 top-0 rounded-full bg-[#FFA500] w-4 h-4 text-white text-xs text-center">
                {cart.length}
              </span>
            </div>
            <div className="relative cursor-pointer mr-[15px]">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user.avatar?.url}
                    className="w-[35px] h-[35px] rounded-full"
                    alt="profile"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} className="text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } w-full h-[60px] bg-white z-50 top-0 left-0 shadow-sm flex lg:hidden items-center justify-between px-4`}
      >
        <BiMenuAltLeft size={30} onClick={() => setOpen(true)} />
        <Link to="/">
          <img
            src="https://i.ibb.co/Y3GfSM4/M-S-market.png"
            alt="logo"
            className="w-[120px] h-auto"
          />
        </Link>
        <AiOutlineShoppingCart size={30} onClick={() => setOpenCart(true)} />
        {openCart && <Cart setOpenCart={setOpenCart} />}
      </div>

      {/* Sidebar for Mobile */}
      {open && (
        <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
          <div className="fixed w-[70%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="flex justify-between items-center px-3 py-5">
              <AiOutlineHeart size={30} className="ml-3" />
              <RxCross1 size={30} onClick={() => setOpen(false)} />
            </div>
            <Navbar active={activeHeading} />
            <Link to="/shop-create" className={`${styles.button} ml-4`}>
              <h1 className="text-white flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
            {isAuthenticated ? (
              <div className="flex justify-center py-4">
                <Link to="/profile">
                  <img
                    src={user.avatar?.url}
                    alt="profile"
                    className="w-[60px] h-[60px] rounded-full"
                  />
                </Link>
              </div>
            ) : (
              <div className="flex justify-center py-4">
                <Link to="/login">
                  <CgProfile size={30} />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;
