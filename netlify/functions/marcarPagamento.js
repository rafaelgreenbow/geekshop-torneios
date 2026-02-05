import { kv } from "@netlify/kv";

export async function handler(event, context) {
    
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Método não permitido"
        };
    }

    const body = JSON.parse(event.body || "{}");

    const cpf = body.cpf;
    const eventoId = body.eventoId;
    const pago = body.pago;

    if (!cpf || !eventoId || typeof pago !== "boolean") {
        return {
            statusCode: 400,
            body: JSON.stringify({ ok: false, msg: "Dados inválidos" })
        };
    }

    const chave = `inscricao:${eventoId}:${cpf}`;

    // Puxar os dados existentes
    const dados = await kv.get(chave);

    if (!dados) {
        return {
            statusCode: 404,
            body: JSON.stringify({ ok: false, msg: "Inscrição não encontrada" })
        };
    }

    // Alterar somente o status de pagamento
    dados.pago = pago;

    // Salvar novamente
    await kv.set(chave, dados);

    return {
        statusCode: 200,
        body: JSON.stringify({ ok: true })
    };
}
