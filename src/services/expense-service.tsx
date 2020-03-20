import { ServiceBase } from "./service-base";
import { Expense } from "../core/models/expense";



class ExpenseService extends ServiceBase<Expense> {

    constructor() {
        super("expenses");
    }

    

}

export const expenseService = new ExpenseService();