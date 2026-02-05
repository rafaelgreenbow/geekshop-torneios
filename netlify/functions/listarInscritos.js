import { kv } from "@netlify/kv";

export async function handler(event, context) {
    
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Método não permitido"
        };
    }

    const body = JSON.parse(event.body || "{}");
    const eventoId = body.eventoId;

    if (!eventoId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ ok: false, msg: "eventoId é obrigatório" })
        };
    }

    // Buscar todas as chaves do banco
    const todasChaves = await kv.list();

    const chavesEvento = todasChaves.keys
        .filter(k => k.name.startsWith(`inscricao:${eventoId}:`))
        .map(k => k.name);

    let inscritos = [];

    for (const chave of chavesEvento) {
        const dado = await kv.get(chave);
        if (dado) inscritos.push(dado);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            ok: true,
            inscritos
        })
    };
}
