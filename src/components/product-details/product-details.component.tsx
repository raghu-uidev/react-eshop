import { useEffect } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProductByIdAction } from "../../modules/@productsModule/products.actions";
import StarRatingComponent from 'react-star-rating-component';
import './product-details.css';

export interface ProductDetailsInterface {

}

const ProductDetails = (props: any) => {
    const { id } = useParams();
    const actionDispatcher = useAppDispatch();
    const navigate = useNavigate();
    const productDetails: any = useAppSelector(state => state.productsData.productDetailData);
    const actualPrice: number = productDetails.price;
    const discountPrice = Math.round((actualPrice * productDetails.discountPercentage) / 100);
    const finalPrice = actualPrice - discountPrice;
    let productStock = 5;
    if (productDetails.stock < 5) {
        productStock = productDetails.stock;
    }

    useEffect(() => {
        if (id) {
            actionDispatcher(getProductByIdAction(id));
        }
    }, [id]);

    const addProductToCart = () => {
        if(sessionStorage.getItem('token')) {

        } else {
            navigate('/sign-in');
        }
    }

    return (
        <div className="product-details-container">
            {productDetails && (
                <div className="row">
                    <div className="col-4">
                        <Carousel >
                            {productDetails.images && productDetails.images.map((image: string) => (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 product-image"
                                        src={image}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <div className="col-8">
                        <div className="separator">
                            <label className="label">Product Name</label>
                            <h3>{productDetails.title}</h3>
                        </div>
                        <div className="separator">
                            <label className="label">Product Description</label>
                            <div className="product-data">{productDetails.description}</div>
                        </div>
                        <div className="separator">
                            <label className="label">Product Brand</label>
                            <div className="product-data">{productDetails.brand}</div>
                        </div>

                        <div className="separator">
                            <label className="label">Price</label>
                            <div className="product-data">
                                <div>
                                    <span className="discount">{`-${productDetails.discountPercentage}%`}</span>
                                    <span className="final-price"> &#8377;{finalPrice}</span>
                                </div>
                                <div className="actual-proce">M.R.P: &#8377;{actualPrice}</div>
                            </div>
                        </div>

                        <div className="separator">
                            <label className="label">Product Rating</label>
                            <StarRatingComponent
                                name="rating"
                                value={productDetails.rating}
                                editing={false}
                            ></StarRatingComponent>
                        </div>
                        <div className="separator">
                            <label className="label">Stock</label>
                            <div className="product-data">
                                <select className="stock-selector">
                                    {
                                        [...Array(productStock)].map((item, i) => (
                                            <option>{i + 1}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="separator">
                            <Button className="add-cart-btn" onClick={() => addProductToCart()}>Add to Cart</Button>
                        </div>

                    </div>
                </div>
            )}
        </div>

    )

}

export default ProductDetails;