// Variáveis globais
const perguntas = document.querySelectorAll('.pergunta');
const barraProgresso = document.getElementById('barra-progresso');
let perguntaAtual = 0;

// Mostra a primeira pergunta
mostrarPergunta(perguntaAtual);

// Função para mostrar a pergunta atual
function mostrarPergunta(indice) {
    perguntas.forEach((pergunta, i) => {
        if (i === indice) {
            pergunta.classList.add('ativa');
        } else {
            pergunta.classList.remove('ativa');
        }
    });

    // Atualiza a barra de progresso
    const progresso = ((indice + 1) / perguntas.length) * 100;
    barraProgresso.style.width = `${progresso}%`;
}

// Navegação entre as perguntas
document.querySelectorAll('.btn.proximo').forEach((botao) => {
    botao.addEventListener('click', () => {
        if (perguntaAtual < perguntas.length - 1) {
            perguntaAtual++;
            mostrarPergunta(perguntaAtual);
        }
    });
});

document.querySelectorAll('.btn.anterior').forEach((botao) => {
    botao.addEventListener('click', () => {
        if (perguntaAtual > 0) {
            perguntaAtual--;
            mostrarPergunta(perguntaAtual);
        }
    });
});

// Seleção do tênis
const botoesTenis = document.querySelectorAll('.tenis button');

botoesTenis.forEach((botao) => {
    botao.addEventListener('click', function () {
        // Remove a seleção anterior
        botoesTenis.forEach((btn) => {
            btn.textContent = 'Selecionar';
            btn.parentElement.style.borderColor = '#ddd';
        });

        // Marca o tênis selecionado
        botao.textContent = 'Selecionado ✔️';
        botao.parentElement.style.borderColor = '#000';

        // Salva a escolha no localStorage
        const tenisEscolhido = botao.parentElement.getAttribute('data-tenis');
        const nomeTenis = botao.parentElement.getAttribute('data-nome');
        const valorOriginal = botao.parentElement.getAttribute('data-valor');
        localStorage.setItem('tenisEscolhido', tenisEscolhido);
        localStorage.setItem('nomeTenis', nomeTenis);
        localStorage.setItem('valorOriginal', valorOriginal);
    });
});

// Envia o formulário e redireciona para carrinho.html
document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const gostaMarca = document.getElementById('gosta-marca').value;
    const melhorias = document.getElementById('melhorias').value;
    const desempenho = document.getElementById('desempenho').value;
    const tamanho = document.getElementById('tamanho').value;
    const tenisEscolhido = localStorage.getItem('tenisEscolhido');

    // Valida se um tênis foi selecionado
    if (!tenisEscolhido) {
        alert('Por favor, selecione um tênis antes de enviar o formulário.');
        return;
    }

    // Salva os dados no localStorage
    localStorage.setItem('tamanho', tamanho);

    // Redireciona para a página do carrinho
    window.location.href = 'carrinho.html';
});