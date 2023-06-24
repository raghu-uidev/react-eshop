import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { getProductsAction } from "../products.actions";
import './products.css';

const ProductsList = (props: any) => {
  const { category } = useParams();
  const actionDispatcher = useAppDispatch();
  const navigate = useNavigate();
  const productsData: any = useAppSelector(state => state.productsData);
  let productsList = [];
  if (category) {
    productsList = productsData[category];
  }

  useEffect(() => {
    if (category) {
      if (!productsData[category].length) {
        actionDispatcher(getProductsAction(category));
      }
    }
  }, [category]);

  const goToProductsDetails = (id: string) => {
    navigate(`/product/${id}`);
  }

  return (
    <div className="products">
      {productsList.map((product: any, index: number) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={product.thumbnail} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              {product.description}
            </Card.Text>
            <Button variant="primary" onClick={() => goToProductsDetails(product._id)}>Go To Product Details</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default ProductsList;