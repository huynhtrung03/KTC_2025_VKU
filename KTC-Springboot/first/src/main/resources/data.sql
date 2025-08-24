-- -- ==============================================
-- -- 1. Tạo bảng (nếu chưa có)
-- -- ==============================================
-- CREATE TABLE IF NOT EXISTS roles (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL UNIQUE
-- );

-- CREATE TABLE IF NOT EXISTS users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS users_roles (
--     user_id INT NOT NULL,
--     role_id INT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
--     PRIMARY KEY (user_id, role_id)
-- );

-- -- ==============================================
-- -- 2. Insert dữ liệu mẫu vào bảng roles (nếu chưa tồn tại)
-- -- ==============================================
-- INSERT INTO roles (name)
-- SELECT 'Admin'
-- WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'Admin');

-- INSERT INTO roles (name)
-- SELECT 'Manager'
-- WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'Manager');

-- INSERT INTO roles (name)
-- SELECT 'User'
-- WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'User');

-- -- ==============================================
-- -- 3. Thêm user mẫu (nếu chưa tồn tại)
-- -- ==============================================
-- INSERT INTO users (username, password)
-- SELECT 'vhtrung@gmail.com', '2511'
-- WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'vhtrung@gmail.com');

-- -- ==============================================
-- -- 4. Gán role cho user mẫu (nếu chưa tồn tại)
-- -- ==============================================
-- INSERT INTO users_roles (user_id, role_id)
-- SELECT u.id, r.id
-- FROM 
--     (SELECT id FROM users WHERE username = 'admin@example.com' LIMIT 1) u,
--     (SELECT id FROM roles WHERE name = 'Admin' LIMIT 1) r
-- WHERE NOT EXISTS (
--     SELECT 1 FROM users_roles WHERE user_id = u.id AND role_id = r.id
-- );
