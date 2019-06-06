function confirmaValidade(){
    let botao = $("#submit")[0];

   if(ehNomeValido  && ehEmailValido && ehParticipacaoValido &&
     ehDisponibilidadeValido && ehInteressesValido){
        botao.classList.add("botao-enviar-ativado");
     }
     else{
         if(botao.classList.contains("botao-enviar-ativado")){
            botao.classList.remove("botao-enviar-ativado");
         }
     }

     console.log(ehNomeValido  && ehEmailValido && ehParticipacaoValido &&
        ehDisponibilidadeValido && ehInteressesValido);
};
 
        let nome = $("input[name='nome']");
        let email = $("input[name='email']");
        let disponibilidade = $("input[name='disponibilidade']");
        let personalizar = $("input[name='personalizar']");
        let interesses = $("fieldset[name='interesses']").children().find('input');
        let participacao = $("textarea[name='participacao']");

        let interessesNumero = 0;

        let ehNomeValido = false;
        let ehEmailValido = false;
        let ehDisponibilidadeValido = false;
        let ehInteressesValido = false;
        let ehParticipacaoValido = false;
        
        let submitDisponivel = false;
        let regexp = /^[a-zA-Z\s]*$/;

        $(nome).keypress((event) => {            
            let campo = event.target;
            console.log(campo.value);
            console.log(regexp.test(campo.value));
            if(regexp.test(campo.value) &&
            campo.value.split(/\S+/).length-1 >= 2){
                ehNomeValido = true;
            }
            else{
                ehNomeValido = false;
            }
            confirmaValidade()
        });

        $(email).keypress((event) => {
            let campo = event.target;
            ehEmailValido = campo.validity.valid;
            confirmaValidade()
        });

        $(disponibilidade).change((event) => {
            let campo = event.target;            
            if(campo.value == "personalizar"){
                let disponibilidade = $("input[name='personalizar']")[0];
                disponibilidade.required = true;
                if(disponibilidade.value.length == 0){
                    ehDisponibilidadeValido = false;
                    confirmaValidade();
                    return;
                }                
            }
            else{
                let disponibilidade = $("input[name='personalizar']")[0];
                disponibilidade.value = "";
                disponibilidade.required = false;
            }            
            ehDisponibilidadeValido = true;
            confirmaValidade()
        });

        $(interesses).change((event) => {
            let campo = event.target;
            if(campo.checked){
                interessesNumero += 1;
            }
            else{
                interessesNumero -= 1;
            }
            if(campo.value == "outro"){                
                let interesse = $("input[name='outro-interesse']")[0];
                interesse.required = true;
                if(interesse.value.length == 0 && interessesNumero == 1){
                    interesse.value = "";
                    ehInteressesValido = false;
                    confirmaValidade();
                    return;
                }
                else{
                    let interesse = $("input[name='outro-interesse']")[0];
                    interesse.value = "";
                    interesse.required = false;
                }                
            }            
            ehInteressesValido = true;
            confirmaValidade()
        });

        $(participacao).keypress((event) => {
            let target = event.target;
            if(target.value.length <= 140){
                ehParticipacaoValido = false;                
            }
            else{
                ehParticipacaoValido = true;
            }
            confirmaValidade()
        });
