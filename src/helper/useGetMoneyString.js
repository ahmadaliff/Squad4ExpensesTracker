export const useGetMoneyString = (moneyNum) => {
  if (moneyNum > 1e6) {
    return (Math.round(moneyNum / 1e6 * 100) / 100) + " M";
  } else {
    return moneyNum.toLocaleString();
  }
}