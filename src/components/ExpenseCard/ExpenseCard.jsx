/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const ExpenseCard = ({ expense }) => {
  const navigate = useNavigate();

  return (
    // TODO: Add the router
    <div className={styles.card} onClick={() => navigate(`/`)}> 
      <div className={styles.card_left}>
        <p className={styles.category}>{expense.category}</p>
        <p className={styles.comment}>{expense.comment}</p>
      </div>
      <div className={styles.card_right}>
        <p>Rp {expense.price.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default ExpenseCard;