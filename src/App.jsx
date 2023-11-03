/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { callAPI } from "./domain/api";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import styles from "./styles.module.scss";
import CategoryCard from "./components/CategoryCard/CategoryCard";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetMoneyString } from "./helper/useGetMoneyString";

function App() {
  const [loading, setLoading] = useState(true);
  const [expenseByCategories, setExpenseByCategories] = useState([]);

  const navigate = useNavigate();

  const fetchAllExpenses = async () => {
    setLoading(true);
    try {
      const data = await callAPI("expenses", "GET");
      console.log(data, "<< All Expenses");

      // Get each category's total prices
      const categoryTotals = data.reduce((result, expense) => {
        const existingCategory = result.find(
          (item) => item.category === expense.category
        );
        if (existingCategory) {
          existingCategory.totalPrice += expense.price;
        } else {
          result.push({
            category: expense.category,
            totalPrice: expense.price,
          });
        }
        return result;
      }, []);

      // Add percentage attribute to each category's expense
      const totalExpenses = data.reduce((total, item) => total + item.price, 0);
      categoryTotals.forEach((category) => {
        category.percentage = Math.round(
          (category.totalPrice / totalExpenses) * 100
        );
      });

      console.log(categoryTotals);
      setExpenseByCategories(categoryTotals);
    } catch (error) {
      console.error(error);
      alert(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  return (
    <main>
      <nav>
        <h1>Expenses Tracker</h1>
        <ReceiptRoundedIcon
          className={styles.detail_icon}
          onClick={() => navigate("/main-detail")}
        />
      </nav>
      <div className={styles.content}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <header>
              <div className={styles.chart}>
                <PieChart
                  series={[
                    {
                      data: expenseByCategories.map((category) => ({
                        value: category.totalPrice,
                        label: category.category,
                      })),
                      innerRadius: 80,
                      cx: 130,
                    },
                  ]}
                  width={400}
                  height={200}
                >
                  <PieCenterLabel>
                    Rp{" "}
                    {expenseByCategories
                      .reduce(
                        (total, category) => total + category.totalPrice,
                        0
                      )
                      .toLocaleString()}
                  </PieCenterLabel>
                </PieChart>
              </div>
              <IconButton
                aria-label="add"
                variant="contained"
                color="primary"
                className={styles.add_icon}
                onClick={() => navigate("/add")} // TODO: Know the add expense route
              >
                <AddIcon />
              </IconButton>
            </header>

            <div className={styles.list_categories}>
              {expenseByCategories.map((category) => (
                <CategoryCard key={category.category} category={category} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default App;

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

const PieCenterLabel = ({ children }) => {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
};
