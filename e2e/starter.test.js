/* eslint-env jest */
/* global device, element, by */
describe('Starter test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should launch the app', async () => {
    // Basic test to ensure the app launches.
    // We can add more specific selectors once the app UI stabilizes for E2E.
    // await expect(element(by.text('Log In'))).toBeVisible();
  });
});
