/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useGetMoneyString } from "../../helper/useGetMoneyString";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/main-detail/${category.category}`)}>
      <p className={styles.category_name}>{category.category}</p>
      <p className={styles.category_percent}>{category.percentage}%</p>
      <p className={styles.category_price}>Rp {useGetMoneyString(category.totalPrice)}</p>
    </div>
  )
}

export default CategoryCard;