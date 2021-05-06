import { $, $All } from "../utils/DOM.js";
import PriceFormView from "./../views/PriceFormView.js";
import PurchasedLottosView from "./../views/PurchasedLottosView.js";
import WinningNumbersView from "./../views/WinningNumbersView.js";
import ModalView from "./../views/ModalView.js";
import { PRICE, MSG } from "./../utils/constants.js";
import LottoModel from "./../models/LottoModel.js";
import { winningNumbers } from "../utils/utils.js";

export default class LottoController {
  constructor() {
    console.log("LottoController constructor");
    this.$priceFormView = new PriceFormView($("#priceFormWrap"));
    this.$purchasedLottosView = new PurchasedLottosView(
      $("#perchasedLottosWrap")
    );
    this.$winningNumbersView = new WinningNumbersView($("#winningNumbersWrap"));
    this.$modalView = new ModalView($("#modalWrap"));
    this.lottoModel = new LottoModel();
    this.winningInputs = $All("#winningNumbersWrap input");
    this.result = {};
    this.isChecked = false;
    this.bindEvents();
  }

  bindEvents() {
    this.$priceFormView.on("submit", (e) => {
      e.preventDefault();
      this.submitPrice(e);
    });

    $("#switchInput").addEventListener("click", () => {
      this.viewLottosNumbers($("#switchInput").checked);
    });

    this.$winningNumbersView.on("submit", (e) => {
      e.preventDefault();
      this.submitWinningNubmers();
    });

    $(".modal-close").addEventListener("click", () => {
      this.$modalView.hide();
    });

    $("#retryBtn").addEventListener("click", () => {
      this.$priceFormView.reset();
      this.$purchasedLottosView.reset();
      this.$winningNumbersView.reset(this.winningInputs);
      this.$modalView.reset(this.result);
      this.result = {}
      this.isChecked = false;
    });
  }

  viewLottosNumbers(isChecked) {
    isChecked === true
      ? $(".lottoNumberLists").classList.add("showLottoNumbers")
      : $(".lottoNumberLists").classList.remove("showLottoNumbers");
  }

  submitPrice(e) {
    const price = +e.target.elements.priceInput.value;

    if (price > PRICE.MAX || price < PRICE.UNIT)
      return alert(MSG.EXCEED_PRICE_RANGE);

    if (price % PRICE.UNIT !== 0) return alert(MSG.INVALID_PRICE_UNIT);

    e.target.elements.priceInput.disabled = true;
    e.target.elements.priceSubmitBtn.disabled = true;
    this.lottoModel.lottos = price;
    this.$purchasedLottosView.update(this.lottoModel.lottos);
    this.$purchasedLottosView.show();
    this.$winningNumbersView.show();
  }

  submitWinningNubmers() {
    this.winningNumbers = winningNumbers(this.winningInputs);

    if (this.winningNumbers.length !== this.winningInputs.length)
      return alert(MSG.INVALID_NUMBERS);

    this.winningInputs.forEach((input) => {
      input.disabled = true;
    });
    this.winningResult();
    this.$modalView.show();
  }

  winningResult() {
    const winningLotto = this.winningNumbers;
    const lottos = this.lottoModel.lottos;
    let result = this.result;

    if (!!this.isChecked) return;

    lottos.forEach((lotto, i) => {
      const count = winningLotto.reduce((count, winningNumber, i) => {
        if (count === 5 && i === 6) {
          result.BONUS_BALL
              ? (result.BONUS_BALL = result.BONUS_BALL + 1)
              : (result.BONUS_BALL = 1);

          return "BONUS_BALL";
        }
        if (lotto.includes(winningNumber)) count++;

        return count;
      }, 0);

      if (count < 3 || count === "BONUS_BALL") return;

      result[count] ? (result[count] = result[count] + 1) : (result[count] = 1);
    });

    for (const count in result) {
      $(`#win_${count}`).innerText = result[count]+'개';
    }

    this.isChecked = true;
    console.log("result", result);
  }
}
