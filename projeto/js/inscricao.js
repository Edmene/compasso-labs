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
        this._regexpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        this._interesseNumero = {n: 0};
        this._valido = {valid: false};

        this._init();
        Object.freeze(this);
    }

    get valid(){
        new Object(this._valido);
    }

    _init(){

        this._nome.valido = false;
        this._email.valido = false;
        this._nome.classList.add("campo-focus");
        this._disponibilidade.valido = false;
        this._interesses.valido = false;
        this._participacao.valido = false;

        this.adicionaFocus(this._nome);
        this.adicionaFocus(this._participacao);
        this.adicionaFocus(this._email);

        this._email.addEventListener(
            "input", (event) => {
                let campo = event.target;
                campo.classList.remove("campo-focus");
                if(this._regexpEmail.test(campo.value)){
                    this._email.valido = true;
                    if(this._email.classList.contains("campo-invalido")){
                        this._email.classList.remove("campo-invalido");
                        this._email.classList.add("campo-valido");
                    }
                }
                else{
                    if(!this._email.classList.contains("campo-invalido")){
                        this._email.classList.add("campo-invalido");
                        this._email.classList.remove("campo-valido");
                    }
                    this._email.valido = false;
                }
            }
        )
        

        this._nome.addEventListener(
            "input", (event) => {
            let campo = event.target;
            if(campo.value.length == 0){
                campo.classList.add("campo-focus");
            }
            else{
                campo.classList.remove("campo-focus");
            }
            if(this._regexp.test(campo.value) &&
                campo.value.split(/\S+/).length-1 >= 2){
                this._nome.valido = true;
                if(this._nome.classList.contains("campo-invalido")){
                    this._nome.classList.remove("campo-invalido");
                    this._nome.classList.add("campo-valido");
                }
            }
            else{
                if(!this._nome.classList.contains("campo-invalido")){
                    this._nome.classList.add("campo-invalido");
                    this._nome.classList.remove("campo-valido");
                }
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
            let campo = event.target;
            if(campo.value.length == 0){
                campo.classList.add("campo-focus");
            }
            else{
                campo.classList.remove("campo-focus");
            }
            if(campo.value.length <= 140){
                this._participacao.valido = false;
                if(!this._participacao.classList.contains("campo-invalido")){
                    this._participacao.classList.add("campo-invalido");
                    this._participacao.classList.remove("campo-valido");
                }
            }
            else{
                this._participacao.valido = true;
                if(this._participacao.classList.contains("campo-invalido")){
                    this._participacao.classList.remove("campo-invalido");
                    this._participacao.classList.add("campo-valido");
                }
            }
        });

        this._document.querySelector("form").addEventListener(
            "input", (event) => {this.validade(event)}
        );

        form.addEventListener("submit", event => this.formValidoEvento(event));
    }

    formConfirmacao(dados){
        this._form.remove();
        this.query(".container-form p")[0].remove()

        let confirmacao = $("<div>");
        let p = $("<p>").text(`Inscrição enviada. Aguarde detalhes em seu e-mail ${dados.email}`);
        let a = $("<a>");
        a[0].innerText = "fazer outra inscrição";
        a[0].href = "inscricao.html";
        
        confirmacao[0].appendChild(p[0]);
        confirmacao[0].appendChild(a[0]);
        confirmacao.addClass("confirmacao");        
        this.query('.container-form')[0].appendChild(confirmacao[0]);
        
    }

    formValidoEvento(event){
        event.preventDefault();
        if(this._valido.valid){

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
                if(item.checked && item.value != "outro"){
                    interesse.push(item.value);
                }
                else{
                    if(item.type == "text"){
                        interesse.push({"outro": item.value});
                    }
                }
            });
            let participacao = this._participacao.value;
            let personalizar = this._disponibilidade.querySelector(".input-oculto").value;

            let dadosInscricao = new DadosInscricao(nome, email, disponibilidade,
                interesse, participacao, personalizar);

            this._form.reset();
            this._interesseNumero.n = 0;            

            let inscricaoJson = JSON.stringify(dadosInscricao);
            console.log(inscricaoJson);            
            fetch("http://inscricao", 
                {
                    headers: {
                        "Content-type": "application/json"
                    }, 
                    method: "post",
                    body: inscricaoJson
                }
            )
            .catch(erro => console.log(erro));
            this.formConfirmacao(dadosInscricao);
        }
    }

    adicionaFocus(elemento){
        elemento.addEventListener('focus', event => {
            if(!event.target.classList.contains("campo-valido") &&
            !event.target.classList.contains("campo-invalido")){
                event.target.classList.add("campo-focus");
            }
            else{
                event.target.classList.remove("campo-focus");
            }            
        });

        elemento.addEventListener('focusout', () => elemento.classList.remove("campo-focus"));
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
            }
        }
        else{
            if(this._botao.classList.contains("botao-enviar-ativado")){
                this._botao.classList.remove("botao-enviar-ativado");
            }
        }
        this._valido.valid = valid;
    }

}



