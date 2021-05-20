import { $All } from "../utils/DOM.js";
import { getWinningResult } from "../utils/utils.js";
import View from "./View.js";

export default class WinningNumbersView extends View {
  constructor($element) {
    super($element);
    this.winningInputs = $All("#winningNumbersWrap input");
  }

  reset() {
    this.hide();
    this.winningInputs.forEach((input) => {
      input.disabled = false;
      input.value = "";
    });
  }
}
