<p align="center">
  <img width=300 src="https://raw.githubusercontent.com/vibe-engineers/landing-page/main/public/images/light-theme-logo.webp" />
  <h1 align="center">Vibe Engineers Landing Page</h1>
</p>

<p align="center">
  <a href="https://github.com/vibe-engineers/landing-page/actions/workflows/ci-cd-pipeline.yml"> <img src="https://github.com/vibe-engineers/landing-page/actions/workflows/ci-cd-pipeline.yml/badge.svg" /> </a>
  <a href="https://github.com/vibe-engineers/landing-page/actions/workflows/lint-test.yml"> <img src="https://github.com/vibe-engineers/landing-page/actions/workflows/lint-test.yml/badge.svg" /> </a>
  <a href="https://github.com/vibe-engineers/landing-page/actions/workflows/build-deploy.yml"> <img src="https://github.com/vibe-engineers/landing-page/actions/workflows/build-deploy.yml/badge.svg" /> </a>
  <a href="https://github.com/vibe-engineers/landing-page/blob/main/LICENSE"><img src="https://img.shields.io/github/license/vibe-engineers/landing-page.svg" /></a>
</p>

## Table of Contents
* [Introduction](#introduction)
* [Features](#features)
* [Getting Started](#getting-started)
* [Technologies](#technologies)
* [Team](#team)
* [Contributing](#contributing)
* [Others](#others)

### Introduction
**Vibe Engineers Landing Page** is the main website for introducing and showcasing the Vibe Engineers toolkit. This simple landing page shares not just tools, but also the philosophy behind their creation of the tools. The site is fully localized and serves as the single source of truth for product messaging across audiences.

The production build is generated with **Next.js** and can be previewed locally with:
```bash
npm install
npm run dev
```

### Features
- **Localized Experience**: Ships with English and Mandarin support out of the box using `next-intl`, including locale-aware routing and content bundles.
- **Motion-Driven Storytelling**: Framer Motion animations and confetti effects deliver an energetic hero and smooth section reveals across the page.
- **Composable UI Library**: Shared layout primitives such as headers, footers, and motion wrappers keep the design cohesive while enabling rapid iteration.
- **Product Showcases**: Dedicated sections highlight flagship Vibe tools with responsive grids, tabbed code samples, and contextual CTAs.
- **Tested Reliability**: Vitest and Testing Library suites cover routing, layout, and component behavior to keep the marketing surface stable.

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/vibe-engineers/landing-page.git
   cd landing-page
   ```
2. Install dependencies and run the local server:
   ```bash
   npm install
   npm run dev
   ```
3. Build, lint, test, or type-check as needed:
   ```bash
   npm run build
   npm run lint
   npm run test
   npm run typecheck
   ```

### Technologies
Technologies used by the landing page are as below:
##### Done with:

<p align="center">
  <img height="150" width="150" src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png"/>
</p>
<p align="center">
Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Radix UI · next-intl
</p>

##### Project Repository
```
https://github.com/vibe-engineers/landing-page
```

### Team
* [Kong Le-Yi](https://github.com/konglyyy)
* [Tan Jin](https://github.com/tjtanjin)

### Contributing
If you are looking to contribute to the project, please read the issue and pull request templates in [`.github`](./.github) and review the coding standards defined by the component library.

In general, the forking workflow is encouraged and you may open a pull request with clear descriptions on the changes and what they are intended to do (enhancement, bug fixes etc). Alternatively, you may simply raise bugs or suggestions by opening an [**issue**](https://github.com/vibe-engineers/landing-page/issues) or raising it up on [**discord**](https://discord.gg/dBW35GBCPZ).

Note: Templates have been created for pull requests and issues to guide you in the process.

### Others
For any questions regarding the implementation of the project, you may also reach out on [**discord**](https://discord.gg/dBW35GBCPZ).