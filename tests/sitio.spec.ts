import { test, expect, type Page } from '@playwright/test';

const paginas = [
  { ruta: '/', titulo: /ISALBÁN/ },
  { ruta: '/proyectos/', titulo: /Proyectos/ },
  { ruta: '/sobre-mi/', titulo: /Sobre mí/ },
  { ruta: '/contacto/', titulo: /Contacto/ },
];

const esMovil = (page: Page) => (page.viewportSize()?.width ?? 1440) < 768;

async function imagenesCargadas(page: Page) {
  const imgs = page.locator('main img');
  for (const img of await imgs.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveJSProperty('complete', true);
    expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  }
}

test.describe('Navegación permanente', () => {
  for (const { ruta, titulo } of paginas) {
    test(`menú consistente en ${ruta}`, async ({ page }) => {
      await page.goto(ruta);
      await expect(page).toHaveTitle(titulo);

      const nav = page.getByRole('navigation', { name: 'Principal' });
      await expect(nav.getByRole('link')).toHaveText(['Proyectos', 'Sobre mí', 'Contacto']);
      await expect(page.getByRole('link', { name: /ir al inicio/ })).toHaveAttribute('href', '/');

      // Sin desbordamiento horizontal (clave en móvil)
      const desborde = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(desborde).toBeLessThanOrEqual(0);
    });
  }

  test('los enlaces del menú y el logotipo llevan a su página', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Principal' });

    await nav.getByRole('link', { name: 'Proyectos' }).click();
    await expect(page).toHaveURL(/\/proyectos\/$/);
    await expect(nav.getByRole('link', { name: 'Proyectos' })).toHaveAttribute('aria-current', 'page');

    await nav.getByRole('link', { name: 'Sobre mí' }).click();
    await expect(page).toHaveURL(/\/sobre-mi\/$/);

    await nav.getByRole('link', { name: 'Contacto' }).click();
    await expect(page).toHaveURL(/\/contacto\/$/);

    await page.getByRole('link', { name: /ir al inicio/ }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test('inicio: imagen principal y campos profesionales', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('list', { name: 'Campos de trabajo' }).getByRole('listitem')).toHaveText([
    'Diseño editorial',
    'Diseño de identidad visual',
    'Diseño de información',
  ]);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Isabella Albán');
  await imagenesCargadas(page);
});

test.describe('Proyectos', () => {
  const esperados = [
    { titulo: 'ISALBÁN', etiquetas: ['Diseño de identidad visual', 'Identidad personal'] },
    { titulo: 'No - Manual de urbanidad de bolsillo para mujeres', etiquetas: ['Diseño editorial'] },
    { titulo: 'Those who remain silent', etiquetas: ['Diseño editorial', 'Creación de imagen'] },
    { titulo: '¿Como, cocino cáncer?', etiquetas: ['Diseño de información', 'Diseño de infografía'] },
  ];

  test('muestra los cuatro proyectos completos', async ({ page }) => {
    await page.goto('/proyectos/');
    const tarjetas = page.locator('.proyecto');
    await expect(tarjetas).toHaveCount(4);

    for (const [i, { titulo, etiquetas }] of esperados.entries()) {
      const tarjeta = tarjetas.nth(i);
      await expect(tarjeta.getByRole('heading', { level: 2 })).toHaveText(titulo);
      await expect(tarjeta.locator('.proyecto__descripcion')).not.toBeEmpty();
      await expect(tarjeta.getByRole('list', { name: 'Categorías' }).getByRole('listitem')).toHaveText(etiquetas);
    }
    await imagenesCargadas(page);
  });

  test('cuadrícula: 2 columnas en escritorio, 1 en móvil', async ({ page }) => {
    await page.goto('/proyectos/');
    const columnas = await page
      .locator('.proyectos')
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columnas).toBe(esMovil(page) ? 1 : 2);
  });

  test('overlay visible con hover (escritorio) o al tocar / enfocar (móvil y teclado)', async ({ page }) => {
    await page.goto('/proyectos/');
    const media = page.locator('.proyecto__media').nth(1);
    const capa = media.locator('.proyecto__capa');
    await expect(capa).toHaveCSS('opacity', '0');

    if (esMovil(page)) {
      await media.tap();
    } else {
      await media.hover();
    }
    await expect(capa).toHaveCSS('opacity', '1');
    await expect(capa).toContainText('No - Manual de urbanidad');
  });
});

test('sobre mí: nombre, presentación y fotografía', async ({ page }) => {
  await page.goto('/sobre-mi/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Isabella Andrea Albán Fernández/);
  await expect(page.locator('.perfil__presentacion')).toContainText('Diseño proyectos editoriales y de información');
  await expect(page.getByRole('img', { name: /Retrato de Isabella/ })).toBeVisible();
  await imagenesCargadas(page);
});

test('contacto: enlaces de correo, teléfono y redes', async ({ page }) => {
  await page.goto('/contacto/');
  await expect(page.locator('.contacto__mensaje')).toHaveText(
    'Si te gustó mi trabajo y mi mirada del diseño, contáctame y ¡Trabajemos juntos por tu proyecto!',
  );

  await expect(page.getByRole('link', { name: 'isabellaalbanfernandez@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:isabellaalbanfernandez@gmail.com',
  );
  await expect(page.getByRole('link', { name: '(+57) 320 612 4139' })).toHaveAttribute('href', 'tel:+573206124139');

  const redes: Record<string, string> = {
    WhatsApp: 'https://wa.me/573206124139',
    'Correo electrónico': 'mailto:isabellaalbanfernandez@gmail.com',
    LinkedIn: 'https://www.linkedin.com/in/isabella-alban-2048a6436',
    Instagram: 'https://www.instagram.com/andreadesignery',
    Behance: 'https://www.behance.net/isabellalbnf',
  };
  for (const [red, href] of Object.entries(redes)) {
    const enlace = page.locator(`[data-red="${red}"]`);
    await expect(enlace).toHaveAttribute('href', href);
    await expect(enlace).toBeVisible();
    const caja = await enlace.boundingBox();
    expect(caja!.width).toBeGreaterThanOrEqual(44); // tamaño táctil mínimo
  }
});
