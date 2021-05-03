import { $ } from "../utils/DOM.js";
import PriceFormView from "./../views/PriceFormView.js";
import PurchasedLottosView from "./../views/PurchasedLottosView.js";
import WinningNumbersView from "./../views/WinningNumbersView.js";
import ModalView from "./../views/ModalView.js";
import { PRICE, MSG } from "./../utils/constants.js";
import LottoModel from "./../models/LottoModel.js";
import { isCorrectNumbers } from "../utils/utils.js";

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
      this.$winningNumbersView.reset();
      this.$modalView.reset();
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
    if (!isCorrectNumbers()) return alert(MSG.INVALID_NUMBERS);

    this.winningStatistics();
    this.$modalView.show();
  }

  winningStatistics() {}
}
