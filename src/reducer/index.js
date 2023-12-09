import Crud from "./crudReducer";
import { combineReducers } from "redux";

const rootreducer = combineReducers({
    Crud,
})

export default rootreducer;