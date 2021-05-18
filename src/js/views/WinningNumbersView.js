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

  insertWinningResult() {
    const winningResult = getWinningResult(
      this.winningNumbers,
      this.lottoModel.lottos,
      this.winningResult
    );

    for (const count in winningResult) {
      $(`#win_${count}`).innerText = winningResult[count] + "개";
    }
  }
}
