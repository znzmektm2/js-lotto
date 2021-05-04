const { freeze } = Object;

export const PRICE = freeze({
  UNIT: 1000,
  MIN: 1000,
  MAX: 100000,
});

export const LOTTO = freeze({
  MIN: 1,
  MAX: 45,
  NUM_SIZE: 6,
});

export const PRIZZE_MONEY = freeze({
  3: 5000,
  4: 50000,
  5: 1500000,
  6: 2000000000,
  BONUS_BALL: 30000000,
});

export const MSG = freeze({
  INVALID_PRICE_UNIT: `${PRICE.UNIT}원 단위로 금액을 입력해 주세요.`,
  EXCEED_PRICE_RANGE: `${PRICE.UNIT}원 이상 ${PRICE.MAX}원 이하로 입력해 주세요.`,
  INVALID_NUMBERS: "로또에는 중복된 번호를 입력할 수 없습니다.",
});
