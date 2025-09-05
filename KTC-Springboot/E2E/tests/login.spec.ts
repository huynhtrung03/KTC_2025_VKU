import { test, expect } from '@playwright/test';

const BASE_URL = 'https://aptech-tester.web.app/login';

test('đăng nhập thành công ', async ({ page }) => {
    const username = 'admin';
    const password = 'Tester@123';
  await page.goto(BASE_URL);
    await page.locator('#login-form_username').fill(username);
    await page.locator('#login-form_password').fill(password);
    // Chụp màn hình để lưu giữ lại
    await page.screenshot({ path: './screen-shots/screenshot.png' });
    await page.locator('#login-form > div:nth-child(4) > div > div > div > div > button').click();
    //dừng 500ms
    await page.waitForTimeout(500);

    

    //mong đợi đăng nhâp thành công sẽ chuyển hướng sang: https://aptech-tester.web.app/home
    await expect(page).toHaveURL('https://aptech-tester.web.app/home');
});













test('đăng nhập thất bại  #1 ', async ({ page }) => {
    const username = 'admin';
    const password = 'Tester@12';
  await page.goto(BASE_URL);
    await page.locator('#login-form_username').fill(username);
    await page.locator('#login-form_password').fill(password);
    await page.locator('#login-form > div:nth-child(4) > div > div > div > div > button').click();
    //dừng 500ms
    await page.waitForTimeout(500);
    //mong đợi đăng nhâp thất bại vẫn ở trang login
    await expect(page).toHaveURL('https://aptech-tester.web.app/login');
});

test('đăng nhập thất bại  #2 ', async ({ page }) => {
    const username = 'adm';
    const  password =   'Tester@123';              
    await page.goto(BASE_URL);  
    await page.locator('#login-form_username').fill(username);
    await page.locator('#login-form_password').fill(password);
    await page.locator('#login-form > div:nth-child(4) > div > div > div > div > button').click();
    //dừng 500ms
    await page.waitForTimeout(500);
    //mong đợi đăng nhâp thất bại vẫn ở trang login
    await expect(page).toHaveURL('https://aptech-tester.web.app/login');
});
test('đăng nhập thất bại  #3 ', async ({ page }) => {
    const username = 'admin';
    const password = 'wrongpassword';
    await page.goto(BASE_URL);
    await page.locator('#login-form_username').fill(username);
    await page.locator('#login-form_password').fill(password);
    await page.locator('#login-form > div:nth-child(4) > div > div > div > div > button').click();
    //dừng 500ms
    await page.waitForTimeout(500);
    //mong đợi đăng nhâp thất bại vẫn ở trang login
    await expect(page).toHaveURL('https://aptech-tester.web.app/login');
});
