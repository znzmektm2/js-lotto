import { LOTTO, PRIZZE_MONEY } from "./constants.js";

export const randomNumber = () => {
  return Math.floor(Math.random() * (LOTTO.MAX + 1 - LOTTO.MIN)) + LOTTO.MIN;
};

export const lottoNumbers = (size = LOTTO.NUM_SIZE) => {
  const lottoNums = new Set();
  while (lottoNums.size < size) {
    lottoNums.add(randomNumber());
  }

  return [...lottoNums];
};

export const getWinningNumbers = (winningInputs) => {
  let winningNums = new Set();

  winningInputs.forEach((input) => {
    winningNums.add(+input.value);
  });

  return [...winningNums];
};

export const getWinningResult = (winningLotto, lottos, winningResult) => {
  lottos.forEach((lotto, i) => {
    const count = winningLotto.reduce((count, winningNumber, i) => {
      if (count === 5 && i === 6) {
        winningResult.BONUS_BALL
          ? (winningResult.BONUS_BALL = winningResult.BONUS_BALL + 1)
          : (winningResult.BONUS_BALL = 1);

        return "BONUS_BALL";
      }
      if (lotto.includes(winningNumber)) count++;

      return count;
    }, 0);
    if (count < 3 || count === "BONUS_BALL") return;

    winningResult[count]
      ? (winningResult[count] = winningResult[count] + 1)
      : (winningResult[count] = 1);
  });

  return winningResult;
};

export const insertProfitResult = (winningResult, price) => {
  let totalPrizeMoney = 0;

  for (const count in winningResult) {
    totalPrizeMoney += PRIZZE_MONEY[count] * winningResult[count];
  }

  return (totalPrizeMoney / price) * 100;
};
