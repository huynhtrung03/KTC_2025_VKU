import { test, expect } from '@playwright/test';
import users from './data/users.json';

const BASE_URL = 'https://aptech-tester.web.app/login';

users.forEach((user) => {
    test(`đăng nhập thành công với user ${user.username}`, async ({ page }) => {
        const username = user.username;
        const password = user.password;
        await page.goto(BASE_URL);
        await page.locator('#login-form_username').fill(username);
    await page.locator('#login-form_password').fill(password);
    await page.locator('#login-form > div:nth-child(4) > div > div > div > div > button').click();
    //dừng 500ms
    await page.waitForTimeout(500);

    

    //mong đợi đăng nhâp với tài khoản mật khẩu đúng thì sẽ chuyển hướng sang: https://aptech-tester.web.app/home
    await expect(page).toHaveURL('https://aptech-tester.web.app/home');

});
});

// Vòng lặp kiểm tra đăng nhập thất bại với mật khẩu sai
users.forEach((user) => {
    test(`đăng nhập thất bại với user ${user.username} và mật khẩu sai`, async ({ page }) => {
        const username = user.username;
        const password = user.password;
        await page.goto(BASE_URL);
        await page.locator('#login-form_username').fill(username);
        await page.locator('#login-form_password').fill(password);
        await page.locator('#login-form > div:nth-child(4) > div > div > div > div > button').click();
        await page.waitForTimeout(500);
        // mong đợi đăng nhập thất bại sẽ ở lại trang đăng nhập
        await expect(page).toHaveURL('https://aptech-tester.web.app/login');
    });
});




