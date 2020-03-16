import { modelBase } from "./model-base";

export interface Expense extends modelBase {
    name: string,
    value: number
}