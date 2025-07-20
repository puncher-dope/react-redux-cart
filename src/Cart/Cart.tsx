import React from "react";
import { Product } from "../Product/Product";
import { useAppSelector } from "../redux/hooks";
import { useGetProductsQuery } from "../redux/productsReducer";

export function Cart() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const quantities = useAppSelector(state => state.products);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  if (!products) return <div>No products available</div>;

  return (
    <ul className="cart">
      {products.map(product => {
        const safeProduct = {
          id: Number(product.id),
          name: String(product.name),
          price: typeof product.price === 'number' ? product.price : 
                typeof product.price === 'string' ? parseFloat(product.price) || 0 : 0,
          image: String(product.image),
          quantity: Number(quantities[product.id] || 0)
        };
        
        return <Product key={safeProduct.id} {...safeProduct} />;
      })}
    </ul>
  );
}