import type { Argumento } from './debate';

export interface ServerToClientEvents {
  novo_argumento_na_tela: (dados: Argumento) => void;
}

export interface ClientToServerEvents {
  enviar_argumento: (dados: Argumento) => void;
}