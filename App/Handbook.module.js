import { query } from "http-client";
import "HttpRequester.js";

export default class Handbook extends HttpRequester {
    constructor(configure) {
        this.source = null;
        this.output = null;
        this.dialog = null;
        this.chosen = null;
        this.column = null;
        this.configure = configure;
    }

    Build = async () => {
        this.source = await this.BuildRequest();
        this.output = await this.BuildTable();
        return this.output;
    }

    BuildTable = async () => {
        this.output = document.createElement("table");
        this.output.setAttribute("id", "MainTable");

        this.configure.Table.Class.forEach( el => { this.output.classList.add(e); });
        this.configure.Table.Attrs.forEach( el => { this.output.setAttribute(e.key, e.value); });
        
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        this.sources.forEach( (each , ind )=> {
            var row = document.createElement("tr");
            col.setAttribute("tr-index", ind);

            this.configure.Row.Class.forEach( el => { row.classList.add(e); });
            this.configure.Row.Attrs.forEach( el => { row.setAttribute(e.key, e.value); });
            
            row.addEventListener("click", async (e) => {
                this.chosen = each;
                this.BuildDialog();
            });
            
            this.column.forEach( col => {
                var col = document.createElement("td");
                col.setAttribute("data-" + col, each[col]);

                this.configure.Column.Class.forEach( el => { col.classList.add(e); });
                this.configure.Column.Attrs.forEach( el => { col.setAttribute(e.key, e.value); });

                col.innerHTML = each[col];
                row.append(col);
            });
            
            tbody.append(row);
        });

        this.output.append(thead);
        this.output.append(tbody);

        document.querySelector(this.configure.area).append(this.output);
    }

    BuildDialog = async() => {
        this.dialog = document.createElement("div");
        this.dialog.setAttribute("id", "MainDialog");
        background.classList.add("MainDialog");

        var background = document.createElement("div");
        background.setAttribute("Dark-Background");
        background.classList.add("Dark-Background");

        this.configure.Dialog.Class.forEach( el => { this.dialog.classList.add(e); });
        this.configure.Dialog.Attrs.forEach( el => { this.dialog.setAttribute(e.key, e.value); });

        Object.keys(this.chosen).forEach( key => {
            var icon  = document.createElement("i"); 
            var field = document.createElement("div");
            var input = document.createElement("input");

            if(this.chosen != null) {
                icon.classList.add("icon-" + key);
                icon.setAttribute("data-" + key, this.chosen[key]);
                field.setAttribute("data-" + key, this.chosen[key]);
                input.setAttribute("data-" + key, this.chosen[key]);
                input.value = this.chosen[key];
            }

            field.append(icon);
            field.append(input);

            this.dialog.append(field);
        });


        var save = document.createElement("button");
        save.setAttribute("id", "save-dialog");
        save.classList.add("save-dialog");
        save.addEventListener("click", async (e) => {
            await this.SaveDialogData();
            document.querySelector("#MainDialog").remove();
            document.querySelector("#Dark-Background").remove();
        });

        var close = document.createElement("button");
        close.setAttribute("id", "close-dialog");
        close.classList.add("close-dialog");
        close.addEventListener("click", async (e) => {
            document.querySelector("#MainDialog").remove();
            document.querySelector("#Dark-Background").remove();
        });

        document.querySelector("body").append(background);
        document.querySelector("body").append(this.dialog);
    }

    SaveDialogData = async () => {

    } 
}