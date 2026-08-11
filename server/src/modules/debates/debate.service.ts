import { debates, gerarIdDebate } from './debate.store.js';
import type { Debate, Participante, Posicao } from './debate.types.js';


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




