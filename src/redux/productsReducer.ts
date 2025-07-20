import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../types/IProduct";

// export function productsReducer(state = initialProducts, action: ProjectActions) {
//     switch (action.type) {
//         case INCREASE_QUANTITY_ACTION:
//             return state.map((product) => {
//                 if (product.id === action.payload.id) {
//                     return {
//                         ...product,
//                         quantity: product.quantity + 1
//                     }
//                 }

//                 return product;
//             })

//         case DECREASE_QUANTITY_ACTION:
//             return state.map((product) => {
//                 if (product.id === action.payload.id && product.quantity > 0) {
//                     return {
//                         ...product,
//                         quantity: product.quantity - 1
//                     }
//                 }

//                 return product;
//             })

//         default:
//             break;
//     }

//     return state;
// }

const initialState: Record<IProduct["id"], number> = {};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increaseQuantity(state, action: PayloadAction<IProduct["id"]>) {
      if (state[action.payload]) {
        state[action.payload]++
      }else{
        state[action.payload] = 1
      }
    },

    decreaseQuantity(state, action: PayloadAction<IProduct["id"]>) {
      if (state[action.payload] > 0) {
        state[action.payload]--
      }else{
        state[action.payload] = 0
      }
    },
  },
});

export const productsApiSlice = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mocki.io/v1" }),
  endpoints(builder) {
    return {
      getProducts: builder.query<IProduct[], void>({
        query: () => ({ url: "/223cd80a-2e68-4b19-84cb-ed13a7e156a6" }),
      }),
    };
  },
});

export const { increaseQuantity, decreaseQuantity } = productsSlice.actions;

export const { useGetProductsQuery } = productsApiSlice;
