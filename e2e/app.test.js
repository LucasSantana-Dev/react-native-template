describe('App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show welcome screen', async () => {
    await expect(element(by.text('Welcome'))).toBeVisible();
  });

  it('should navigate to explore screen', async () => {
    await element(by.text('Explore')).tap();
    await expect(element(by.text('Explore'))).toBeVisible();
  });
});
