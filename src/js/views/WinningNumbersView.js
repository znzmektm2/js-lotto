import { $, $All } from "../utils/DOM.js";
import View from "./View.js";

export default class WinningNumbersView extends View {
  constructor($element) {
    console.log("WinningNumbersView constructor");
    super($element);
  }

  reset() {
    this.hide();
    this.$element.reset();
  }
}
