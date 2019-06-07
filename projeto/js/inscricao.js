class Inscricao {

    constructor(document){
        this._document = document;
        this.query = this._document.querySelectorAll.bind(this._document);
        this._botao = this.query("#submit")[0];
        this._form = this.query("form")[0];
        this._nome = this.query("input[name='nome']")[0];
        this._disponibilidade = this.query("input[name='disponibilidade']")[0].parentElement.parentElement;
        this._selecaoDisponivel = this.query("input[name='disponibilidade']");
        this._interesses = this.query("fieldset[name='interesses']")[0];
        this._email = this.query("input[name='email']")[0];
        this._participacao = this.query("textarea[name='participacao']")[0];

        this._regexp = /^[a-zA-ZâÂãÃçóòáàüẑéèêõÕ\s]*$/;
        this._interesseNumero = {n : 0};

        this._init();
        Object.freeze(this);
    }

    _init(){

        this._nome.valido = false;
        this._disponibilidade.valido = false;
        this._interesses.valido = false;
        this._participacao.valido = false;

        this._nome.addEventListener(
            "input", (event) => {
            let campo = event.target;
            if(this._regexp.test(campo.value) &&
                campo.value.split(/\S+/).length-1 >= 2){
                this._nome.valido = true;
            }
            else{
                this._nome.valido = false;
            }
        });

        this._disponibilidade.addEventListener(
            "input", (event) => {
            let campo = event.target;
            if(campo.value == "personalizar"){
                let disponibilidade = campo.parentElement.
                                        parentElement.querySelector(".input-oculto");
                disponibilidade.required = true;
                if(disponibilidade.value.length == 0){
                    this._disponibilidade.valido = false;
                    return;
                }
            }
            else{
                if(campo.name != "personalizar") {
                    let disponibilidade = campo.parentElement.parentElement.querySelector(".input-oculto");
                    disponibilidade.value = "";
                    disponibilidade.required = false;
                }
            }
            this._disponibilidade.valido = true;
        });

        this._interesses.addEventListener(
            "input", (event) => {
            let campo = event.target;
            let interesse = campo.parentElement.
                                parentElement.querySelector(".input-oculto");
            if(campo.checked){
                this._interesseNumero.n += 1;
            }
            else{
                this._interesseNumero.n -= 1;
            }
            if(campo.value == "outro"){
                if(campo.checked){
                    interesse.required = true;
                }
                else{
                    interesse.value = "";
                    interesse.required = false;
                }
            }
            if(this._interesseNumero.n >= 1 || (interesse.value.length > 0 && interesse.required)) {
                this._interesses.valido = true;
            }
            else {
                this._interesses.valido = false;
            }
        });

        this._participacao.addEventListener(
            "input", (event) => {
            let target = event.target;
            if(target.value.length <= 140){
                this._participacao.valido = false;
            }
            else{
                this._participacao.valido = true;
            }
        });

        this._document.querySelector("form").addEventListener(
            "input", (event) => this.validade(event)
        );

        this._form.addEventListener("any", event => event.preventDefault());
        this._form.addEventListener("submit", event => this.formInvalidoEvento(event));
    }

    formInvalidoEvento(event){
        event.preventDefault();
        let p = $("<p>").text("Favor preencher os campos");
        let modal = $("<div>");
        modal[0].appendChild(p[0]);
        modal.addClass("aviso-preencher");
        modal[0].addEventListener("click", event => {
            let target = event.target;
            if(target.nodeName == 'P'){
                target.parentNode.remove();
            }
            else{
                target.remove();
            }

        });
        this.query('body')[0].appendChild(modal[0]);
    }

    formValidoEvento(event){
        event.preventDefault();
        let nome = this._nome.value;
        let email = this._email.value;
        let disponibilidades = this._selecaoDisponivel;
        let disponibilidade = "";
        disponibilidades.forEach(item => {
            if(item.checked) {
                disponibilidade = item.value;
            }
        });
        let interesses = this._interesses.querySelectorAll("input");
        let interesse = [];
        interesses.forEach(item => {
            if(item.checked){
                interesse.push(item.value);
            }
            else{
                if(item.type == "text"){
                    interesse[interesse.indexOf({"outro": ""})] = {"outro": item.value};
                }
            }
        });
        let participacao = this._participacao.textContent;
        let personalizar = this._disponibilidade.querySelector(".input-oculto").value;

        let dadosInscricao = new DadosInscricao(nome, email, disponibilidade,
            interesse, participacao, personalizar);

        this._form.reset();

        console.log(dadosInscricao);
    }


    validade(event){

        let valid = this._nome.valido &&
            this._disponibilidade.valido &&
            this._interesses.valido &&
            this._participacao.valido &&
            this._email.validity.valid;

        if(valid){
            if(!this._botao.classList.contains("botao-enviar-ativado")) {
                this._botao.classList.add("botao-enviar-ativado");
                this._form.removeEventListener('submit', this.formInvalidoEvento);
                this._form.addEventListener("submit", event => this.formValidoEvento(event));
            }
        }
        else{
            if(this._botao.classList.contains("botao-enviar-ativado")){
                this._botao.classList.remove("botao-enviar-ativado");
                this._form.removeEventListener('submit', this.formValidoEvento);
                this._form.addEventListener("submit", event => this.formInvalidoEvento(event));
            }
        }
    }

}



