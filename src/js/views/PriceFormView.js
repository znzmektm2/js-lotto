import { $ } from "../utils/DOM.js";
import View from "./View.js";

export default class PriceFormView extends View {
  constructor($element) {
    console.log("PriceFormView constructor");
    super($element);
    this.reset();
  }

  reset() {
    this.$element.reset();
    $("#priceInput").disabled = false;
    $("#priceSubmitBtn").disabled = false;
    $("#priceInput").focus();
  }
}
