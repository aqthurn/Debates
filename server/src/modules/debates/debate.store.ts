import type { Debate } from './debate.types.js';

export const debates = new Map<string, Debate>();

const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';



export function gerarIdDebate(): string {
    


    let id = '';
    for(let i = 0; i < 6; i++){
        const indice = Math.floor(Math.random() * ALFABETO.length);
        const caractere = ALFABETO.charAt(indice);
        id += caractere;
    }
    return id;
}


