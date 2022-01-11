import "./Handbook.scss";
import { HandbookModule } from "./Handbook.module";

export var Handbook = async() => {
    var table = document.createElement('div');
  
    table.setAttribute("id", "poTable");
    document.body.appendChild(table);
    
    new HandbookModule().Build({
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
        Attrs: [{name: "dialog"}],
      }
    });
  
    
}