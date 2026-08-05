

export type DebateStatus = 'aguardando' | 'em_andamento' | 'votacao' | 'finalizado';
export type Posicao = 'tese' | 'antitese';
export type Papel = 'participante' | 'espectador';

export interface Participante {
    socketId: string;
    nome: string;
    posicao: Posicao;
}

export interface Espectador {
    socketId: string;
    nome?: string;
    
}

export interface Argumento {
    id: string;
    autor: string;
    conteudo: string;
    posicao: Posicao;
    rodada: number;
    criadoEm: number;
    
}

export interface Debate {
     id: string;
  tema: string;
  status: DebateStatus;
  criadorSocketId: string;
  participantes: {
    tese: Participante | null;
    antitese: Participante | null;
  };
  espectadores: Espectador[];
  argumentos: Argumento[];
  criadoEm: number;
}