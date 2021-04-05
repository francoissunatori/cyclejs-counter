import { run } from "@cycle/run";
import { makeDOMDriver, div, button } from "@cycle/dom";
import xs from "xstream";

function main(sources) {
  const add$ = sources.DOM.select(".add")
    .events("click")
    .map((ev) => 1);

  const sub$ = sources.DOM.select(".sub")
    .events("click")
    .map((ev) => -1);

  const count$ = xs
    .merge(add$, sub$)
    .fold((total, change) => total + change, 0);

  return {
    DOM: count$.map((count) =>
      div(".counter", [
        "Count: " + count,
        button(".add", "Add"),
        button(".sub", "Sub")
      ])
    )
  };
}

const drivers = {
  DOM: makeDOMDriver(".app")
};

// Normally you need to call run, but Tricycle handles that for you!
// If you want to try this out locally, just uncomment this code.
//
run(main, drivers);
