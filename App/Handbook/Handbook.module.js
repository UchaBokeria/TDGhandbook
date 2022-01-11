import HttperClient from "../HttperClient.module";

export class Handbooker extends HttperClient {
    constructor() {
        super();
        this.source = null;
        this.output = null;
        this.dialog = null;
        this.chosen = null;
        this.column = {
            id: "+",
            name: "სახელი",
            version: "ვერსია"
        };
    }

    Build = async (configure) => {
        this.configure = configure;
        
        await this.BuildRequest({
            success: async (e) => {
                if(e == null) {
                    console.error(" Handbook Source Data Is Empty ");
                    return;
                }

                this.source = e;
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
        this.configure.Table.Attrs.forEach( e => { this.output.setAttribute(Object.entries(e)[0][0], Object.entries(e)[0][1]); });
        
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        Object.keys(this.column).forEach( col => {
            var colEL = document.createElement("td");
            colEL.setAttribute("col-key", col);
            colEL.innerHTML = this.column[col]; 
            if(col == "id") {
                colEL.addEventListener("click", async (e) => {
                    this.BuildDialog();
                });
            }
            thead.append(colEL);
        });

        this.source.forEach( (each , ind ) => {
            var row = document.createElement("tr");
            row.setAttribute("tr-index", ind);

            this.configure.Row.Class.forEach( e => { row.classList.add(e); });
            this.configure.Row.Attrs.forEach( e => { row.setAttribute(Object.entries(e)[0][0], Object.entries(e)[0][1]); });
            
            row.addEventListener("dblclick", async (e) => {
                this.chosen = each;
                this.BuildDialog();
            });
            
            Object.keys(this.column).forEach( col => {
                var colEL = document.createElement("td");
                colEL.setAttribute("data-" + col, each[col]);

                this.configure.Column.Class.forEach( e => { colEL.classList.add(e); });
                this.configure.Column.Attrs.forEach( e => { colEL.setAttribute(Object.entries(e)[0][0], Object.entries(e)[0][1]); });

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
        if(document.querySelector("#MainDialog") != null)
            document.querySelector("#MainDialog").remove();
            
        this.dialog = document.createElement("div");
        this.dialog.setAttribute("id", "MainDialog");
        this.dialog.classList.add("MainDialog");

        var background = document.createElement("div");
        background.setAttribute("id","Dark-Background");
        background.classList.add("Dark-Background");

        this.configure.Dialog.Class.forEach( e => { this.dialog.classList.add(e); });
        this.configure.Dialog.Attrs.forEach( e => { this.dialog.setAttribute(Object.entries(e)[0][0], Object.entries(e)[0][1]); });

        if(this.chosen == null) 
            this.chosen = Object.entries(this.column).map((e)=>{  return "" });

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
            field.setAttribute("field-row", key);
            this.dialog.append(field);
        });
        
        this.chosen = null;

        var save = document.createElement("button");
        save.setAttribute("id", "save-dialog");
        save.classList.add("save-dialog");
        save.innerHTML = "Save";
        save.addEventListener("click", async (e) => {
            await this.SaveDialogData();
            document.querySelector("#MainDialog").remove();
            document.querySelector("#Dark-Background").remove();
        });

        var close = document.createElement("button");
        close.setAttribute("id", "close-dialog");
        close.classList.add("close-dialog");
        close.innerHTML = "Close";
        close.addEventListener("click", async (e) => {
            document.querySelector("#MainDialog").remove();
            document.querySelector("#Dark-Background").remove();
        });
        
        var buttons = document.createElement("div");
        buttons.setAttribute("id", "Dialog-buttons");
        buttons.append(close);
        buttons.append(save);

        this.dialog.append(buttons);

        document.querySelector("body").append(background);
        document.querySelector("body").append(this.dialog);
    }

    SaveDialogData = async () => {

    } 
}