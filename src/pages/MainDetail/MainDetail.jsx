import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { callAPI } from "../../domain/api";
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpenseCard from "../../components/ExpenseCard/ExpenseCard";

const MainDetail = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const navigate = useNavigate();

  const fetchExpenses = async() => {
    setLoading(true);
    try {
      let data;
      if (category) {
        data = await callAPI("expenses", "GET", {}, {category});
      } else {
        data = await callAPI("expenses", "GET");
      }
      console.log(data, "<< Expenses");
      setExpenses(data);

    } catch(error) {
      console.error(error);
      alert(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchExpenses();
  }, [category])

  return (
    <main>
      <nav>
        <h1 onClick={() => navigate("/")}>Expenses Tracker</h1>
      </nav>

      <div className={styles.content}>
        {loading ? (<p>Loading...</p>) : (
          <>
            <header>
              {category && (
                <h3>Category: {category}</h3>
              )}
              <h3>
                Total: Rp {expenses.reduce((total, expense) => total + expense.price, 0).toLocaleString()}
              </h3>
            </header>

            <div className={styles.list_expenses}>
              {expenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))}
            </div>
          </>
        )}

        <IconButton 
          aria-label="add" variant="contained" color="primary" className={styles.add_icon}
          onClick={() => navigate("/add")} // TODO: Know the add expense route  
        >
          <AddIcon />
        </IconButton>
      </div>


    </main>
  );
}

export default MainDetail;