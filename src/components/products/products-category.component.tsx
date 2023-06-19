import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProductsAction } from "../../modules/@productsModule/products.actions";

const ProductsList = (props: any) => {
   const {category} = useParams();
   const actionDispatcher = useAppDispatch();
   const productsData: any = useAppSelector(state => state.productsData);
   if(category && productsData[category].length === 0) {
    actionDispatcher(getProductsAction(category));
   } else {
    console.log(productsData);
   }
   
   
   return (
     <div>Prodcuts page for category: {category}</div>
   )
}

export default ProductsList;