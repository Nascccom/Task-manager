describe('inputLine', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:6006/iframe.html?args=&id=todolists-inputline--input-line-without-error&viewMode=story')
    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})