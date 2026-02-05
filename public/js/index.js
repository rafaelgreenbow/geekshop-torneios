async function carregarTorneios() {
    const lista = document.getElementById("listaTorneios");

    const response = await fetch("/.netlify/functions/listarTorneios");
    const result = await response.json();

    if (!result.ok) {
        lista.innerHTML = "<p>Erro ao carregar torneios.</p>";
        return;
    }

    const torneios = result.torneios;

    if (torneios.length === 0) {
        lista.innerHTML = "<p>Nenhum torneio disponível.</p>";
        return;
    }

    lista.innerHTML = "";

    torneios.forEach(t => {
        lista.innerHTML += `
            <div class="torneio-card" onclick="abrirTorneio('${t.id}')">
                <div class="torneio-titulo">${t.nome}</div>
                <div class="torneio-data">Data: ${t.data}</div>
            </div>
        `;
    });
}

function abrirTorneio(id) {
    window.location.href = `torneio.html?id=${id}`;
}

carregarTorneios();
