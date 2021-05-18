import { $ } from "../utils/DOM.js";
import View from "./View.js";

export default class PriceFormView extends View {
  constructor($element) {
    super($element);
    this.$priceInput = $("#priceInput");
  }

  reset() {
    this.$priceInput.value = "";
    this.$priceInput.disabled = false;
    this.$priceInput.focus();
    $("#priceSubmitBtn").disabled = false;
  }
}
