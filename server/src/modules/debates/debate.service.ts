import { debates, gerarIdDebate } from './debate.store.js';
import type { Debate, Participante, Posicao, Papel } from './debate.types.js';


type ResultadoEntrada =
    | { ok: true; debate: Debate }
    | { ok: false; erro: string };


export function entrarNoDebate(
    debateId: string,
    socketId: string,
    nome: string,
    papel: Papel,
    posicao?: Posicao,
): ResultadoEntrada {

    const debate = buscarDebate(debateId);

    if (!debate) {
        return { ok: false, erro: 'sala_nao_encontrada' };
    }

    if (papel === 'espectador') {
        debate.espectadores.push({ socketId, nome });

        return { ok: true, debate };
    }
    if (posicao === undefined) {
        return { ok: false, erro: 'posicao_nao_informada' };
    }

    if (debate.participantes[posicao] !== null) {
        return { ok: false, erro: 'posicao_ocupada' };
    }

    const participante: Participante = {
        socketId,
        nome,
        posicao
    }
    debate.participantes[posicao] = participante
    return { ok: true, debate };



}




export function criarDebate(
    tema: string,
    nomeCriador: string,
    criadorSocketId: string,
    posicao: Posicao,
): Debate {

    let id = gerarIdDebate();
    while (debates.has(id)) {
        id = gerarIdDebate();
    }

    const criador: Participante = {
        socketId: criadorSocketId,
        nome: nomeCriador,
        posicao,
    };


    const debate: Debate = {
        id,
        tema,
        status: 'aguardando',
        criadorSocketId,
        participantes: {
            tese: posicao === 'tese' ? criador : null,
            antitese: posicao === 'antitese' ? criador : null,
        },
        espectadores: [],
        argumentos: [],
        criadoEm: Date.now(),
    };

    debates.set(id, debate);
    return debate;
}

export function buscarDebate(id: string): Debate | undefined {
    return debates.get(id);
}




