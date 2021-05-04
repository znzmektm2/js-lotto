import { LOTTO } from "./constants.js";
import { $All } from "./DOM.js";

const randomNumber = () => {
  return Math.floor(Math.random() * (LOTTO.MAX + 1 - LOTTO.MIN)) + LOTTO.MIN;
};

export const lottoNumbers = () => {
  let lottoNums = new Set();
  while (lottoNums.size < LOTTO.NUM_SIZE) {
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

export const isCorrectNumbers = () => {
  return winningNums.size === winningInputs.length;
};
