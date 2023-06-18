import { Button, Card } from "react-bootstrap";
import { ProductCatagoriesConfig } from "./product-categories.config";

const ProductCatagories = (props: any) => {
    const categories = ProductCatagoriesConfig;
    return (<div>
        {
            categories.map(category => (
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={category.cardImg} />
                    <Card.Body>
                        <Card.Title>{category.cardTitle}</Card.Title>
                        <Card.Text>
                            {category.cardDescription}
                        </Card.Text>
                        <Button variant="primary">Go To Products</Button>
                    </Card.Body>
                </Card>
            ))
        }
    </div>)

}

export default ProductCatagories;