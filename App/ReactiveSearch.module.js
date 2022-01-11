
export default class ReactiveSearchModule {
    constructor(source) {
        this.keyUpWord = null;
        this.suggestions = null;
        this.searchContainer = null;
        this.suggestionsShow = false;
        this.source = source;
        this.Build();
    }

    Build = async () => {
        this.searchContainer = document.createElement("div");
        var inputContainer = document.createElement("div");

        var input = document.createElement("input");
        var icon = document.createElement("i");
        
        input.addEventListener("keypress", async(e) => {
            console.log(e);
            this.keyUpWord = e.target.value;
            console.log(e.target.value);
            await this.Search();
        });
        input.setAttribute("type","text");

        inputContainer.append(input);
        inputContainer.append(icon);
        this.searchContainer.append(inputContainer);

        var Searchy = document.createElement('div');
        Searchy.setAttribute("id", "Searchy");
        Searchy.append(this.searchContainer);
        document.body.appendChild(Searchy);

        return this.searchContainer;
    }

    BuildSuggestions = async () => {
        var suggestionContainer = document.createElement("div");
        this.suggestionsShow = true;
        
        this.suggestions.forEach( async(e) => {
            var suggest = document.createElement("div");
            suggest.innerHTML = e.name;
            suggestionContainer.append(suggest);
        });

        this.searchContainer.append(this.suggestionContainer);
        return this.suggestionContainer;
    }

    Search = async() => {
        this.suggestions = this.source;
        await this.BuildSuggestions();

    }
}