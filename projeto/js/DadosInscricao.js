class DadosInscricao {
    constructor(nome, email, disponibilidade, interesses, participacao, personalizar){
        this._nome = nome;
        this._email = email;
        this._disponibilidade = disponibilidade;
        this._interesses = interesses;
        this._participacao = participacao;
        this._personalizar = personalizar;
        Object.freeze(this);
    }

    get nome(){
        return this._nome;
    }

    get email(){
        return this._email;
    }

    get disponibilidade(){
        return this._disponibilidade;
    }

    get interesses(){
        return [].concat(this._interesses);
    }

    get participacao(){
        return this._participacao;
    }

    get extras(){
        return new Object(this._personalizar);
    }

}