import { kv } from "@netlify/kv";

export async function handler(event, context) {

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Método não permitido"
        };
    }

    const body = JSON.parse(event.body || "{}");

    const nome = body.nome;
    const data = body.data;

    if (!nome || !data) {
        return {
            statusCode: 400,
            body: JSON.stringify({ ok: false, msg: "Nome e data são obrigatórios" })
        };
    }

    // Criar ID único do torneio
    const id = `torneio-${Date.now()}`;

    const dados = {
        id,
        nome,
        data,
        criadoEm: new Date().toISOString()
    };

    // Salvar no KV
    await kv.set(`torneio:${id}`, dados);

    return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, torneio: dados })
    };
}
