import { Lodash } from "lodash";
import { Http } from "./HttperClient.module";
import { Handbook } from "./Handbook.module";
import { ReactiveSearch } from "./ReactiveSearch.module";

async function component() {
  var element = document.createElement('div');
  element.innerHTML = "halo";
  document.body.appendChild(element);
}


async function doit() {
  var table = document.createElement('div');

  table.setAttribute("id", "poTable");
  document.body.appendChild(table);

  new ReactiveSearch();
  
  new Handbook().Build({
    Area: "#poTable",
    Table:  {
      Class: ["Table-oo"],
      Attrs: [{title: "Table"}],
    },
    Row:  {
      Class: ["Row-oo"],
      Attrs: [{title: "Row"}],
    },
    Column: {
      Class: ["Column-oo"],
      Attrs: [{title: "Column"}],
    },
    Dialog: {
      Class: ["dialog-oo"],
      Attrs: [{title: "dialog"}],
    }
  });

  return table;
}

component()
doit();