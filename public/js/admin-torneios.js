// Verifica login
if (!localStorage.getItem("adminToken")) {
    window.location.href = "admin.html";
}

function logout() {
    localStorage.removeItem("adminToken");
    window.location.href = "admin.html";
}

// Cadastrar torneio
document.getElementById("formTorneio").addEventListener("submit", async function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = "Enviando...";
    mensagem.style.color = "#0a84ff";

    const response = await fetch("/.netlify/functions/criarTorneio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, data })
    });

    const result = await response.json();

    if (!result.ok) {
        mensagem.textContent = "Erro ao cadastrar.";
        mensagem.style.color = "red";
        return;
    }

    mensagem.textContent = "Torneio cadastrado!";
    mensagem.style.color = "#4caf50";

    carregarTorneios();
});

// Listar torneios já cadastrados
async function carregarTorneios() {

    const lista = document.getElementById("listaTorneios");
    lista.innerHTML = "Carregando...";

    const response = await fetch("/.netlify/functions/listarTorneios");

    const result = await response.json();

    if (!result.ok) {
        lista.innerHTML = "Erro ao carregar torneios.";
        return;
    }

    const torneios = result.torneios;

    if (torneios.length === 0) {
        lista.innerHTML = "<p>Nenhum torneio cadastrado ainda.</p>";
        return;
    }

    lista.innerHTML = "";

    torneios.forEach(t => {
        lista.innerHTML += `
            <div class="inscrito-item">
                <div>
                    <strong>${t.nome}</strong><br>
                    Data: ${t.data}<br>
                    ID: ${t.id}
                </div>
            </div>
        `;
    });
}

carregarTorneios();
