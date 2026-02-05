document.getElementById("formInscricao").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const eventoId = document.getElementById("eventoId").value;

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = "Enviando inscrição...";
    mensagem.style.color = "#0a84ff";

    // ====== CHAMADA PARA O BACKEND ======
    const response = await fetch("/.netlify/functions/criarInscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome,
            cpf,
            telefone,
            eventoId
        })
    });

    const result = await response.json();

    if (!result.ok) {
        mensagem.textContent = "Erro ao enviar inscrição. Tente novamente.";
        mensagem.style.color = "red";
        return;
    }

    // ===== SUCESSO =====
    mensagem.textContent = "Inscrição enviada com sucesso!";
    mensagem.style.color = "#4caf50";

    // REDIRECIONAR PARA WHATSAPP
    const texto = encodeURIComponent(
        `Olá! Acabei de me inscrever no torneio.\n\nNome: ${nome}\nCPF: ${cpf}\nTelefone: ${telefone}\nEvento: ${eventoId}\n\nSegue meu decklist e/ou comprovante:`
    );

    setTimeout(() => {
        window.location.href = `https://wa.me/558196605065?text=${texto}`;
    }, 1200);
});
