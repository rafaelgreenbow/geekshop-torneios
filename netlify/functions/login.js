// Função serverless de login (Netlify)

exports.handler = async function(event, context) {
    
    // Dados enviados pelo admin-login.js
    const body = JSON.parse(event.body || "{}");
    const usuario = body.usuario;
    const senha = body.senha;

    // Usuário e senha oficiais
    const USER = "geekshopbrasil";
    const PASS = "Geek@2026ç";

    // Verificação
    if (usuario === USER && senha === PASS) {

        // Criar token simples (por enquanto)
        const token = Buffer.from(`${usuario}:${Date.now()}`).toString("base64");

        return {
            statusCode: 200,
            body: JSON.stringify({
                ok: true,
                token
            })
        };
    }

    // Caso dê errado
    return {
        statusCode: 401,
        body: JSON.stringify({
            ok: false,
            mensagem: "Dados incorretos"
        })
    };
};
