import HttperClient from "./HttperClient.module";

export class Handbook extends HttperClient {
    constructor() {
        super();
        this.source = null;
        this.output = null;
        this.dialog = null;
        this.chosen = null;
        this.column = {
            id: "#",
            name: "სახელი",
            version: "ვერსია"
        };
    }

    Build = async (configure) => {
        this.configure = configure;
        this.source = await this.BuildRequest({
            success: async (e) => {
                this.source = e;
                if(this.source == null) return null;
                this.output = await this.BuildTable();
                return this.output;
            }
        });
    }

    BuildTable = async () => {
        console.log(this.source)
        document.querySelector(this.configure.Area).innerHTML = "";

        this.output = document.createElement("table");
        this.output.setAttribute("id", "MainTable");

        this.configure.Table.Class.forEach( e => { this.output.classList.add(e); });
        this.configure.Table.Attrs.forEach( e => { this.output.setAttribute(e.key, e.value); });
        
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        Object.keys(this.column).forEach( col => {
            var colEL = document.createElement("td");
            colEL.setAttribute("col-key", this.column[col]);
            colEL.innerHTML = this.column[col]; 
            thead.append(colEL);
        });

        this.source.forEach( (each , ind ) => {
            var row = document.createElement("tr");
            row.setAttribute("tr-index", ind);

            this.configure.Row.Class.forEach( e => { row.classList.add(e); });
            this.configure.Row.Attrs.forEach( e => { row.setAttribute(e.key, e.value); });
            
            row.addEventListener("dblclick", async (e) => {
                this.chosen = each;
                this.BuildDialog();
            });
            
            Object.keys(this.column).forEach( col => {
                var colEL = document.createElement("td");
                colEL.setAttribute("data-" + col, each[col]);

                this.configure.Column.Class.forEach( e => { colEL.classList.add(e); });
                this.configure.Column.Attrs.forEach( e => { colEL.setAttribute(e.key, e.value); });

                colEL.innerHTML = each[col]; 
                colEL.setAttribute("col-key", col);

                row.append(colEL);
            });
            
            tbody.append(row);
        });

        this.output.append(thead);
        this.output.append(tbody);
        document.querySelector(this.configure.Area).append(this.output);
    }

    BuildDialog = async() => {
        this.dialog = document.createElement("div");
        this.dialog.setAttribute("id", "MainDialog");
        this.dialog.classList.add("MainDialog");

        var background = document.createElement("div");
        background.setAttribute("id","Dark-Background");
        background.classList.add("Dark-Background");

        this.configure.Dialog.Class.forEach( e => { this.dialog.classList.add(e); });
        this.configure.Dialog.Attrs.forEach( e => { this.dialog.setAttribute(e.key, e.value); });

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