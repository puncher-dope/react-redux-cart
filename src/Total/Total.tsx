import { createOrderAction } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetProductsQuery } from "../redux/productsReducer";
import { round } from "../utils";
import { createSelector } from '@reduxjs/toolkit';

export function Total() {
  const { data: products } = useGetProductsQuery();
  
  // Мемоизированный селектор
  const selectTotal = createSelector(
    [(state) => state.products, (state) => products],
    (quantities, products) => {
      if (!products) {
        return {
          subtotal: 0,
          tax: 0,
          total: 0,
        };
      }

      const subtotal = products.reduce((acc, product) => {
        return acc + product.price * (quantities[product.id] || 0);
      }, 0);
      
      const tax = subtotal * 0.13;
      const total = subtotal + tax;

      return {
        subtotal: round(subtotal),
        tax: round(tax),
        total: round(total),
      };
    }
  );

  const total = useAppSelector(selectTotal);
  const dispatch = useAppDispatch();
  const disableBuyButton = useAppSelector((state) => state.order.loading);

  return (
    <table className="bill">
      <tbody>
        <tr className="subtotal">
          <td className="label">Subtotal:</td>
          <td className="value">$ {total.subtotal}</td>
        </tr>
        <tr className="salestax">
          <td className="label">Sales tax:</td>
          <td className="value">$ {total.tax}</td>
        </tr>
        <tr className="total">
          <td className="label">Total:</td>
          <td className="value">$ {total.total}</td>
        </tr>
        <tr>
          <td colSpan={2} className="button-cell">
            <button
              className="main-button"
              disabled={disableBuyButton}
              onClick={() => dispatch(createOrderAction())}
            >
              Buy
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}