import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useAppSelector } from "../../../hooks";
import CartSlider from "../cart-slider/cart-slider.component";
import './cart-icon.css';

const CartIcon = () => {
    const [showSlider, setShowSlider] = useState(false);
    const cartCount = useAppSelector(state => state.cartData.cartCount);
    console.log(cartCount);
    const openSlider = () => {
        setShowSlider(true);
    }
    return (
        <>
            <div className="cart-icon-container">  
              <FaShoppingCart className="cart-icon" onClick={() => openSlider()}></FaShoppingCart>
              {cartCount > 0 && (<div className="count-bubble">{cartCount}</div>)}
            </div>
            <CartSlider isSliderOpen={showSlider} onSliderClose={() => setShowSlider(false)}/>
        </>

    )
}

export default CartIcon;