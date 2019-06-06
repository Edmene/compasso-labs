
 
        let nome = $("input[name='nome']");
        let email = $("input[name='email']");
        let disponibilidade = $("input[name='disponibilidade']");
        let personalizar = $("input[name='personalizar']");
        let interesses = $("fieldset[name='interesses']").children().find('input');
        let participacao = $("textarea[name='participacao']");

        let isNomeValido = false;
        let isEmailValido = false;
        let isDisponibilidadeValido = false;
        let isInteressesValido = false;
        let isParticipacaoValido = false;
        
        let submitDisponivel = false;

        $(nome).change((event) => {
            let campo = event.target;
            let regex = new RegExp("\D*");
            if(regex.test(campo.value) &&
            campo.value.split(/\S+/).length-1 >= 2){
                isNomeValido = true;
            }
            else{
                isNomeValido = false;
            }
        });

        $(email).keypress((event) => {
            let campo = event.target;
            isEmailValido = campo.validityState.valid;
        });

        $(disponibilidade).change((event) => {
            let campo = event.target;
            if(campo.value == "personalizar"){
                let disponibilidade = $("input[name='personalizar']");
                if(disponibilidade.val().length == 0){
                    isDisponibilidadeValido = false;
                    return;
                }                
            }            
            isDisponibilidadeValido = true;
        });

        $(interesses).change((event) => {
            let campo = event.target;
            if(campo.value == "outro"){
                let interesse = $("input[name='outro-interesse']");
                if(interesse.val().length == 0){
                    isInteressesValido = false;
                    return;
                }                
            }            
            isInteressesValido = true;
        });

        $(participacao).change((event) => {
            let target = event.target;
            if(target.value.length <= 140){
                isParticipacaoValido = false;                
            }
            else{
                isParticipacaoValido = true;
            }
        });