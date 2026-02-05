document.getElementById("formLogin").addEventListener("submit", async function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    // Chamada para o backend (Netlify Function)
    // — ainda vamos criar essa função!
    const resposta = await fetch("/.netlify/functions/login", {
        method: "POST",
        body: JSON.stringify({ usuario, senha })
    });

    const dados = await resposta.json();

    if (!dados.ok) {
        erro.textContent = "Usuário ou senha incorretos.";
        return;
    }

    // Salvar token temporário
    localStorage.setItem("adminToken", dados.token);

    // Redirecionar para o painel principal
    window.location.href = "admin-dashboard.html";
});
