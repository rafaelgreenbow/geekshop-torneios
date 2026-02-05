async function carregarTorneios() {
    const lista = document.getElementById("listaTorneios");

    const response = await fetch("/.netlify/functions/listarTorneios");
    const result = await response.json();

    if (!result.ok) {
        lista.innerHTML = "<p>Erro ao carregar torneios.</p>";
        return;
    }

    const torneios = result.torneios;

    lista.innerHTML = "";

    torneios.forEach(t => {
        lista.innerHTML += `
            <div class="event-card" onclick="abrirTorneio('${t.id}')">
                <h2>${t.nome}</h2>
                <div class="event-info">Data: ${t.data}</div>
                <button class="btn">Detalhes</button>
            </div>
        `;
    });
}

function abrirTorneio(id) {
    window.location.href = `torneio.html?id=${id}`;
}

carregarTorneios();
