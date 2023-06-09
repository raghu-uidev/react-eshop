import { useParams } from "react-router-dom";

const ProductsList = (props: any) => {
   const {category} = useParams();

   return (
     <div>Prodcuts page for category: {category}</div>
   )
}

export default ProductsList;