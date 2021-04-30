import { $ } from "../utils/DOM.js";
import PerchasePriceView from "./../views/PerchasePriceView.js";
import PurchasedLottosView from "./../views/PurchasedLottosView.js";

export default class LottoController {
  constructor() {
    this.PerchasePriceView = new PerchasePriceView($("#perchasePriceWrap"));
    this.PurchasedLottosView = new PurchasedLottosView(
      $("#perchasedLottosWrap")
    );
    // this.winningNumbersView = new InputWinningNumberView(
    //   $("#winningNumbersWrap")
    // );
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.PerchasePriceView.on("submit", (e) => {
      this.renderPerchasePrice();
    });
  }

  renderPerchasePrice() {
    this.PurchasedLottosView.show();
  }
}
