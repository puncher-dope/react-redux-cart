import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./store";

export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore<RootState>
