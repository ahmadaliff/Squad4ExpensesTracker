/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useGetMoneyString } from "../../helper/useGetMoneyString";

const ExpenseCard = ({ expense }) => {
  const navigate = useNavigate();

  return (
    // TODO: Add the router
    <div className={styles.card} onClick={() => navigate(`/${expense.id}`)}>
      <div className={styles.card_left}>
        <p className={styles.category}>{expense.category}</p>
        <p className={styles.comment}>{expense.comment}</p>
      </div>
      <div className={styles.card_right}>
        <p>Rp {useGetMoneyString(expense.price)}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
