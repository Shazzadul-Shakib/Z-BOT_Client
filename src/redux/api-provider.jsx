/* eslint-disable react/prop-types */
import { Provider } from "react-redux"
import { store } from "./store"

export const ApiProvider=({children})=>{
    return <Provider store={store}> {children} </Provider>
}