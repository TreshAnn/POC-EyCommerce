# EyCommerce

POC: ECommerce application clone

## Apps and Packages

- `web`: another [Next.js](https://nextjs.org/) app
- `api`: backend build with [NestJS](https://nestjs.com) app
- `ui`: a stub React component library shared by both `web` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Installation requirements

- [Node.js v16+](https://nodejs.org/)
- [VSCode](https://code.visualstudio.com/)

## Utilities

This project has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Building application

To build all apps and packages, run the following command:

```bash
cd ey-commerce
pnpm build
```

## Developer mode

To develop all apps and packages, run the following command:

```bash
cd my-turborepo
pnpm dev
```

## Technologies used

- [ESLint](https://eslint.org/)
- [husky](https://github.com/typicode/husky)
- [lint-staged](https://github.com/okonet/lint-staged)
- [Prettier](https://prettier.io/)
- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Nest.js](https://nestjs.com/)
- [Turbo Repo](https://turbo.build//)
