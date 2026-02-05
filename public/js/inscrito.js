// Obter dados pela URL
const params = new URLSearchParams(window.location.search);

const nome = params.get("nome");
const cpf = params.get("cpf");
const telefone = params.get("telefone");
const evento = params.get("evento");

// Preencher dados na tela
document.getElementById("dadosInscricao").innerHTML = `
    <strong>Evento:</strong> ${evento} <br>
    <strong>Nome:</strong> ${nome} <br>
    <strong>CPF:</strong> ${cpf} <br>
    <strong>Telefone:</strong> ${telefone}
`;

// Criar mensagem automática do WhatsApp
const mensagem = encodeURIComponent(
    `Olá! Acabei de me inscrever no ${evento}.\n` +
    `Segue minha lista/deck e comprovante (se houver).\n\n` +
    `Nome: ${nome}\n` +
    `CPF: ${cpf}\n` +
    `Telefone: ${telefone}\n`
);

// Número da loja
const numero = "558196605065";

// Botão do WhatsApp
document.getElementById("btnWhatsapp").onclick = () => {
    window.location.href = `https://wa.me/${numero}?text=${mensagem}`;
};
