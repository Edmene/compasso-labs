
let teste = [{"nome": "config", "ajuda": "usado para definir valores de configuração específicos do usuário como e-mail, nome de usuário"},
             {"nome": "init", "ajuda": "usado para criar um novo repositório GIT"},
             {"nome": "clone", "ajuda": "é usado para fins de verificação de repositório"},
             {"nome": "commit", "ajuda": "é usado para confirmar as alterações na cabeça"},
             {"nome": "status", "ajuda": " exibe a lista de arquivos alterados juntamente com os arquivos que ainda não foram adicionados ou confirmados."},
             {"nome": "push", "ajuda": "envia as alterações feitas para o ramo mestre do repositório remoto associado ao diretório de trabalho."},
             {"nome": "checkout", "ajuda": "pode ser usado para criar ramos ou alternar entre eles."},
             {"nome": "remote", "ajuda": "permite que um usuário se conecte a um repositório remoto."},
             {"nome": "branch", "ajuda": "pode ser usado para listar, criar ou excluir ramos."},
             {"nome": "pull", "ajuda": "mesclar todas as alterações presentes no repositório remoto para o diretório de trabalho local"},
             {"nome": "merge", "ajuda": "é usado para mesclar uma ramificação no ramo ativo."},
             {"nome": "fetch", "ajuda": "permite que um usuário obtenha todos os objetos do repositório remoto que atualmente não residem no diretório de trabalho local"},
             {"nome": "add", "ajuda": "usado para adicionar arquivos ao índice"},
             {"nome": "git", "ajuda": "é um sistema de versionamento"}];
        
        $("#texto").ready(function(){
          $("#texto").keypress(function(e){

            var valorterminal = $("#texto").val();
            var valor = $("#texto").val().split("\n");
            if( e.keyCode == 13){
                let ultimo = valor[valor.length - 1];

                teste.find(item => {if(item.nome == ultimo){
                                        $("#texto").val(valorterminal + "\n" + "$ " + item.ajuda);
                                    }
                                });

            }
          })
        })