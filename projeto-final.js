const prompt = require('prompt-sync')();

const listaDeTarefas = []

let opcao;
let tarefa;


do {
    console.log(`
    --------------------------
          Menu principal     
    --------------------------
    1 - Adicionar tarefa.
    2 - Obter apenas uma tarefa.
    3 - Obter todas as tarefas.
    4 - Editar tarefa.
    5 - Deletar tarefa.
    0 - Sair.
    --------------------------
    `);

    opcao = parseInt(prompt("Digite o número da opção desejada: "));

    switch (opcao) {
        case 1:
            tarefa = prompt("- Digite uma tarefa: ");
            adicionarTarefa(tarefa);
            break;
        case 2:
            obterTodasAsTarefas();
            numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));
            obterUmaTarefa(numeroTarefa);
            break;
        case 3:
            obterTodasAsTarefas();
            break;  
        case 4:
            obterTodasAsTarefas();
            numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));
            
            if(isNaN(numeroTarefa)){
                throw new Error(`> O valor digitado não é válido.`);
            }
            
            novaTarefa = prompt("- Digite a nova tarefa: ");
            editarTarefa(numeroTarefa, novaTarefa);
            break;  
        case 5:
            obterTodasAsTarefas();
            numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));
            deletarTarefa(numeroTarefa);
            break; 
        case 0:
            console.log(`> Programa finalizado.`);
            break;                                   
        default:
            console.log(`> Opção incorreta! Selecione outra.`);
            break;
    }

} while (opcao != 0);


function adicionarTarefa(tarefa) {
    try {
        if(!tarefa){
            throw new Error(`> Não é possível cadastrar uma tarefa vazia.`);
        }
           
        if(tarefa.length < 4){
            throw new Error(`> A tarefa deve ter no mínimo 4 caracteres.`);
        }

        if(tarefa.length > 20){
            throw new Error(`> A tarefa deve ter no máximo 20 caracteres.`);
        }

        const tarefaExiste = listaDeTarefas.includes(tarefa);

        if(tarefaExiste){
            throw new Error(`> Esta tarefa já está cadastrada.`);
        }
        
        listaDeTarefas.push(tarefa);

        console.log(`> Tarefa adicionada com sucesso.`);
        
        obterTodasAsTarefas();

    } catch (e) {
        console.error({"name": e.name,
                       "mensagem": e.message,
                       "data": Date()})
    }
}


function obterUmaTarefa(numeroTarefa) {
    try {
        if(isNaN(numeroTarefa)){
            throw new Error(`> O valor digitado não é válido.`);
        }
    
        if(numeroTarefa <= 0 || numeroTarefa > listaDeTarefas.length) {
            throw new Error(`> Tarefa não localizada.`);
        }

        const tarefa = listaDeTarefas[numeroTarefa - 1]
        
        console.log(tarefa);

    } catch (e) {
        console.error({"name": e.name,
                       "mensagem": e.message,
                       "data": Date()})        
    }
}


function obterTodasAsTarefas() {
    try {
        if(listaDeTarefas.length === 0) {
            throw new Error(`> Não existem Tarefas cadastradas.`);
        }

        console.log(``);
        console.log(`- Tarefas cadastradas:`);

        for (let i = 0; i < listaDeTarefas.length; i++) {
            console.log(`${i + 1} - ${listaDeTarefas[i]}`);
        }       
    } catch (e) {
        console.error({"name": e.name,
                       "mensagem": e.message,
                       "data": Date()})           
    }
}


function editarTarefa(numeroTarefa, novaTarefa) {  
    try {
        if (numeroTarefa < 1 || numeroTarefa > listaDeTarefas.length) {
            throw new Error(`> Tarefa não localizada.`);
        }

        listaDeTarefas.splice(numeroTarefa - 1, 1, novaTarefa);
        console.log(`> Tarefa modificada com sucesso.`);
        obterTodasAsTarefas();
    } catch (e) {
        console.error({"name": e.name,
                       "mensagem": e.message,
                       "data": Date()})           
    }
}


function deletarTarefa(numeroTarefa) {
    try {
        if (numeroTarefa < 1 || numeroTarefa > listaDeTarefas.length) {
            throw new Error(`> Tarefa não localizada.`);
        }

        listaDeTarefas.splice(numeroTarefa - 1, 1);
        console.log(`> Tarefa removida com sucesso.`);
        
        if(listaDeTarefas.length === 0) {
            console.log(`> Não existem tarefas cadastradas.`);
        } else {
            obterTodasAsTarefas();
        }
        
    } catch (e) {
        console.error({"name": e.name,
                       "mensagem": e.message,
                       "data": Date()})           
    }    
}