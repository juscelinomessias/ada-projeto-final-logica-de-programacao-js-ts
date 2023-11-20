const listaDeTarefas = []

let tarefa;

// do {
//     console.log(`
//     --------------------------
//           Menu principal     
//     --------------------------
//     1 - Adicionar tarefa.
//     2 - Obter apenas uma tarefa.
//     3 - Obter todas as tarefas.
//     4 - Editar tarefa.
//     5 - Deletar tarefa.
//     0 - Sair.
//     --------------------------
//     `);

//     opcao = parseInt(prompt("Digite o número da opção desejada: "));

//     switch (opcao) {
//         case 1:
//             tarefa = prompt("- Digite uma tarefa: ");
//             adicionarTarefa(tarefa);
//             break;
//         case 2:
//             obterTodasAsTarefas();
//             numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));
//             obterUmaTarefa(numeroTarefa);
//             break;
//         case 3:
//             obterTodasAsTarefas();
//             break;  
//         case 4:
//             obterTodasAsTarefas();
//             numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));

//             if(isNaN(numeroTarefa)){
//                 throw new Error(`> O valor digitado não é válido.`);
//             }

//             novaTarefa = prompt("- Digite a nova tarefa: ");
//             editarTarefa(numeroTarefa, novaTarefa);
//             break;  
//         case 5:
//             obterTodasAsTarefas();
//             numeroTarefa = parseInt(prompt("- Digite o número da tarefa: "));
//             deletarTarefa(numeroTarefa);
//             break; 
//         case 0:
//             console.log(`> Programa finalizado.`);
//             break;                                   
//         default:
//             console.log(`> Opção incorreta! Selecione outra.`);
//             break;
//     }

// } while (opcao != 0);


function adicionarTarefa() {
    try {
        tarefa = document.getElementById("adicionarTarefa").value
        if (!tarefa) {
            document.getElementById("descricaoAdicionarTarefa").textContent = `Não é possível cadastrar uma tarefa vazia.`
            throw new Error(`> Não é possível cadastrar uma tarefa vazia.`);
        }

        if (tarefa.length < 4) {
            document.getElementById("descricaoAdicionarTarefa").textContent = `A descrição da tarefa deve ter no mínimo 4 caracteres.`
            throw new Error(`> A descrição da tarefa deve ter no mínimo 4 caracteres.`);
        }

        if (tarefa.length > 20) {
            document.getElementById("descricaoAdicionarTarefa").textContent = `A descrição da tarefa deve ter no máximo 20 caracteres.`
            throw new Error(`> A descrição da tarefa deve ter no máximo 20 caracteres.`);
        }

        const tarefaExiste = listaDeTarefas.includes(tarefa);

        if (tarefaExiste) {
            document.getElementById("descricaoAdicionarTarefa").textContent = `Esta tarefa já está cadastrada.`
            throw new Error(`> Esta tarefa já está cadastrada.`);
        }

        listaDeTarefas.push(tarefa);

        document.getElementById("descricaoAdicionarTarefa").textContent = `Tarefa adicionada com sucesso.`;

        obterTodasAsTarefas()

    } catch (e) {
        console.error({
            "name": e.name,
            "mensagem": e.message,
            "data": Date()
        })
    }
}


function obterUmaTarefa(numeroTarefa) {
    try {
        numeroTarefa = document.getElementById("obterUmaTarefa").value

        if (isNaN(numeroTarefa)) {
            document.getElementById("descricaoObterUmaTarefa").textContent = `O valor digitado não é válido.`
            throw new Error(`> O valor digitado não é válido.`);
        }

        if (numeroTarefa <= 0 || numeroTarefa > listaDeTarefas.length) {
            document.getElementById("descricaoObterUmaTarefa").textContent = `Tarefa não localizada.`
            throw new Error(`> Tarefa não localizada.`);
        }

        const tarefa = listaDeTarefas[numeroTarefa - 1]

        document.getElementById("descricaoObterUmaTarefa").textContent = `Tarefa - ${tarefa}`;

    } catch (e) {
        console.error({
            "name": e.name,
            "mensagem": e.message,
            "data": Date()
        })
    }
}


function obterTodasAsTarefas() {
    try {
        if (listaDeTarefas.length === 0) {
            document.getElementById("lista").textContent = `Não existem tarefas cadastradas.`
            throw new Error(`> Não existem tarefas cadastradas.`);
        }

        document.getElementById("tituloLista").textContent = "Tarefas:"

        let lista = "";

        for (let i = 0; i < listaDeTarefas.length; i++) {
            lista += `${i + 1} - ${listaDeTarefas[i]}
`;
        }
        document.getElementById("lista").textContent = lista
    } catch (e) {
        console.error({
            "name": e.name,
            "mensagem": e.message,
            "data": Date()
        })
    }
}


function editarTarefa() {
    try {
        numeroTarefa = document.getElementById("pesquisaEditarTarefa").value
        novaTarefa = document.getElementById("editarTarefa").value

        if (isNaN(numeroTarefa)) {
            document.getElementById("descricaoPesquisaEditarTarefa").textContent = `O valor digitado não é válido.`
            throw new Error(`> O valor digitado não é válido.`);
        }

        if (numeroTarefa < 1 || numeroTarefa > listaDeTarefas.length) {
            document.getElementById("descricaoPesquisaEditarTarefa").textContent = `Tarefa não localizada.`
            throw new Error(`> Tarefa não localizada.`);
        }

        listaDeTarefas.splice(numeroTarefa - 1, 1, novaTarefa);
        document.getElementById("descricaoPesquisaEditarTarefa").textContent = ``
        document.getElementById("descricaoEditarTarefa").textContent = `Tarefa modificada com sucesso.`;

        obterTodasAsTarefas();
    } catch (e) {
        console.error({
            "name": e.name,
            "mensagem": e.message,
            "data": Date()
        })
    }
}


function deletarTarefa() {
    try {
        numeroTarefa = document.getElementById("deletarTarefa").value

        if (numeroTarefa < 1 || numeroTarefa > listaDeTarefas.length) {
            document.getElementById("descricaoDeletarTarefa").textContent = `Tarefa não localizada.`
            throw new Error(`> Tarefa não localizada.`);
        }

        if (listaDeTarefas.length === 0) {
            obterTodasAsTarefas();
        }

        listaDeTarefas.splice(numeroTarefa - 1, 1);
        document.getElementById("descricaoDeletarTarefa").textContent = `Tarefa removida com sucesso.`;

        obterTodasAsTarefas();
    } catch (e) {
        console.error({
            "name": e.name,
            "mensagem": e.message,
            "data": Date()
        })
    }
}

function deletarTodasAsTarefas() {
    if (listaDeTarefas.length === 0){
        return obterTodasAsTarefas()
    }

    while (listaDeTarefas.length > 0) {
        listaDeTarefas.pop();
    }

    document.getElementById("lista").textContent = `Tarefas deletadas.`
}

function limparInputs() {
    const btn = document.getElementById('btn');

    btn.addEventListener('click', function handleClick(event) {

        const inputs = document.querySelectorAll("#adicionarTarefa, #obterUmaTarefa, #pesquisaEditarTarefa, #editarTarefa, #deletarTarefa");

        inputs.forEach(input => {
            input.value = '';
        });
    });
}