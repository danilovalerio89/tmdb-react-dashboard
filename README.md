# 🎬 Movie Dashboard

https://tmdb-react-dashboard.vercel.app/

> Projeto de estudo desenvolvido para praticar e demonstrar conhecimento em consumo de dados assíncronos, cache/revalidação e arquitetura front-end escalável em um cenário próximo do real.

Dashboard de filmes com busca, filtros e paginação server-side, construído sobre a TMDB API. O foco não é o produto em si, mas evidenciar boas práticas de arquitetura, separação de responsabilidades e tratamento consistente de estados assíncronos (loading, erro, sucesso).

## Objetivo do projeto

Este repositório faz parte do meu portfólio de estudos em React e foi criado especificamente para:

- Praticar **cache e revalidação de dados** com TanStack React Query (algo não explorado nos projetos anteriores do portfólio, que usavam apenas `fetch`/estado local).
- Consolidar o uso de uma **camada HTTP centralizada** com Axios, incluindo tratamento e normalização de erros.
- Reforçar a arquitetura **feature-based** já usada em projetos anteriores, agora aplicada a um cenário com paginação e filtros combinados vindos de uma API externa real.
- Padronizar **feedback de UI** (loaders e toasters) como componentes reutilizáveis, independentes de qualquer regra de negócio.

## Stack

- **React 18 + Vite + TypeScript**
- **Chakra UI v3** — componentes e tema
- **Axios** — cliente HTTP centralizado
- **TanStack React Query** — cache, revalidação, estados de loading/erro
- **TMDB API** — fonte de dados pública

## Status

✅ Projeto testado e funcional — busca, filtros por gênero/ordenação, paginação server-side, loaders e toasters de erro operando conforme esperado.

## Arquitetura

```
src/
  api/            # cliente axios único + normalização de erros
  lib/            # configuração do React Query
  theme/          # provider e tokens do Chakra
  components/ui/  # loader e toaster reutilizáveis, sem lógica de negócio
  features/
    movies/
      api/        # chamadas HTTP específicas de filmes
      hooks/      # useMovies, useGenres (React Query)
      components/ # MovieCard, MovieGrid, MovieFilters, MoviePagination
      types/
  pages/          # composição das features em telas
```

Cada camada só conhece a camada imediatamente abaixo: componentes de apresentação (`MovieCard`) não sabem de API; hooks (`useMovies`) não chamam axios diretamente, apenas a camada `api/`; a página (`DashboardPage`) apenas orquestra estado de filtros e delega o resto.

### Decisões de design

- **Paginação server-side via React Query**, com `keepPreviousData` para evitar flash de loading ao trocar de página — o dado anterior permanece visível até a nova página responder.
- **Erros centralizados**: qualquer falha de rede é normalizada em `toApiError` e disparada como toast a partir do hook, não do componente.
- **Toaster e Loader como componentes de UI puros**, reaproveitáveis por qualquer feature futura sem acoplamento à lógica de filmes.
- **Sem React Compiler** no `vite.config.ts`, por consistência com o aprendizado do projeto de formulário anterior (incompatibilidade com libs baseadas em refs).

## Rodando o projeto

```bash
npm install
cp .env.example .env   # adicione seu token da TMDB
npm run dev
```

## Limitações conhecidas e melhorias futuras

- **Sem testes automatizados** — próximo passo natural: Vitest + Testing Library cobrindo os hooks (`useMovies`, `useGenres`) e o fluxo de filtros/paginação.
- **Sem debounce na busca por texto** — cada tecla digitada no campo de busca dispara uma nova query; ideal aplicar debounce (~400ms) para reduzir chamadas à API.
- **Filtro por texto e por gênero são mutuamente exclusivos**, pois usam endpoints diferentes da TMDB (`/search/movie` vs `/discover/movie`) — combinar os dois exigiria uma estratégia diferente de busca.
- **Sem tratamento de rate limit específico da TMDB** — apenas retry simples configurado no React Query; poderia evoluir para backoff exponencial.
- **Sem página de detalhes do filme** — clicar em um card não leva a nenhuma rota; um próximo passo natural seria adicionar React Router e uma tela de detalhes (elenco, sinopse completa, trailers).
- **Sem persistência de filtros na URL** — atualizar a página reseta os filtros; sincronizar o estado com query params (`useSearchParams`) melhoraria a experiência (permite compartilhar/voltar com filtros aplicados).
- **Sem dark mode** — o Chakra v3 já suporta color mode nativamente; seria uma extensão rápida.
- **Sem virtualização da grid** — para volumes maiores de resultados, poderia usar `react-virtual` para melhorar performance de renderização.
- **Token da TMDB exposto** - no bundle do cliente, em produção real migrar as chamadas para uma serverless function que guarde a chave no servidor.
