import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // 🔐 One-time login
  globalSetup: './global-setup.ts',

  // Run sequentially (recommended when using shared auth)
  workers: 1,

  use: {
    baseURL: 'https://hon-orange-jellyfish.rootquotient.revolte.io',
    storageState: 'auth.json',
    headless: false,
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
