const params = new URLSearchParams(window.location.search);
const idAtual = params.get("id");

async function carregarTorneio() {
    const resp = await fetch("/.netlify/functions/listarTorneios");
    const result = await resp.json();

    if (!result.ok) return;

    const torneio = result.torneios.find(t => t.id === idAtual);

    if (!torneio) {
        document.getElementById("tituloTorneio").textContent = "Torneio não encontrado.";
        return;
    }

    document.getElementById("tituloTorneio").textContent = torneio.nome;
    document.getElementById("dataTorneio").textContent = "Data: " + torneio.data;
}

carregarTorneio();
