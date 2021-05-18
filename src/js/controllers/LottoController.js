import { $, $winningInputs } from "../utils/DOM.js";
import PriceFormView from "./../views/PriceFormView.js";
import PurchasedLottosView from "./../views/PurchasedLottosView.js";
import WinningNumbersView from "./../views/WinningNumbersView.js";
import ModalView from "./../views/ModalView.js";
import { PRICE, MSG } from "./../utils/constants.js";
import LottoModel from "./../models/LottoModel.js";
import { isValidWinningNumbers } from "../utils/utils.js";

export default class LottoController {
  constructor() {
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

    this.$winningNumbersView.on("submit", (e) => {
      e.preventDefault();
      this.submitWinningNubmers();
    });

    $("#retryBtn").addEventListener("click", () => {
      this.$priceFormView.reset();
      this.$purchasedLottosView.reset();
      this.$winningNumbersView.reset();
      this.$modalView.reset();
      this.price = 0;
    });
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
    this.$purchasedLottosView.renderLottoLists(this.lottoModel.lottos);
    this.$purchasedLottosView.show();
    this.$winningNumbersView.show();
  }

  submitWinningNubmers() {
    const isSubmitted = $("#winningNumbersWrap input").disabled;

    if (isSubmitted === false) {
      if (isValidWinningNumbers($winningInputs))
        return alert(MSG.INVALID_NUMBERS);

      this.$modalView.renderWinningResult(
        $winningInputs,
        this.lottoModel.lottos,
        this.price
      );

      $winningInputs.forEach((input) => {
        input.disabled = true;
      });
    }

    this.$modalView.show();
  }
}
