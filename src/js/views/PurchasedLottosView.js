import { $, $All } from "../utils/DOM.js";
import View from "./View.js";

export default class PurchasedLottosView extends View {
  constructor(element) {
    super(element);
    console.log("PurchasedLottosView constructor");
    this.switchInput = $("#switchInput");
    this.init();
  }

  reset() {
    $("#total").innerText = "";
    this.switchInput.checked = false;
  }

  init() {
    this.switchBtnHandler();
  }

  switchBtnHandler() {
    this.switchInput.addEventListener("click", () => {
      this.viewLottosNumbers(this.switchInput.checked);
    });
  }

  viewLottosNumbers(isChecked) {
    isChecked === true
      ? $All(".lottoNumbers").forEach((e) => {
          e.style.display = "inline";
        })
      : $All(".lottoNumbers").forEach((e) => {
          e.style.display = "none";
        });
  }
}
