// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // Cuando exista el dominio definitivo en Vercel, definirlo aquí
  // (habilita URLs canónicas y Open Graph absolutas).
  // site: 'https://isalban.vercel.app',
  integrations: [icon({ include: { ri: ['*'] } })],
  devToolbar: { enabled: false },
  image: {
    responsiveStyles: false,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
