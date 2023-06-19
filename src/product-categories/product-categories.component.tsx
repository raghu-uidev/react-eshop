import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ProductCatagoriesConfig } from "./product-categories.config";
import './product-categories.css';

const ProductCatagories = (props: any) => {
    const navigate = useNavigate();
    const categories = ProductCatagoriesConfig;
    const goToProducts = (category: string) => {
        navigate(`/products/${category}`)
    }
    return (<div className="categories">
        {
            categories.map((category, index) => (
                <Card key={index} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={category.cardImg} />
                    <Card.Body>
                        <Card.Title>{category.cardTitle}</Card.Title>
                        <Card.Text>
                            {category.cardDescription}
                        </Card.Text>
                        <Button variant="primary" onClick={() => goToProducts(category.categoryName)}>Go To Products</Button>
                    </Card.Body>
                </Card>
            ))
        }
    </div>)

}

export default ProductCatagories;