import { LOTTO, PRIZE_MONEY } from "./constants.js";

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

export const isValidWinningNumbers = (winningInputs) => {
  const winningNums = new Set();

  winningInputs.forEach((input) => {
    if (input.value == "") return;
    winningNums.add(+input.value);
  });

  return winningNums.size !== winningInputs.length;
};

export const getWinningNumberArr = (winningInputs) => {
  const winningNums = new Set();

  winningInputs.forEach((input) => {
    winningNums.add(+input.value);
  });

  return [...winningNums];
};

export const getWinningResult = (winningNumsArr, lottos) => {
  const obj = {};
  const winningResultArr = [];

  lottos.forEach((lotto, i) => {
    const rank = winningNumsArr.reduce((count, winningNumber, i) => {
      if (count === 5 && i === 6) {
        obj.BONUS_BALL
          ? (obj.BONUS_BALL = obj.BONUS_BALL + 1)
          : (obj.BONUS_BALL = 1);

        return "BONUS_BALL";
      }
      if (lotto.includes(winningNumber)) count++;

      return count;
    }, 0);

    if (rank < 3 || rank === "BONUS_BALL") return;

    obj[rank] ? (obj[rank] = obj[rank] + 1) : (obj[rank] = 1);
  });

  for (const winningRank in obj) {
    winningResultArr.push({ [winningRank]: obj[winningRank] });
  }

  return winningResultArr;
};

export const insertProfitResult = (winningResultArr, price) => {
  let totalPrizeMoney = 0;

  PRIZE_MONEY.forEach((prizeRank) => {
    winningResultArr.forEach((winningRank) => {
      if (Object.keys(prizeRank).join() === Object.keys(winningRank).join()) {
        totalPrizeMoney +=
          +prizeRank[Object.keys(prizeRank)].split(",").join("") *
          winningRank[Object.keys(winningRank)];
      }
    });
  });

  return (totalPrizeMoney / price) * 100;
};
