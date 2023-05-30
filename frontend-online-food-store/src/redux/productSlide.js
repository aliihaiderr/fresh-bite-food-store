import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    productList : [],
    cartItem :[]
}
export const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setDataProduct : (state, action)=>{
            state.productList = [...action.payload]
        },
        addCartItem : (state, action)=>{
            const check = state.cartItem.some((el)=>el._id === action.payload._id)
            if (check) {
                toast.error('Already Item In Cart')
            }
            else{
                toast.success('Item Add Successfully')
                const total = action.payload.price
                state.cartItem = [...state.cartItem,{...action.payload,qty:1, total:total}]   
            }
        },
        deleteCartItem : (state, action)=>{
            toast.success("one item Deleted")
            const index = state.cartItem.findIndex((el)=>el._id === action.payload)
            state.cartItem.splice(index,1)
        },
        increaseQty : (state, action)=>{
            const index = state.cartItem.findIndex((el)=>el._id === action.payload)
            let qty = state.cartItem[index].qty
            const qtyIncrement = ++qty
            state.cartItem[index].qty = qtyIncrement

            const price =state.cartItem[index].price
            const total = price * qtyIncrement

            state.cartItem[index].total = total

        },
        decreaseQty : (state, action)=>{
            const index = state.cartItem.findIndex((el)=>el._id === action.payload)
            let qty = state.cartItem[index].qty
            if (qty > 1) {
                const qtyDecrement = --qty
                state.cartItem[index].qty = qtyDecrement
                const price =state.cartItem[index].price
                const total = price * qtyDecrement

                state.cartItem[index].total = total
            }
        }
    }
})

export const {setDataProduct,addCartItem,deleteCartItem,increaseQty,decreaseQty} = productSlice.actions

export default productSlice.reducer