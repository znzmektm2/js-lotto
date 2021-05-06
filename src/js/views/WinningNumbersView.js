import { $, $All } from "../utils/DOM.js";
import View from "./View.js";

export default class WinningNumbersView extends View {
  constructor($element) {
    console.log("WinningNumbersView constructor");
    super($element);
  }

  reset(winningInputs) {
    this.hide();
    this.$element.reset()
    winningInputs.forEach((input) => {
      input.disabled = false;
    });
  }
}
