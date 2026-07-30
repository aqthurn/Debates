import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Estabelece a conexão com o servidor que acabamos de criar
const socket = io('http://localhost:3001');


function App() {
  const [mensagem, setMensagem] = useState('');
  const [texto, setTexto] = useState('');

  const envioTexto = () => {
    if(texto.trim() === '') return;
    
    console.log("Usuario quer enviar:", texto)
      socket.emit('enviar_argumento', texto)
      setTexto('');
  }

  useEffect(() => {
    // Fica escutando os argumentos devolvidos pelo backend
    socket.on('novo_argumento_na_tela', (dados) => {
      setMensagem(dados);
    });

    // Limpa o ouvinte quando o componente for desmontado
    return () => {
      socket.off('novo_argumento_na_tela');
    };
  }, []);

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Arena de Debates ⚔️</h1>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button onClick={envioTexto}>Enviar Texto</button>

      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Último argumento na arena:</h3>
        <p style={{ color: '#2980b9', fontSize: '20px', fontWeight: 'bold' }}>
          {mensagem || 'Aguardando oponentes...'}
        </p>
      </div>
    </div>
   
  );
}

export default App;