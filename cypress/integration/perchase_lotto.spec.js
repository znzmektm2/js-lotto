describe("로또 구입 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  // context(
  //   "로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.",
  //   () => {
  //     it("로또를 구입하기 전에는 구입할 금액 입력폼만 보인다. ", () => {
  //       cy.get("#perchasePriceWrap").should("be.visible");
  //       cy.get("#perchasedLottoWrap").should("not.be.visible");
  //       cy.get("#winningNumbersWrap").should("not.be.visible");
  //     });

  //     () => {
  //       it("", () => {});
  //     };
  //   }
  // );

  context("로또 1장의 가격은 1,000원이다.", () => {
    it("처음 화면은 구입할 금액 폼만 존재한다. ", () => {
      cy.get("#perchasePriceWrap").should("be.visible");
      cy.get("#perchasedLottoWrap").should("not.be.visible");
      cy.get("#winningNumbersWrap").should("not.be.visible");
    });
  });

  // context("소비자는 자동 구매를 할 수 있어야 한다.", () => {
  //   it("", () => {});
  // });

  // context(
  //   "복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.",
  //   () => {
  //     it("", () => {});
  //   }
  // );
});
