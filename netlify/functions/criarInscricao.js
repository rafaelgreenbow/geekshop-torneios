// Função serverless para salvar inscrição no Netlify KV

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
    const cpf = body.cpf;
    const telefone = body.telefone;
    const eventoId = body.eventoId;

    // ====== VALIDAÇÃO SIMPLES ======
    if (!nome || !cpf || !telefone || !eventoId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ ok: false, msg: "Dados incompletos" })
        };
    }

    // ====== CRIAR ID ÚNICO DA INSCRIÇÃO ======
    const chave = `inscricao:${eventoId}:${cpf}`;

    const dados = {
        nome,
        cpf,
        telefone,
        eventoId,
        pago: false,
        dataInscricao: new Date().toISOString()
    };

    // ====== SALVAR NO KV ======
    await kv.set(chave, dados);

    return {
        statusCode: 200,
        body: JSON.stringify({ ok: true })
    };
}
