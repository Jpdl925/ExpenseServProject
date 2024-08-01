import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constat";

interface Expense {
    id:number;
    description: string;
    amount: number;
    category: string;
}

export interface ExpenseProps {
    expenses: Expense [];
    onDelete: (id:number) => void;
}

const ExpenseList = ({expenses,onDelete}:ExpenseProps) => {

  const [currentData, setCurrentData] = useState<Expense>({} as Expense);
  const [data, setData] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const toast = useToast();

  const fetchData = () => {
    setIsLoading(true);
    axios
    .get(BASE_URL+"Expense")
    .then((res) => {
      setData(res.data);
      console.log(res);
      console.log(data);
      
      
    })
    .catch(error => {
      console.log(error);
      setError(error);
      
  })
  .finally(() => {
      setIsLoading(false)
  })
  console.log(data);
  }

  useEffect(() => {
    fetchData();
}, [])

    if(expenses.length === 0)
        return null;


  return (
    <>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>
                <button className="btn btn-outline-danger" onClick={() => onDelete(expense.id)}>Delete</button>
            </td>

          </tr>)}

        </tbody>

        <tfoot>
            <tr>
                <td>Total</td>
                <td>{expenses.reduce((acc,expense) => expense.amount + acc,0).toFixed(2)}</td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>

      </table>
    </>
  );
};

export default ExpenseList;
