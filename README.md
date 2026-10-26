# OUR BRAND sign-in page

This standalone React page is built into `../login`, which the existing storefront links to. The rest of the storefront remains plain HTML, CSS, and JavaScript.

From this directory, run:

```sh
npm install
npm run dev
```

Build the static page into `../login` with:

```sh
npm run build
```

The shadcn-compatible UI component is in `src/components/ui/sign-in.tsx`; `components.json` maps the `ui` alias to that directory. Tailwind CSS 4 and TypeScript are configured for this page.

Sign-in, password reset, account creation, and Google authentication are UI-only until an authentication provider is connected. The form does not transmit or store credentials.
