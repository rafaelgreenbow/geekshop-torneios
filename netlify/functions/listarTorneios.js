import { kv } from "@netlify/kv";

export async function handler() {

    const keys = await kv.list();

    const torneios = [];

    for (const item of keys.keys) {
        if (item.name.startsWith("torneio:")) {
            torneios.push(await kv.get(item.name));
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            ok: true,
            torneios
        })
    };
}
