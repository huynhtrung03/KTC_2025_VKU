// Bắt sự kiện submit form
  document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn reload trang khi submit

    // Xóa thông báo lỗi cũ và viền đỏ cũ
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));

    let isValid = true; // Biến kiểm tra tổng thể form

    // Kiểm tra họ tên
    const name = document.getElementById("fullName");
    if (name.value.trim() === "") {
      isValid = false;
      name.classList.add("invalid");
      document.getElementById("nameError").textContent = "Vui lòng nhập họ tên.";
    } else if (name.value.trim().length < 3) {
      isValid = false;
      name.classList.add("invalid");
      document.getElementById("nameError").textContent = "Tên phải có ít nhất 3 ký tự.";
    }

    // Kiểm tra email
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
      isValid = false;
      email.classList.add("invalid");
      document.getElementById("emailError").textContent = "Vui lòng nhập email.";
    } else if (!emailRegex.test(email.value)) {
      isValid = false;
      email.classList.add("invalid");
      document.getElementById("emailError").textContent = "Email không hợp lệ.";
    }

    // Kiểm tra mật khẩu
    const password = document.getElementById("password");
    const passwordVal = password.value;
    if (passwordVal === "") {
      isValid = false;
      password.classList.add("invalid");
      document.getElementById("passwordError").textContent = "Vui lòng nhập mật khẩu.";
    } else if (passwordVal.length < 8 || !/[a-zA-Z]/.test(passwordVal) || !/\d/.test(passwordVal)) {
      isValid = false;
      password.classList.add("invalid");
      document.getElementById("passwordError").textContent = "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ và số.";
    }

    // Kiểm tra xác nhận mật khẩu
    const confirmPassword = document.getElementById("confirmPassword");
    if (confirmPassword.value === "") {
      isValid = false;
      confirmPassword.classList.add("invalid");
      document.getElementById("confirmError").textContent = "Vui lòng xác nhận mật khẩu.";
    } else if (confirmPassword.value !== passwordVal) {
      isValid = false;
      confirmPassword.classList.add("invalid");
      document.getElementById("confirmError").textContent = "Mật khẩu không khớp.";
    }

    // Kiểm tra số điện thoại
    const phone = document.getElementById("phone");
    if (phone.value.trim() === "") {
      isValid = false;
      phone.classList.add("invalid");
      document.getElementById("phoneError").textContent = "Vui lòng nhập số điện thoại.";
    } else if (!/^\d{10,}$/.test(phone.value)) {
      isValid = false;
      phone.classList.add("invalid");
      document.getElementById("phoneError").textContent = "Số điện thoại phải từ 10 chữ số trở lên.";
    }

    // Kiểm tra giới tính
    const gender = document.querySelector("input[name='gender']:checked");
    if (!gender) {
      isValid = false;
      document.getElementById("genderError").textContent = "Vui lòng chọn giới tính.";
    }

    // Kiểm tra ngày sinh
    const dob = document.getElementById("dob");
    const birthDate = new Date(dob.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (!dob.value) {
      isValid = false;
      dob.classList.add("invalid");
      document.getElementById("dobError").textContent = "Vui lòng chọn ngày sinh.";
    } else if (age < 18 || today < birthDate.setFullYear(today.getFullYear() - 18)) {
      isValid = false;
      dob.classList.add("invalid");
      document.getElementById("dobError").textContent = "Bạn phải trên 18 tuổi.";
    }

    // Kiểm tra quốc gia
    const country = document.getElementById("country");
    if (country.value === "") {
      isValid = false;
      country.classList.add("invalid");
      document.getElementById("countryError").textContent = "Vui lòng chọn quốc gia.";
    }

    // Kiểm tra sở thích
    const hobbies = document.querySelectorAll("input[name='hobby']:checked");
    if (hobbies.length === 0) {
      isValid = false;
      document.getElementById("hobbyError").textContent = "Chọn ít nhất một sở thích.";
    }

    // Nếu tất cả hợp lệ thì hiển thị thông báo
    if (isValid) {
      alert("Đăng ký thành công!");
      this.reset(); // Reset form
    }
  });