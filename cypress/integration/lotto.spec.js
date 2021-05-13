import { MSG } from "../../src/js/utils/constants.js";
import { lottoNumbers } from "./../../src/js/utils/utils.js";
import { PRIZZE_MONEY } from "./../../src/js/utils/constants.js";

describe("로또 테스트", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  const submitPrice = ({ price }) => {
    cy.get("#priceInput").type(price);
    cy.get("#priceFormWrap").submit();
  };

  const alertMessage = (msg) => {
    cy.on("window:alert", (str) => {
      expect(str).to.equal(msg);
    });
  };

  context(
    "로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.",
    () => {
      it("5000원을 입력하면 5개의 로또를 발급한다. ", () => {
        const lottoCount = 5;
        submitPrice({ price: lottoCount * 1000 });
        cy.get("#perchasedLottosWrap").should("be.visible");
        cy.get("#total").should("have.text", lottoCount);
        cy.get(".lottoNumbers").should("have.length", lottoCount);
      });
    }
  );

  context("로또 1장의 가격은 1,000원이다.", () => {
    it("처음 화면은 구입할 금액 폼만 존재한다. ", () => {
      cy.get("#priceFormWrap").should("be.visible");
      cy.get("#perchasedLottosWrap").should("not.be.visible");
      cy.get("#winningNumbersWrap").should("not.be.visible");
      cy.get("#modalWrap").should("not.be.visible");
    });

    it("아무것도 입력하지 않으면 유효범위에 대한 알럿창이 떠야 한다.", () => {
      cy.get("#priceFormWrap").submit();
      alertMessage(MSG.EXCEED_PRICE_RANGE);
    });

    it("0원 입력한 경우, 유효범위에 대한 알럿창이 떠야 한다.", () => {
      submitPrice({ price: 0 });
      alertMessage(MSG.EXCEED_PRICE_RANGE);
    });

    it("999원 입력한 경우, 유효범위에 대한 알럿창이 떠야 한다.", () => {
      submitPrice({ price: 999 });
      alertMessage(MSG.EXCEED_PRICE_RANGE);
    });

    it("100001원 입력한 경우, 유효범위에 대한 알럿창이 떠야 한다.", () => {
      submitPrice({ price: 100001 });
      alertMessage(MSG.EXCEED_PRICE_RANGE);
    });

    it("-1000원 입력한 경우, 유효범위에 대한 알럿창이 떠야 한다.", () => {
      submitPrice({ price: -1000 });
      alertMessage(MSG.EXCEED_PRICE_RANGE);
    });

    it("1500원 입력한 경우, 유효한 단위에 대한 알럿창이 떠야 한다.", () => {
      submitPrice({ price: 1500 });
      alertMessage(MSG.INVALID_PRICE_UNIT);
    });

    it("1000원 입력한 경우, 구매한 내용과 당첨번호 입력폼이 보여야 한다.", () => {
      submitPrice({ price: 1000 });
      cy.get("#perchasedLottosWrap").should("be.visible");
      cy.get("#winningNumbersWrap").should("be.visible");
    });

    it("50000원 입력한 경우, 구매한 내용과 당첨번호 입력폼이 보여야 한다.", () => {
      submitPrice({ price: 50000 });
      cy.get("#perchasedLottosWrap").should("be.visible");
      cy.get("#winningNumbersWrap").should("be.visible");
    });
  });

  it("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
    cy.get(".lottoNumbers > span").should("not.exist");

    submitPrice({ price: 10000 });
    cy.get(".switch").click();
    cy.get(".lottoNumbers > span").should("be.visible");
  });

  it("결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.", () => {
    const price = 5000;
    const winningLotto = new Set();
    const lottos = [];
    const winningResult = {};
    let count = 1;
    let totalPrizeMoney = 0;

    submitPrice({ price: price });
    cy.get(".lottoNumbers span")
      .each((lottoNumber, i) => {
        cy.wrap(lottoNumber)
          .invoke("text")
          .then((lottoNumberText) => {
            const lottoNumtxt = lottoNumberText.split(", ").map((v) => +v);
            lottos.push([...lottoNumtxt]);
          });
      })
      .then(() => {
        lottos[0].forEach((v) => {
          winningLotto.add(v);
        });
        while (winningLotto.size < 8) {
          winningLotto.add(count++);
        }
      });
    cy.get("#winningNumbersWrap input").each((winningNumber, i) => {
      cy.wrap(winningNumber).type([...winningLotto][i]);
    });
    cy.get("#winningNumbersWrap")
      .submit()
      .then(() => {
        lottos.forEach((lotto, i) => {
          const count = [...winningLotto].reduce((count, winningNumber, i) => {
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

        for (const count in winningResult) {
          cy.get(`#win_${count}`).should(
            "have.text",
            winningResult[count] + "개"
          );
        }

        //
        for (const count in winningResult) {
          totalPrizeMoney += PRIZZE_MONEY[count] * winningResult[count];
        }

        cy.get("#profit").should("have.text", (totalPrizeMoney / price) * 100);
        console.log(
          "winningResult",
          winningResult,
          (totalPrizeMoney / price) * 100
        );
      });
  });

  // context("로또 당첨 금액은 고정되어 있는 것으로 가정한다.", () => {
  //   it("", () => {});
  // });

  it("다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.", () => {
    submitPrice({ price: 5000 });
    cy.get("#winningNumbersWrap input").each((winningNumber, i, arr) => {
      cy.wrap(winningNumber).type(lottoNumbers(arr.length)[i]);
    });

    cy.get("#winningNumbersWrap").submit();
    cy.get("#modalWrap").should("be.visible");
    cy.get("#retryBtn").click();
    cy.get("#priceInput").should("have.value", "");
    cy.get("#perchasedLottosWrap").should("not.be.visible");
    cy.get("#winningNumbersWrap").should("not.be.visible");
    cy.get("#winningNumbersWrap input").each((winningNumber) => {
      cy.wrap(winningNumber).should("have.value", "");
    });
  });
});
