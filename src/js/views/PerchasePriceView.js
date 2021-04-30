import { $ } from "../utils/DOM.js";
import View from "./View.js";

export default class PerchasePriceView extends View {
  constructor(element) {
    super(element);
    console.log("PerchasePriceView constructor");
    this.reset();
    this.init();
  }

  reset() {
    this.element.reset();
    $("#priceInput").focus();
  }

  init() {
    this.element.addEventListener("submit", (e) =>
      this.perchasePriceHandler(e)
    );
  }

  perchasePriceHandler(e) {
    e.preventDefault();
    console.log(e.target.elements.priceInput.value);
  }
}
