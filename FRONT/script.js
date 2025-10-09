// URL da API
const API_URL = 'http://localhost:8080/pessoa';

// Ao carregar o HTML, CSS e JS, será executada a função carregarPessoas( )
window.onload = () => {
    carregarPessoas();
};

// Listar pessoas
function carregarPessoas(){
    fetch(API_URL)
    .then(res => res.json())
    .then(pessoas => {
        const tabela = document.getElementById('tabelaPessoas');
        tabela.innerHTML = '';
        pessoas.forEach(pessoa => {
            tabela.innerHTML += `
            <tr>
            <td>${pessoa.codigo}</td>
            <td>${pessoa.nome}</td>
            <td>${pessoa.idade}</td>
            <td>${pessoa.cidade}</td>
            <td>
            <button class="edit" onclick="editarPessoa(${pessoa.codigo})">Editar</button>
            <button class="delete" onclick="removerPessoa(${pessoa.codigo})">Excluir</button>
            </td>
            </tr>
            `;
        });
    });
}

// Cadastrar nova pessoa
document.getElementById('formPessoa').addEventListener('submit', e => {
    e.preventDefault();

    const nome = document.getElementById('nome').value; 
    const idade = document.getElementById('idade').value;
    const cidade = document.getElementById('cidade').value;

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, idade, cidade })
    })
    .then(res => res.json())
    .then(() => {
        e.target.reset();
        carregarPessoas();
    });
});

// Deletar pessoa
function removerPessoa(codigo) {
    if (confirm('Deseja realmente excluir esta pessoa?')) {
        fetch(`${API_URL}/${codigo}`, { method: 'DELETE'})
        .then(() => carregarPessoas());
    }
}

// Editar pessoa (PATCH simples com prompt)
function editarPessoa(codigo) {
    const novoNome = prompt('Novo nome:');
    const novaIdade = prompt('Nova idade:');
    const novaCidade = prompt('Nova cidade:');

    // Monta o objeto com os dados que foram alterados (se não forem nulos ou vazios)
    const dadosAtualizados = {};

    if (novoNome !== null && novoNome.trim() !== '') {
        dadosAtualizados.nome = novoNome.trim();
    }
    if (novaIdade !== null && novaIdade.trim() !== '') {
        // Converte para número se for necessário pela API
        dadosAtualizados.idade = Number(novaIdade.trim());
    }
    if (novaCidade !== null && novaCidade.trim() !== '') {
        dadosAtualizados.cidade = novaCidade.trim();
    }

    // Verifica se há dados para atualizar
    if (Object.keys(dadosAtualizados).length > 0) {
        fetch(`${API_URL}/${codigo}`, {
            method: 'PATCH', // Ou 'PUT', dependendo da sua API
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dadosAtualizados)
        })
        .then(res => {
            if (!res.ok) {
                // Tratar erro da API, se a resposta não for 2xx
                console.error('Erro ao atualizar pessoa:', res.statusText);
                alert('Ocorreu um erro ao atualizar. Verifique o console.');
            }
            return res.json();
        })
        .then(() => {
            alert('Pessoa atualizada com sucesso!');
            carregarPessoas(); // Recarrega a lista para mostrar a alteração
        })
        .catch(error => {
            console.error('Erro na requisição PATCH:', error);
            alert('Erro de conexão ou requisição.');
        });
    } else {
        alert('Nenhum dado foi alterado.');
    }
}