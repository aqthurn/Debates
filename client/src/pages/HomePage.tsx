import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <Link className="home-logo" to="/">
          ÁGORA
        </Link>

        <nav className="home-navigation" aria-label="Navegação principal">
          <a href="#como-funciona">Como funciona</a>

          <Link className="home-header-button" to="/debate">
            Entrar
          </Link>
        </nav>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-hero-content">
            <span className="home-game-status">
              TEMPORADA I · ARENA ABERTA
            </span>

            <p className="home-pretitle">
              Uma arena para o combate de ideias
            </p>

            <h1>
              Defenda sua tese.
              <br />
              Conquiste a audiência.
            </h1>

            <p className="home-description">
              Participe de debates rápidos, responda ao seu oponente
              em rodadas e seja avaliado pela força dos seus argumentos.
            </p>

            <div className="home-actions">
              <Link className="retro-button retro-button-primary" to="/debate">
                Entrar na arena
              </Link>

              <a
                className="retro-button retro-button-secondary"
                href="#como-funciona"
              >
                Como funciona
              </a>
            </div>

            <div className="home-online">
              <span className="home-online-dot" />
              Salão conectado
            </div>
          </div>

          <div className="battle-panel">
            <div className="battle-panel-header">
              <span>DEBATE DEMONSTRATIVO</span>
              <span className="live-indicator">AO VIVO</span>
            </div>

            <div className="battle-topic">
              <span>TEMA DA ARENA</span>

              <h2>
                A tecnologia amplia ou limita a liberdade?
              </h2>
            </div>

            <div className="battle-round">
              <span>RODADA II</span>
              <strong>01:24</strong>
            </div>

            <div className="battle-players">
              <article className="battle-player battle-player-thesis">
                <span className="player-position">TESE</span>
                <h3>Marcus</h3>
                <p>NÍVEL 12</p>

                <div className="reputation-bar">
                  <span style={{ width: '72%' }} />
                </div>

                <small>72 RP</small>
              </article>

              <div className="battle-versus">VS</div>

              <article className="battle-player battle-player-antithesis">
                <span className="player-position">ANTÍTESE</span>
                <h3>Helena</h3>
                <p>NÍVEL 10</p>

                <div className="reputation-bar">
                  <span style={{ width: '68%' }} />
                </div>

                <small>68 RP</small>
              </article>
            </div>

            <p className="battle-message">
              A audiência está deliberando...
            </p>
          </div>
        </section>

        <section id="como-funciona" className="how-section">
          <div className="section-heading">
            <span>MANUAL DO ORADOR</span>
            <h2>Como funciona</h2>
            <p>
              Entre na arena, assuma uma posição e defenda seu argumento.
            </p>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">I</span>
              <h3>Escolha o tema</h3>
              <p>
                Entre em um debate existente ou crie uma nova arena.
              </p>
            </article>

            <article className="step-card">
              <span className="step-number">II</span>
              <h3>Assuma uma posição</h3>
              <p>
                Defenda a Tese ou enfrente-a como Antítese.
              </p>
            </article>

            <article className="step-card">
              <span className="step-number">III</span>
              <h3>Conquiste o público</h3>
              <p>
                Apresente argumentos claros e receba os votos da audiência.
              </p>
            </article>
          </div>
        </section>

        <section className="home-final-cta">
          <span>PRONTO PARA O PRÓXIMO CONFRONTO?</span>

          <h2>A palavra é sua arma.</h2>

          <p>
            Entre na Ágora e participe da primeira batalha de argumentos.
          </p>

          <Link className="retro-button retro-button-primary" to="/debate">
            Iniciar debate
          </Link>
        </section>
      </main>

      <footer className="home-footer">
        <strong>ÁGORA</strong>
        <span>Um espaço para discordar com inteligência.</span>
      </footer>
    </div>
  );
}