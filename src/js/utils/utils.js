import { LOTTO } from "./constants.js";

const randomNumber = () => {
  return Math.floor(Math.random() * (LOTTO.MAX + 1 - LOTTO.MIN)) + LOTTO.MIN;
};

export const lottoNumbers = (size = LOTTO.NUM_SIZE) => {
  let lottoNums = new Set();
  while (lottoNums.size < size) {
    lottoNums.add(randomNumber());
  }

  return [...lottoNums];
};

export const winningNumbers = (winningInputs) => {
  let winningNums = new Set();

  winningInputs.forEach((input) => {
    winningNums.add(+input.value);
  });

  return [...winningNums];
};
