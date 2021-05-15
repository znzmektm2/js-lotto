import { $, $All } from "../utils/DOM.js";
import PriceFormView from "./../views/PriceFormView.js";
import PurchasedLottosView from "./../views/PurchasedLottosView.js";
import WinningNumbersView from "./../views/WinningNumbersView.js";
import ModalView from "./../views/ModalView.js";
import { PRICE, MSG } from "./../utils/constants.js";
import LottoModel from "./../models/LottoModel.js";
import {
  insertProfitResult,
  getWinningResult,
  getWinningNumbers,
} from "../utils/utils.js";

export default class LottoController {
  constructor() {
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
      this.winningResult = {};
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
    this.winningNumbers = getWinningNumbers(this.winningInputs);

    if (this.winningNumbers.length !== this.winningInputs.length)
      return alert(MSG.INVALID_NUMBERS);
    this.$modalView.show();

    if (!!this.isChecked) return;

    this.winningInputs.forEach((input) => {
      input.disabled = true;
    });
    this.insertWinningResult();
    $("#profit").innerText = insertProfitResult(this.winningResult, this.price);
    this.isChecked = true;
  }

  insertWinningResult() {
    const winningResult = getWinningResult(
      this.winningNumbers,
      this.lottoModel.lottos,
      this.winningResult
    );

    for (const count in winningResult) {
      $(`#win_${count}`).innerText = winningResult[count] + "개";
    }
  }
}
