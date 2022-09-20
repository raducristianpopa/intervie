<p align="center">
  <a href="#"></a>
  <p align="center">
   <img width="150" height="150" src="https://raw.githubusercontent.com/intervieapp/.github/main/profile/intervie_icon_white_512x512.png?token=GHSAT0AAAAAABP5L76AIWEYRYTKEPUC7KTYYZAXFAA" alt="Logo">
  </p>
  <h1 align="center"><b>Intervie</b></h1>
  <p align="center">
    An interview assistant from the future.<br />
    <a href="https://github.com/intervieapp"><strong>intervie »</strong></a>
  </p>
</p>

## Getting started

**Intervie** is using `pnpm` by default. This is a fast alternative to `npm` for installing packages. If you do not have `pnpm` installed on your local machine, you can download the latest version here: https://pnpm.io/

First of all, we need to install the dependencies:

```bash
pnpm install
```

You'll also need to copy the example environment file into your local environment file. This file isn't tracked on git, and should not be committed:

```bash
cp .env.example .env
```

Before we start the development process we need to setup the workspace settings. This command is going to allow only `pnpm` in this workspace and prepare [Husky](https://github.com/typicode/husky).

```bash
pnpm setup
```

Now we need to start up the docker enviroment.

```bash
pnpm dev:docker
```

Once we have the docker enviroment set up we can run the Prisma migrations and generate the models.

```bash
pnpm prisma:migrate
```

```bash
pnpm prisma:generate
```

Now we should be able to start the development process. This will start the Docker image and start our Next.js application

```bash
pnpm dev
```

The site should now be available on localhost:3000!
