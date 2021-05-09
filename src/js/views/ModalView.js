import { $, $All } from "../utils/DOM.js";
import View from "./View.js";

export default class ModalView extends View {
  constructor($element, result) {
    super($element);
    this.result = result;
  }

  reset(result) {
    this.hide();
    setTimeout(() => {
      for (const count in result) {
        $(`#win_${count}`).innerText = "0개";
      }
    }, 250);
  }
}
