import './cart-slider.css';

export interface SliderProps {
    isSliderOpen: boolean;
    onSliderClose(): void;
}

const CartSlider = (props: SliderProps) => {
    return (
        <div className={props.isSliderOpen ? "cart-slider open" : "cart-slider"}>
            <div className="slider-header">
               <button className="slider-close" onClick={props.onSliderClose}>X</button>
            </div>
        </div>
    )
}

export default CartSlider;