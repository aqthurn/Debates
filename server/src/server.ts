import express, { type Request, type Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('API da Arena Rodando com TypeScript');
});

io.on('connection', (socket) => {
    console.log(`[+] Novo debatedor conectado: ${socket.id}`);
  
    // Fica escutando argumentos do front (agora DENTRO do bloco 'connection')
    socket.on('enviar_argumento', (dados) => {
        console.log(`Argumento de ${socket.id}:`, dados);
        // Emite para todo mundo conectado
        io.emit('novo_argumento_na_tela', dados);
    });

    socket.on('disconnect', () => {
        console.log(`[-] Debatedor saiu: ${socket.id}`);
    });
}); 

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(` Servidor HTTP rodando na porta ${PORT}`);
    console.log(` WebSocket aguardando conexões...`);
});