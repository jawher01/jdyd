import { combineReducers } from "redux";
import { userReducer } from "./user";
import {publicationReducer} from "./publication"
import {classeReducer} from "./classe"
import { formationReducer } from "./formation";
import {employerReducer} from "./employer"
import {evenementReducer} from "./evenement"
export const rootReducer = combineReducers({ userReducer,publicationReducer,classeReducer,formationReducer,employerReducer,evenementReducer});
