FROM gitpod/workspace-full

RUN brew install \
    gh \
    neovim \
    shellcheck \
    shfmt \
    starship ;

RUN pnpm add -g pnpm ;

RUN pnpm add -g \
    dotenv-vault \
    @brlt/n \
    @brlt/prettier \
    prettier \
    prettier-plugin-sh \
    prettier-plugin-svelte \
    typescript \
    ts-node \
    @types/node \
    wrangler@beta \
    miniflare \
    vercel \
    @railway/cli \
    prisma ;
