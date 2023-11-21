const fs = require('fs');
const prompt = require('prompt-sync')();

let listaDeTarefas = [];


carregarTarefasDoArquivo();

let opcaoMenu;
let tarefa;
let numeroTarefa;

const obterTodasAsTarefas = () => {
    console.log(``);
    console.log(`- Tarefas cadastradas:`);

    for (let i = 0; i < listaDeTarefas.length; i++) {
        console.log(`${i + 1} - ${listaDeTarefas[i]}`);
    }
};

salvarTarefasNoArquivo();
function carregarTarefasDoArquivo() {
    try {
        const dados = fs.readFileSync('tarefas.json', 'utf8');
        listaDeTarefas = JSON.parse(dados);
    } catch (err) {
        console.log('Erro ao carregar tarefas do arquivo:', err.message);
    }
}

function salvarTarefasNoArquivo() {
    try {
        const dados = JSON.stringify(listaDeTarefas, null, 2);
        fs.writeFileSync('tarefas.json', dados);
    } catch (err) {
        console.log('Erro ao salvar tarefas no arquivo:', err.message);
    }
}

function adicionarTarefa(tarefa) {
    try {
        verificarTarefa(tarefa);
        listaDeTarefas.push(tarefa);
        console.log(`> Tarefa adicionada com sucesso.`);      
        obterTodasAsTarefas();

        salvarTarefasNoArquivo();

    } catch (e) {
        console.error({"name": e.name,
                       "mensagem": e.message,
                       "data": Date()})
    }
}

function obterUmaTarefa(numeroTarefa) {
    try {
        verificarSeValorEValidoETarefaExiste(numeroTarefa);
        tarefa = listaDeTarefas[numeroTarefa - 1]
        console.log(tarefa);

    } catch (e) {
        console.error({"name": e.name,
                       "mensagem": e.message,
                       "data": Date()})        
    }
}

function editarTarefa(numeroTarefa) {  
    try {   
        verificarSeValorEValidoETarefaExiste(numeroTarefa);
        tarefa = prompt("- Digite a nova tarefa: ");
        verificarTarefa(tarefa);
        listaDeTarefas.splice(numeroTarefa - 1, 1, tarefa);
        console.log(`> Tarefa modificada com sucesso.`);
        obterTodasAsTarefas();

        salvarTarefasNoArquivo();

    } catch (e) {
        console.error({"name": e.name,
                       "mensagem": e.message,
                       "data": Date()})           
    }
}

function deletarPrimeiraTarefa() {
    try {
        listaDeTarefas.shift();
        console.log(`> Tarefa removida com sucesso.`);
        obterTodasAsTarefas();

        salvarTarefasNoArquivo();
        
    } catch (e) {
        console.error({"name": e.name,
                       "mensagem": e.message,
                       "data": Date()})           
    }    
}

function deletarTarefa(numeroTarefa) {
    try {
        verificarSeValorEValidoETarefaExiste(numeroTarefa);
        listaDeTarefas.splice(numeroTarefa - 1, 1);
        console.log(`> Tarefa removida com sucesso.`);
    
        if(listaDeTarefas.length === 0) {
            console.log(`> Não existem tarefas cadastradas.`);
        } else {
            obterTodasAsTarefas();
        }

        salvarTarefasNoArquivo();
        
    } catch (e) {
        console.error({"name": e.name,
                       "mensagem": e.message,
                       "data": Date()})           
    }    
}

function removerTodasTarefas(){
    while (listaDeTarefas.length > 0) {
        listaDeTarefas.pop();
    }
    console.log(`> Todas as tarefas foram deletadas.`)

    salvarTarefasNoArquivo();
}

function verificarSeValorEValidoETarefaExiste(numeroTarefa) {
    if(isNaN(numeroTarefa)){
        throw new Error(`> O valor digitado não é válido.`);
    }

    if(numeroTarefa < 1 || numeroTarefa > listaDeTarefas.length) {
        throw new Error(`> Tarefa não localizada.`);
    }         
}

function verificarTarefa(tarefa) {
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
}



do {
    console.log(`
    ---------------------------------
              Menu principal             
    ---------------------------------
    1 - Adicionar tarefa.
    2 - Obter apenas uma tarefa.
    3 - Obter todas as tarefas.
    4 - Editar tarefa.
    5 - Deletar a primeira tarefa.
    6 - Deletar um tarefa específica.
    7 - Deletar todas as tarefas.
    0 - Sair.
    ---------------------------------
    `);

    opcaoMenu = parseInt(prompt("Digite o número da opção desejada: "));

    switch (opcaoMenu) {
        case 1:
            tarefa = prompt("- Digite uma tarefa: ");
            adicionarTarefa(tarefa);
            break;

        case 2:
            if (listaDeTarefas.length === 0) {
                console.log(`> Não existem tarefas cadastradas.`);
            } else {
                obterTodasAsTarefas();
                console.log(``);
                numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));
                obterUmaTarefa(numeroTarefa);
            }
            break;

        case 3:
            listaDeTarefas.length === 0 ? console.log(`> Não existem tarefas cadastradas.`) : obterTodasAsTarefas();
            break;  
        
        case 4:
            if (listaDeTarefas.length === 0) {
                console.log(`> Não existem tarefas cadastradas.`);
            } else {
                obterTodasAsTarefas();
                console.log(``);
                numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));
                editarTarefa(numeroTarefa);            
            }
            break; 

        case 5:
            if (listaDeTarefas.length === 0) {
                console.log(`> Não existem tarefas cadastradas.`);
            } else {
                deletarPrimeiraTarefa();
            }
            break;

        case 6:
            if (listaDeTarefas.length === 0) {
                console.log(`> Não existem tarefas cadastradas.`);
            } else {
                obterTodasAsTarefas();
                console.log(``);
                numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));
                deletarTarefa(numeroTarefa);
            }
            break;

        case 7:
            if (listaDeTarefas.length === 0) {
                console.log(`> Não existem tarefas cadastradas.`);
            } else {
                removerTodasTarefas();
            }
            break;
            
        case 0:
            console.log(`> Programa finalizado.`);
            break;  

        default:
            console.log(`> Opção incorreta! Selecione outra.`);
            break;
    }

} while (opcaoMenu != 0);







