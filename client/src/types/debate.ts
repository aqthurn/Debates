export type Argumento = {
  autor: string;
  conteudo: string;
};

export type Mensagem = Argumento & {
  id: string;
};