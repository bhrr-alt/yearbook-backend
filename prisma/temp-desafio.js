import prisma from './prisma/client.js';

// Desafio 1 - Buscar um aluno inexistente
const alunoInexistente = await prisma.aluno.findUnique({
  where: {
    id: 999,
  },
});

console.log('Aluno inexistente:', alunoInexistente);

// Desafio 2 - Listar alunos sem senhaHash
const alunosSemSenha = await prisma.aluno.findMany({
  select: {
    id: true,
    nome: true,
    email: true,
    cidade: true,
    frase: true,
    planosFuturos: true,
    fotoUrl: true,
    role: true,
    criadoEm: true,
  },
});

console.log('Alunos sem senhaHash:', alunosSemSenha);

// Desafio 3 - Criar uma mensagem
const novaMensagem = await prisma.mensagem.create({
  data: {
    texto: 'Salve, turma! Vamos com tudo nesse último ano!',
    autorId: 1,
  },
});

console.log('Mensagem criada:', novaMensagem);

// Desafio 3 - Listar mensagens com dados do autor
const mensagens = await prisma.mensagem.findMany({
  include: {
    autor: {
      select: {
        nome: true,
        fotoUrl: true,
      },
    },
  },
});

console.log('Mensagens com autor:', JSON.stringify(mensagens, null, 2));

await prisma.$disconnect();