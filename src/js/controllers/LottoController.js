import { $, $All } from "../utils/DOM.js";
import PriceFormView from "./../views/PriceFormView.js";
import PurchasedLottosView from "./../views/PurchasedLottosView.js";
import WinningNumbersView from "./../views/WinningNumbersView.js";
import ModalView from "./../views/ModalView.js";
import { PRICE, MSG , PRIZZE_MONEY} from "./../utils/constants.js";
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
    this.winningResult = {};
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
      this.$modalView.reset(this.winningResult);
      this.price = 0;
      this.winningResult = {}
      this.isChecked = false;
    });
  }

  viewLottosNumbers(isChecked) {
    isChecked === true
      ? $(".lottoNumberLists").classList.add("showLottoNumbers")
      : $(".lottoNumberLists").classList.remove("showLottoNumbers");
  }

  submitPrice(e) {
    this.price = +e.target.elements.priceInput.value;
    const price = this.price;

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
    this.$modalView.show();

    if (!!this.isChecked) return;

    this.winningInputs.forEach((input) => {
      input.disabled = true;
    });
    this.insertWinningResult();
    this.insertProfitResult();

    this.isChecked = true;
  }


  insertWinningResult() {
    const winningLotto = this.winningNumbers;

    const lottos = this.lottoModel.lottos;

    let winningResult = this.winningResult;
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

      winningResult[count] ? (winningResult[count] = winningResult[count] + 1) : (winningResult[count] = 1);

    });
    for (const count in winningResult) {
      $(`#win_${count}`).innerText = winningResult[count]+'개';

    }
    console.log("winningResult", winningResult);
  }

  insertProfitResult() {
    let totalPrizeMoney = 0;
    const winningResult = this.winningResult;

    for (const count in winningResult) {
      totalPrizeMoney += PRIZZE_MONEY[count] * winningResult[count];
      console.log('RIZZE_MONEY[count]:',PRIZZE_MONEY[count], 'winningResult[count]:', winningResult[count])
      console.log('totalPrizeMoney',totalPrizeMoney)
    }

    console.log('profit:', totalPrizeMoney / this.price * 100)

    $('#profit').innerText = totalPrizeMoney / this.price * 100;
  }

}
