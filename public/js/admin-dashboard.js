// ======= VERIFICA LOGIN =======

if (!localStorage.getItem("adminToken")) {
    window.location.href = "admin.html";
}

// Botão de sair
function logout() {
    localStorage.removeItem("adminToken");
    window.location.href = "admin.html";
}

// ======= LISTAR INSCRITOS (temporário até conectar backend) =======

async function carregarInscritos() {

    const lista = document.getElementById("listaInscritos");
    lista.innerHTML = "<p>Carregando...</p>";

    const eventoId = document.getElementById("selectEvento").value;

    // Buscar dados reais no backend
    const response = await fetch("/.netlify/functions/listarInscritos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventoId })
    });

    const result = await response.json();

    if (!result.ok) {
        lista.innerHTML = "<p>Erro ao carregar inscritos.</p>";
        return;
    }

    const inscritos = result.inscritos;

    if (inscritos.length === 0) {
        lista.innerHTML = "<p>Nenhum inscrito ainda.</p>";
        return;
    }

    lista.innerHTML = "";

    inscritos.forEach((pessoa, index) => {

        const pago = pessoa.pago ?
            `<span class='status-pago'>PAGO</span>` :
            `<span class='status-nao'>NÃO PAGO</span>`;

        const botao = pessoa.pago ?
            `<button class="btn-status btn-desmarcar" onclick="togglePago('${pessoa.cpf}', '${eventoId}', false)">Desmarcar</button>` :
            `<button class="btn-status btn-pagar" onclick="togglePago('${pessoa.cpf}', '${eventoId}', true)">Marcar Pago</button>`;

        lista.innerHTML += `
            <div class="inscrito-item">
                <div class="inscrito-dados">
                    <strong>${pessoa.nome}</strong><br>
                    CPF: ${pessoa.cpf}<br>
                    Tel: ${pessoa.telefone}<br>
                    ${pago}
                </div>
                ${botao}
            </div>
        `;
    });
}


// ======= MARCAR / DESMARCAR PAGO (ainda local) =======

async function togglePago(cpf, eventoId, status) {

    // status = true (marcar pago) ou false (desmarcar)

    await fetch("/.netlify/functions/marcarPagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cpf,
            eventoId,
            pago: status
        })
    });

    // Recarregar lista atualizada
    carregarInscritos();
}
