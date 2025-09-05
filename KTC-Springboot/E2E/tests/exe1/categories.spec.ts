import { test, expect } from '@playwright/test';


// Trước khi chạy mỗi test case
test.beforeEach(async ({ page }) => {
  // Đảm bảo luôn login trước khi chạy testcase
  await page.goto('https://os-admin.aptech.io/login');

  // Thực hiện login
  await page.getByPlaceholder('Enter email').fill('tungnt@softech.vn');
  await page.getByPlaceholder('Enter password').fill('123456789');
  await page.getByRole('button', { name: 'Log In' }).click();

  // Chờ cho đến khi chuyển trang
  await page.waitForURL('https://os-admin.aptech.io/dashboard');

  // Vào đúng đường dẫn
  await page.goto('https://os-admin.aptech.io/online-shop/data-management/categories');
});



test('TC1 - Categories: Nhập mới thành công', async ({ page }) => {
  // Khai báo biến
  const name = 'MacBook Pro 222';
  const description = 'MacBook Pro 222';

  await page.getByRole('textbox', { name: '* Name :' }).fill(name);
  await page.getByLabel('Description').fill(description);
  await page.getByRole('button', { name: 'Save' }).click();

  // Đảm bảo không có lỗi
  await expect(page.getByRole('alert')).not.toBeVisible();

  // Chờ tầm 1s
  await page.waitForTimeout(1000);

  // Dòng đầu tiên
  const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');
  const newName = await firstRow.locator('.ant-table-cell:nth-child(2)').textContent();
  const newDescription = await firstRow.locator('.ant-table-cell:nth-child(3)').textContent();

  await expect(name).toEqual(newName);
  await expect(description).toEqual(newDescription);
});


test('TC2 - Categories: Cập nhật thành công', async ({ page }) => {
  // Khai báo biến
  const name = 'MacBook Pro 222 - updated';
  const description = 'MacBook Pro 222 - updated';

  // Dòng đầu tiên
  const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');

  // Lấy id tại dòng đầu tiên
  const id = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  // Click nút Edit tại dòng đầu tiên
  await firstRow.locator('.ant-table-cell:nth-child(4)').getByRole('button', { name: 'Edit' }).click();

  await page.getByRole('dialog', { name: 'Update Category' }).getByLabel('Name').fill(name);
  await page.getByRole('dialog', { name: 'Update Category' }).getByLabel('Description').fill(description);
  await page.getByRole('dialog', { name: 'Update Category' }).getByRole('button', { name: 'Save' }).click();

  // Đảm bảo không có lỗi
  await expect(page.getByRole('alert')).not.toBeVisible();

  // Chờ tầm 1s
  await page.waitForTimeout(1000);

  // Xác minh sự tồn tại của category vừa tạo
  const newId = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  const newName = await firstRow.locator('.ant-table-cell:nth-child(2)').textContent();
  const newDescription = await firstRow.locator('.ant-table-cell:nth-child(3)').textContent();

  await expect(id).toEqual(newId);
  await expect(name).toEqual(newName);
  await expect(description).toEqual(newDescription);
});


test('TC3 - Categories: Xóa thành công', async ({ page }) => {
  // Dòng đầu tiên
  const firstRow = await page.locator('.ant-table-row-level-0:nth-child(1)');

  // Lấy id tại dòng đầu tiên
  const id = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();

  // Click nút Delete tại dòng đầu tiên
  await firstRow.locator('.ant-table-cell:nth-child(4)').getByRole('button', { name: 'Delete' }).click();

  // Click nút Confirm
  await page.getByRole('button', { name: 'Confirm' }).click();

  // Đảm bảo không có lỗi
  await expect(page.getByRole('alert')).not.toBeVisible();

  // Chờ tầm 1s
  await page.waitForTimeout(1000);

  // Xác minh sự không tồn tại của category vừa tạo, bằng cách so sánh id đã xóa với id của dòng đầu tiên, nếu khác nhau thì đã xóa thành công
  const newId = await firstRow.locator('.ant-table-cell:nth-child(1)').textContent();
  await expect(id).not.toEqual(newId);
});