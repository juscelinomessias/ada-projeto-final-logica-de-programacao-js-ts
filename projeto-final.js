const listaDeTarefas = []

let opcao = "";
let tarefa = "";

do {
    console.log(`
    --------------------------
          Menu principal     
    --------------------------
    1 - Adicionar tarefa.
    2 - Obter uma tarefa.
    3 - Obter tarefas.
    4 - Editar tarefa.
    5 - Deletar tarefa.
    0 - Sair.
    --------------------------
    `);

    const prompt = require('prompt-sync')();
    opcao = parseInt(prompt("Digite o número da opção desejada: "));

    switch (opcao) {
        case 1:
            tarefa = prompt("- Digite uma tarefa: ");
            adicionarTarefa(tarefa);
            break;
        case 2:
            numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));
            obterUmaTarefa(numeroTarefa);
            break;
        case 3:
            obterTarefas();
            break;  
        case 4:
            numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));
            novaTarefa = prompt("- Digite a nova tarefa: ");
            editarTarefa(numeroTarefa, novaTarefa);
            break;  
        case 5:
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
        listaDeTarefas.push(tarefa);
        console.log(`> Tarefa adicionada com sucesso.`);
    } catch (e) {
        
    }
}


function obterUmaTarefa(numeroTarefa) {
    if(numeroTarefa <= 0 || numeroTarefa > listaDeTarefas.length) {
        console.log(`> Tarefa não localizada.`);
        return
    }

    try {
        const tarefa = listaDeTarefas[numeroTarefa - 1]
        console.log(tarefa);
    } catch (e) {
        
    }
}


function obterTarefas() {
    if(listaDeTarefas.length === 0) {
        console.log(listaDeTarefas);
        return
    }

    try {
        for (let i = 0; i < listaDeTarefas.length; i++) {
            console.log(`${i + 1} - ${listaDeTarefas[i]}`);
        }       
    } catch (e) {
        
    }
}


function editarTarefa(numeroTarefa, novaTarefa) {
    if (numeroTarefa < 1 || numeroTarefa > listaDeTarefas.length) {
        console.log(`> Tarefa não localizada.`);
        return
    }
    
    try {
        listaDeTarefas.splice(numeroTarefa - 1, 1, novaTarefa);
        console.log(`> Tarefa modificada com sucesso.`);
    } catch (e) {
        
    }
}


function deletarTarefa(numeroTarefa) {
    if (numeroTarefa < 1 || numeroTarefa > listaDeTarefas.length) {
        console.log(`> Tarefa não localizada.`);
        return
    }

    try {
        listaDeTarefas.splice(numeroTarefa - 1, 1);
        console.log(`> Tarefa removida com sucesso.`);
    } catch (e) {
        
    }    
}