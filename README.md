# MeetSync - MVP

## Boas práticas de contribuição com o projeto
- Sempre que for iniciar uma issue:
1. Crie uma branch com nome explicativo: numerodaissue-explicacao-da-issue, e edite apenas a sua branch
ex. 1-criacao-menu

- Ao terminar uma branch:
1. Adicione um comentário na issue com evidências de que sua branch foi cumprida(fotos/vídeos)
2. Para enviar suas alterações: `git add <arquivos>` -> `git commit -m "<mensagem>"` -> `git push`
3. No github: abra o *pull request*

- Para atualizar sua branch com a main: dentro da branch, digite `git pull origin main`



## Descrição

MeetSync é uma aplicação projetada para facilitar a criação e gestão de salas de reuniões, permitindo a votação e geração de relatórios sobre horários mais votados. Este repositório contém o código-fonte do MVP (Minimum Viable Product) da aplicação, desenvolvido utilizando metodologias ágeis.

## Equipe

### Frontend
- **Aline de Brito das Neves**
- **Ana Beatriz da Silva Truta**
- **Lívia Aniely de Oliveira Almeida**

### Backend
- **Matheus Victor Pereira**
- **Joab Cesar Morais Pinheiro**
- **Iago Henrique de Souza Silva**

### Scrum Master (em rodízio)
- Iago Henrique de Souza Silva
- Lívia Aniely de Oliveira Almeida
- Matheus Victor Pereira

### Product Owner
- **Iago Henrique de Souza Silva**

## Descrição do MVP

O MVP de MeetSync inclui as seguintes funcionalidades, divididas entre frontend e backend:

### Frontend
1. **Prototipação das telas no Figma** (mobile e web)
   - Tela inicial
   - Tela de criação de sala
   - Tela de votação
2. **Desenvolvimento das funcionalidades** (mobile e web)
   - Tela inicial
   - Tela de criação de sala
   - Componente de votação
   - Componente de relatório
3. **Testes de GUI** para as telas desenvolvidas
4. **Criação da logo do projeto**

### Backend
1. **Modelagem do Banco de Dados**
2. **Geração de diagramas REM e UML**
3. **Desenvolvimento de funcionalidades principais**
   - Criar sala
   - Visualizar sala através de link
   - Atualizar sala
   - Remover sala
   - Gerar relatório de horários mais votados
   - Gerar identificador único de usuário
4. **Integração entre frontend e backend**
5. **Correção de erros e testes de integração**

## Cronograma e Sprints

Utilizamos a metodologia ágil SCRUM com sprints de duas semanas e reuniões semanais. As reuniões internas ocorrem toda segunda-feira às 19h via Discord.

### Datas das Sprints

- **Sprint 1:** 24/07/24 - 06/08/24
- **Sprint 2:** 07/08/24 - 20/08/24
- **Sprint 3:** 21/08/24 - 03/09/24
- **Sprint 4:** 04/09/24 - 17/09/24
- **Sprint 5:** 18/09/2024 - 24/09/2024

## Arquitetura e Principais Tecnologias

A aplicação é inicialmente uma aplicação web com as seguintes tecnologias:

- **Frontend:** Desenvolvido em [tecnologia a ser especificada]
- **Backend:** Desenvolvido em [tecnologia a ser especificada]
- **Banco de Dados:** [Especificar o SGBD]
- **Hospedagem Backend e Banco de Dados:** VPS (possivelmente na Hostinger)
- **Hospedagem Frontend:** Vercel

## Testes Críticos

1. **Testes de Fluxos Principais:**
   - Verificação de criação de sala por um usuário.
   - Testes de votação em uma sala criada.
   - Teste de múltiplos usuários votando na mesma sala.
2. **Testes de Integração:**
   - Verificação da comunicação entre frontend e backend.
3. **Testes de Desempenho:**
   - Avaliação do comportamento do sistema sob carga.
4. **Testes de Usabilidade:**
   - Garantia de uma interface intuitiva e fácil de usar.

## Riscos Identificados

- **Curva de aprendizado:** A inexperiência com certas tecnologias pode causar atrasos.
- **Subestimação do tamanho do projeto:** Pode levar a falta de tempo para o desenvolvimento completo.
- **Problemas de comunicação ou saúde:** Podem afetar o andamento do projeto.