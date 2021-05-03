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

  return lottoNums;
};

export const isCorrectNumbers = () => {
  const winningInputs = $All("#winningNumbersWrap input");
  let winningNums = new Set();

  winningInputs.forEach((input) => {
    winningNums.add(input.value);
  });

  return winningNums.size === winningInputs.length;
};
