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

export const PRIZE_MONEY = freeze([
  freeze({ 3: "5,000" }),
  freeze({ 4: "50,000" }),
  freeze({ 5: "1,500,000" }),
  freeze({ BONUS_BALL: "30,000,000" }),
  freeze({ 6: "2,000,000,000" }),
]);

export const MSG = freeze({
  INVALID_PRICE_UNIT: `${PRICE.UNIT}원 단위로 금액을 입력해 주세요.`,
  EXCEED_PRICE_RANGE: `${PRICE.UNIT}원 이상 ${PRICE.MAX}원 이하로 입력해 주세요.`,
  INVALID_NUMBERS: "로또에는 중복된 번호를 입력할 수 없습니다.",
});
