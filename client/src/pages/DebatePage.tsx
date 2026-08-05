
import { useEffect, useRef, useState } from 'react';


import type { Argumento, Mensagem } from '../types/debate';
import { socket } from '../services/socket';


const CHAVE_NOME = 'agora:nome-do-orador';
const LIMITE_NOME = 40;
const LIMITE_TEXTO = 500;



type EstadoConexao = 'conectando' | 'conectado' | 'desconectado';



const criarIdMensagem = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const obterNomeSalvo = () => {
  try {
    return localStorage.getItem(CHAVE_NOME) ?? '';
  } catch {
    return '';
  }
};

function DebatePage() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [texto, setTexto] = useState('');
  const [nome, setNome] = useState(obterNomeSalvo);
  const [aviso, setAviso] = useState('');
  const [estadoConexao, setEstadoConexao] = useState<EstadoConexao>(
    socket.connected ? 'conectado' : 'conectando',
  );

  const fimDoHistoricoRef = useRef<HTMLDivElement>(null);

  const envioTexto = () => {
    const autor = nome.trim();
    const conteudo = texto.trim();

    if (!autor) {
      setAviso('A declaração exige a assinatura de seu autor.');
      return;
    }

    if (!conteudo) {
      setAviso('Nenhuma declaração foi redigida.');
      return;
    }

    if (!socket.connected) {
      setAviso('O salão está incomunicável. Aguarde o restabelecimento.');
      return;
    }

    socket.emit('enviar_argumento', {
      autor,
      conteudo,
    });

    setTexto('');
    setAviso('');
  };

  useEffect(() => {
    const aoConectar = () => {
      setEstadoConexao('conectado');
      setAviso('');
    };

    const aoDesconectar = () => {
      setEstadoConexao('desconectado');
    };

    const aoFalharConexao = () => {
      setEstadoConexao('desconectado');
    };

    const aoReceberArgumento = (dados: Argumento) => {
      if (
        typeof dados?.autor !== 'string' ||
        typeof dados?.conteudo !== 'string'
      ) {
        return;
      }

      const autor = dados.autor.trim();
      const conteudo = dados.conteudo.trim();

      if (!autor || !conteudo) {
        return;
      }

      setMensagens((mensagensAnteriores) => [
        ...mensagensAnteriores,
        {
          id: criarIdMensagem(),
          autor,
          conteudo,
        },
      ]);
    };

    socket.on('connect', aoConectar);
    socket.on('disconnect', aoDesconectar);
    socket.on('connect_error', aoFalharConexao);
    socket.on('novo_argumento_na_tela', aoReceberArgumento);

    if (socket.connected) {
      aoConectar();
    }

    return () => {
      socket.off('connect', aoConectar);
      socket.off('disconnect', aoDesconectar);
      socket.off('connect_error', aoFalharConexao);
      socket.off('novo_argumento_na_tela', aoReceberArgumento);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_NOME, nome);
    } catch {
      // A aplicação continua funcionando caso o armazenamento esteja indisponível.
    }
  }, [nome]);

  useEffect(() => {
    fimDoHistoricoRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [mensagens]);

  const conectado = estadoConexao === 'conectado';

  return (
  <div
    className="
      flex h-[100dvh] w-full items-center justify-center overflow-hidden
      bg-neutral-950
      bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
      from-neutral-800 to-neutral-950
      p-0 font-serif text-stone-800 selection:bg-stone-300
      md:p-4 xl:p-6
    "
  >
    <main
      className="
        manuscrito-entrar
        relative flex h-full w-full min-w-0 flex-col overflow-hidden
        bg-[#f0e6d2]
        md:h-[calc(100dvh-2rem)]
        md:w-[calc(100vw-2rem)]
        md:border md:border-stone-700/70
        md:shadow-[0_20px_60px_rgba(0,0,0,0.75)]
        xl:h-[calc(100dvh-3rem)]
        xl:w-[calc(100vw-3rem)]
        2xl:max-h-[920px]
        2xl:max-w-[1600px]
      "
    >
      {/* Molduras do manuscrito */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-2 z-20
          border border-stone-400/40
          md:inset-3
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-3 z-20
          border border-stone-500/60
          md:inset-4
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-4 z-20
          border-4 border-double border-stone-400/30
          md:inset-5
        "
      />

      {/* Ornamentação lateral para telas largas */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-12 top-1/2 z-0 hidden
          -translate-y-1/2 select-none text-5xl text-stone-400/20
          xl:block
        "
      >
        ❦
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute right-12 top-1/2 z-0 hidden
          -translate-y-1/2 rotate-180 select-none text-5xl text-stone-400/20
          xl:block
        "
      >
        ❦
      </div>

      {/* Cabeçalho */}
      <header
        className="
          relative z-10 shrink-0
          px-8 pb-4 pt-8 text-center
          md:px-12 md:pb-5 md:pt-9
          xl:pt-10
        "
      >
        <div
          aria-hidden="true"
          className="mb-1 text-lg text-stone-400 md:text-xl"
        >
          ⚜
        </div>

        <h1
          className="
            inline-block border-b-2 border-stone-800
            px-8 pb-3
            text-3xl font-bold uppercase tracking-[0.22em]
            text-stone-900
            md:text-4xl
            xl:text-5xl
          "
        >
          Ágora
        </h1>

        <p
          className="
            mx-auto mt-3 hidden max-w-4xl
            text-sm italic tracking-wide text-stone-600
            md:block xl:text-base
          "
        >
          &ldquo;A palavra é uma grande senhora que, com o menor e mais
          invisível corpo, realiza as obras mais divinas.&rdquo;
        </p>

        <div
          aria-live="polite"
          className="
            mt-3 flex items-center justify-center gap-2
            text-[0.65rem] font-bold uppercase tracking-[0.2em]
          "
        >
          <span
            aria-hidden="true"
            className={`h-2 w-2 border ${
              conectado
                ? 'selo-conectado border-emerald-900 bg-emerald-800'
                : 'border-red-950 bg-red-900'
            }`}
          />

          <span
            className={
              conectado ? 'text-emerald-900' : 'text-red-950'
            }
          >
            {conectado
              ? 'Salão conectado'
              : estadoConexao === 'conectando'
                ? 'Abrindo o salão'
                : 'Comunicação interrompida'}
          </span>
        </div>
      </header>

      {/* Histórico */}
      <section
        aria-label="Histórico dos debates"
        aria-live="polite"
        role="log"
        className="
          relative z-10 flex min-h-0 flex-1 flex-col items-center
          gap-8 overflow-y-auto overscroll-y-contain
          scroll-smooth px-8 pb-8 pt-2
          [-webkit-overflow-scrolling:touch]
          md:px-16
          lg:px-24
          xl:px-32
        "
      >
        {mensagens.map((mensagem, index) => (
          <article
            key={mensagem.id}
            className="
              argumento-entrar group flex w-full max-w-4xl
              flex-col items-center
            "
          >
            <div className="relative w-full text-justify">
              <h2
                className="
                  mx-auto mb-4 block w-2/3
                  border-b border-stone-300/60 pb-2
                  text-center text-xs font-bold uppercase
                  tracking-[0.15em] text-stone-900
                  md:w-1/2 md:text-sm
                "
              >
                O Ilustre{' '}
                <span className="text-amber-900">
                  {mensagem.autor}
                </span>
              </h2>

              <p
                className="
                  whitespace-pre-wrap break-words
                  text-lg leading-relaxed text-stone-800
                  first-letter:float-left
                  first-letter:mr-2
                  first-letter:text-6xl
                  first-letter:font-bold
                  first-letter:leading-none
                  first-letter:text-stone-900
                  md:text-xl md:leading-loose
                "
              >
                {mensagem.conteudo}
              </p>
            </div>

            {index !== mensagens.length - 1 && (
              <div
                aria-hidden="true"
                className="mb-1 mt-8 text-2xl text-stone-300"
              >
                ❦
              </div>
            )}
          </article>
        ))}

        {mensagens.length === 0 && (
          <div
            className="
              my-auto flex h-full min-h-32 flex-col
              items-center justify-center text-center
              italic text-stone-500/70
            "
          >
            <div aria-hidden="true" className="mb-3 text-3xl">
              ✍🏼
            </div>

            <p className="text-lg">
              O salão repousa em silêncio.
            </p>
          </div>
        )}

        <div ref={fimDoHistoricoRef} aria-hidden="true" />
      </section>

      {/* Área de escrita */}
      <form
        className="
          relative z-10 shrink-0
          border-t-2 border-stone-400/50
          bg-[#e8deca]
          px-7 pb-[max(1.5rem,env(safe-area-inset-bottom))]
          pt-5 shadow-inner
          md:px-10 md:py-6
          xl:px-16
        "
        onSubmit={(evento) => {
          evento.preventDefault();
          envioTexto();
        }}
      >
        <div
          className="
            mx-auto grid w-full max-w-7xl grid-cols-1 gap-5
            lg:grid-cols-[minmax(210px,0.75fr)_minmax(400px,2fr)_minmax(230px,0.8fr)]
            lg:items-end lg:gap-8
          "
        >
          {/* Nome */}
          <div className="flex min-w-0 flex-col">
            <label
              htmlFor="nome-do-orador"
              className="
                mb-1 text-xs font-bold uppercase
                tracking-widest text-stone-500
              "
            >
              Assinatura
            </label>

            <input
              id="nome-do-orador"
              className="
                h-12 w-full
                border-b-2 border-dashed border-stone-400
                bg-transparent px-2
                text-base italic text-stone-900
                placeholder-stone-400
                transition-colors
                focus:border-stone-800 focus:outline-none
                md:text-lg
              "
              placeholder="Vosso nome..."
              type="text"
              autoComplete="nickname"
              autoCapitalize="words"
              enterKeyHint="next"
              maxLength={LIMITE_NOME}
              value={nome}
              onChange={(evento) => {
                setNome(evento.target.value);
                setAviso('');
              }}
            />

            <span
              className="
                mt-1 text-right text-[0.65rem]
                tracking-wider text-stone-500
              "
            >
              {nome.length}/{LIMITE_NOME}
            </span>
          </div>

          {/* Discurso */}
          <div className="flex min-w-0 flex-col">
            <label
              htmlFor="discurso"
              className="
                mb-1 text-xs font-bold uppercase
                tracking-widest text-stone-500
              "
            >
              Discurso
            </label>

            <textarea
              id="discurso"
              rows={1}
              className="
                min-h-12 w-full resize-none
                border-b-2 border-dashed border-stone-400
                bg-transparent px-2 py-3
                text-base text-stone-900
                placeholder-stone-400
                transition-colors
                focus:border-stone-800 focus:outline-none
                md:max-h-24 md:text-lg
              "
              placeholder="Redija vosso argumento aqui..."
              autoCapitalize="sentences"
              enterKeyHint="send"
              maxLength={LIMITE_TEXTO}
              value={texto}
              onChange={(evento) => {
                setTexto(evento.target.value);
                setAviso('');
              }}
              onKeyDown={(evento) => {
                if (
                  evento.key === 'Enter' &&
                  !evento.shiftKey
                ) {
                  evento.preventDefault();
                  envioTexto();
                }
              }}
            />

            <div
              className="
                mt-1 flex justify-between gap-4
                text-[0.65rem] tracking-wider text-stone-500
              "
            >
              <span>Shift + Enter para nova linha</span>

              <span>
                {texto.length}/{LIMITE_TEXTO}
              </span>
            </div>
          </div>

          {/* Ação */}
          <div className="flex min-w-0 flex-col gap-2">
            <p
              role={aviso ? 'alert' : undefined}
              className="
                min-h-5 truncate text-center
                text-xs font-bold italic text-red-950
                lg:text-left
              "
              title={aviso}
            >
              {aviso || '\u00A0'}
            </p>

            <button
              type="submit"
              disabled={!conectado}
              className="
                h-14 w-full touch-manipulation
                border border-stone-700 bg-stone-900
                px-6
                font-bold uppercase tracking-[0.16em]
                text-stone-100
                shadow-[4px_4px_0px_0px_#78716c]
                transition-[transform,background-color,box-shadow]
                duration-150
                hover:bg-stone-800
                active:translate-x-[2px]
                active:translate-y-[3px]
                active:shadow-[1px_1px_0px_0px_#78716c]
                disabled:cursor-not-allowed
                disabled:bg-stone-500
                disabled:text-stone-300
                disabled:shadow-none
              "
            >
              {conectado
                ? 'Afixar Declaração'
                : 'Salão Incomunicável'}
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>
);
}

export default DebatePage;