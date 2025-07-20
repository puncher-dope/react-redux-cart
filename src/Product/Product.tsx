import React, { memo } from "react";
import { useAppDispatch } from "../redux/hooks";
import { IProduct } from "../types/IProduct";
import { decreaseQuantity, increaseQuantity } from "../redux/productsReducer";


export const Product = memo(( props: IProduct & { quantity: number }) => {
  const dispatch = useAppDispatch();

  return (
    <li className="product">
      <div className="product-preview">
        <div className="thumbnail">
          <img className="image" src={props.image} alt={props.name} />
        </div>
        <div className="product-paper">
          <div className="product-name">{props.name}</div>
          <div className="product-price">$ {props.price}</div>
        </div>
      </div>
      <div className="product-quantity">x{props.quantity}</div>
      <div className="product-interactions">
        <div
          className="button plus"
          onClick={() => dispatch(increaseQuantity(props.id))}
        >
          +
        </div>
        <div
          className="button minus"
          onClick={() => dispatch(decreaseQuantity(props.id))}
        >
          -
        </div>
      </div>
    </li>
  );
});

