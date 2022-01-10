
import "./App.scss";
import { Lodash } from "lodash";
import { Http } from "./HttperClient.module";
import { Handbook } from "./Handbook.module";
import { ReactiveSearch } from "./ReactiveSearch.module";

// document.querySelector('body').style.background = "url(Logo.gif) no-repeat";
// document.querySelector('body').style.backgroundSize = "100% 100%";

async function CreateTable() {
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

CreateTable();