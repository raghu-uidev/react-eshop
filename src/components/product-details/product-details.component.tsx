import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProductByIdAction } from "../../modules/@productsModule/products.actions";

export interface ProductDetailsInterface {

}

const ProductDetails = (props: any) => {
    const { id } = useParams();
    const actionDispatcher = useAppDispatch();
    const productDetails: any = useAppSelector(state => state.productsData.productDetailData);
    console.log(productDetails);
    useEffect(() => {
        if (id) {
            actionDispatcher(getProductByIdAction(id));
        }
    }, [id]);

    return (
        <div>
            {productDetails && (
                <div className="row">
                    <div className="col-4">
                        <Carousel>
                            {productDetails.images && productDetails.images.map((image: string) => (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={image}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <div className="col-8">
                        <h3>{productDetails.title}</h3>
                    </div>
                </div>
            )}
        </div>

    )

}

export default ProductDetails;