import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';

// Dữ liệu cho các tùy chọn Quốc gia
const countries = [
  { value: '', label: '-- Chọn Quốc gia --' },
  { value: 'VN', label: 'Việt Nam' },
  { value: 'US', label: 'Hoa Kỳ' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Úc' },
  { value: 'GB', label: 'Vương quốc Anh' },
  // Thêm các quốc gia khác nếu cần
];

// Dữ liệu cho các tùy chọn Sở thích
const hobbiesOptions = [
  { value: 'reading', label: 'Đọc sách' },
  { value: 'traveling', label: 'Du lịch' },
  { value: 'gaming', label: 'Chơi game' },
];

const RegistrationForm: React.FC = () => {
  // --- STATE QUẢN LÝ GIÁ TRỊ CÁC TRƯỜNG DỮ LIỆU ---
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState(''); // Male, Female, Other
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]); // Mảng các sở thích đã chọn
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [bio, setBio] = useState('');

  // --- STATE QUẢN LÝ THÔNG BÁO LỖI ---
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);
  const [dateOfBirthError, setDateOfBirthError] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);
  const [hobbiesError, setHobbiesError] = useState<string | null>(null);
  const [profilePictureError, setProfilePictureError] = useState<string | null>(null);

  // --- STATE HIỂN THỊ THÔNG BÁO CHUNG SAU KHI GỬI FORM ---
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // --- HÀM VALIDATION CHO TỪNG TRƯỜNG ---
  const validateFullName = (name: string): string | null => {
    if (name.length < 3) return 'Họ và tên phải có ít nhất 3 ký tự.';
    return null;
  };

  const validateEmail = (email: string): string | null => {
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Email không hợp lệ.';
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự.';
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) return 'Mật khẩu phải chứa cả chữ và số.';
    return null;
  };

  const validateConfirmPassword = (confirmPass: string, pass: string): string | null => {
    if (confirmPass !== pass) return 'Mật khẩu xác nhận không khớp.';
    return null;
  };

  const validatePhoneNumber = (phone: string): string | null => {
    const digitsOnly = phone.replace(/\D/g, ''); // Chỉ lấy số
    if (digitsOnly.length < 10) return 'Số điện thoại phải có ít nhất 10 chữ số.';
    return null;
  };

  const validateGender = (gender: string): string | null => {
    if (!gender) return 'Vui lòng chọn giới tính.';
    return null;
  };

  const validateDateOfBirth = (dob: string): string | null => {
    if (!dob) return 'Vui lòng chọn ngày sinh.';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) return 'Bạn phải đủ 18 tuổi trở lên.';
    return null;
  };

  const validateCountry = (country: string): string | null => {
    if (!country) return 'Vui lòng chọn quốc gia.';
    return null;
  };

  const validateHobbies = (hobbies: string[]): string | null => {
    if (hobbies.length === 0) return 'Vui lòng chọn ít nhất một sở thích.';
    return null;
  };

  const validateProfilePicture = (file: File | null): string | null => {
    if (!file) return 'Vui lòng tải lên ảnh đại diện.';
    const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!acceptedTypes.includes(file.type)) return 'Chỉ chấp nhận file JPG, JPEG hoặc PNG.';
    return null;
  };

  // --- HÀM XỬ LÝ SỰ KIỆN THAY ĐỔI TRÊN CÁC TRƯỜNG ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Reset lỗi ngay khi người dùng bắt đầu gõ
    switch (name) {
      case 'fullName': setFullName(value); setFullNameError(null); break;
      case 'email': setEmail(value); setEmailError(null); break;
      case 'password': setPassword(value); setPasswordError(null); break;
      case 'confirmPassword': setConfirmPassword(value); setConfirmPasswordError(null); break;
      case 'phoneNumber': setPhoneNumber(value); setPhoneNumberError(null); break;
      case 'dateOfBirth': setDateOfBirth(value); setDateOfBirthError(null); break;
      case 'country': setCountry(value); setCountryError(null); break;
      case 'bio': setBio(value); break; // Bio không có lỗi validation tức thời
      default: break;
    }
    setSuccessMessage(null); // Xóa thông báo thành công khi có thay đổi
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    setGenderError(null);
    setSuccessMessage(null);
  };

  const handleHobbiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setHobbies(prevHobbies => {
      if (checked) {
        return [...prevHobbies, value];
      } else {
        return prevHobbies.filter(hobby => hobby !== value);
      }
    });
    setHobbiesError(null);
    setSuccessMessage(null);
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfilePicture(file);
    setProfilePictureError(null);
    setSuccessMessage(null);
  };

  // --- HÀM XỬ LÝ KHI GỬI FORM ---
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn tải lại trang

    let isValid = true; // Cờ kiểm tra toàn bộ form

    // Thực hiện validation cho từng trường và cập nhật lỗi
    const errors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
      phoneNumber: validatePhoneNumber(phoneNumber),
      gender: validateGender(gender),
      dateOfBirth: validateDateOfBirth(dateOfBirth),
      country: validateCountry(country),
      hobbies: validateHobbies(hobbies),
      profilePicture: validateProfilePicture(profilePicture),
    };

    // Cập nhật state lỗi và kiểm tra tổng thể form
    if (errors.fullName) { setFullNameError(errors.fullName); isValid = false; }
    if (errors.email) { setEmailError(errors.email); isValid = false; }
    if (errors.password) { setPasswordError(errors.password); isValid = false; }
    if (errors.confirmPassword) { setConfirmPasswordError(errors.confirmPassword); isValid = false; }
    if (errors.phoneNumber) { setPhoneNumberError(errors.phoneNumber); isValid = false; }
    if (errors.gender) { setGenderError(errors.gender); isValid = false; }
    if (errors.dateOfBirth) { setDateOfBirthError(errors.dateOfBirth); isValid = false; }
    if (errors.country) { setCountryError(errors.country); isValid = false; }
    if (errors.hobbies) { setHobbiesError(errors.hobbies); isValid = false; }
    if (errors.profilePicture) { setProfilePictureError(errors.profilePicture); isValid = false; }

    // Nếu form hợp lệ, tiến hành xử lý dữ liệu
    if (isValid) {
      console.log('Form hợp lệ, dữ liệu gửi đi:', {
        fullName, email, phoneNumber, gender, dateOfBirth, country, hobbies, bio,
        profilePicture: profilePicture ? profilePicture.name : 'No file',
        // Không gửi mật khẩu thực tế
      });
      setSuccessMessage('Đăng ký thành công!');
      // Reset form sau khi gửi thành công
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
      setGender('');
      setDateOfBirth('');
      setCountry('');
      setHobbies([]);
      setProfilePicture(null);
      setBio('');
      // Xóa hết lỗi
      setFullNameError(null); setEmailError(null); setPasswordError(null);
      setConfirmPasswordError(null); setPhoneNumberError(null); setGenderError(null);
      setDateOfBirthError(null); setCountryError(null); setHobbiesError(null);
      setProfilePictureError(null);
    } else {
      setSuccessMessage(null); // Đảm bảo thông báo thành công bị ẩn
    }
  };

  // Tính số ký tự còn lại cho Bio
  const bioCharsRemaining = 300 - bio.length;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Đăng ký tài khoản</h2>

      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* --- Full Name --- */}
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>Họ và tên:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            className={`${styles.input} ${fullNameError ? styles.inputError : ''}`}
            aria-describedby={fullNameError ? "fullName-error" : undefined}
          />
          {fullNameError && <p id="fullName-error" className={styles.errorText}>{fullNameError}</p>}
        </div>

        {/* --- Email --- */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={`${styles.input} ${emailError ? styles.inputError : ''}`}
            aria-describedby={emailError ? "email-error" : undefined}
          />
          {emailError && <p id="email-error" className={styles.errorText}>{emailError}</p>}
        </div>

        {/* --- Password --- */}
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
            aria-describedby={passwordError ? "password-error" : undefined}
          />
          {passwordError && <p id="password-error" className={styles.errorText}>{passwordError}</p>}
        </div>

        {/* --- Confirm Password --- */}
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>Xác nhận mật khẩu:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className={`${styles.input} ${confirmPasswordError ? styles.inputError : ''}`}
            aria-describedby={confirmPasswordError ? "confirmPassword-error" : undefined}
          />
          {confirmPasswordError && <p id="confirmPassword-error" className={styles.errorText}>{confirmPasswordError}</p>}
        </div>

        {/* --- Phone Number --- */}
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>Số điện thoại:</label>
          <input
            type="tel" // Loại tel cho bàn phím số trên di động
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            className={`${styles.input} ${phoneNumberError ? styles.inputError : ''}`}
            aria-describedby={phoneNumberError ? "phoneNumber-error" : undefined}
          />
          {phoneNumberError && <p id="phoneNumber-error" className={styles.errorText}>{phoneNumberError}</p>}
        </div>

        {/* --- Gender --- */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Giới tính:</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={handleGenderChange} /> Nam
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={handleGenderChange} /> Nữ
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="gender" value="Other" checked={gender === 'Other'} onChange={handleGenderChange} /> Khác
            </label>
          </div>
          {genderError && <p className={styles.errorText}>{genderError}</p>}
        </div>

        {/* --- Date of Birth --- */}
        <div className={styles.formGroup}>
          <label htmlFor="dateOfBirth" className={styles.label}>Ngày sinh:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={handleChange}
            className={`${styles.input} ${dateOfBirthError ? styles.inputError : ''}`}
            aria-describedby={dateOfBirthError ? "dateOfBirth-error" : undefined}
          />
          {dateOfBirthError && <p id="dateOfBirth-error" className={styles.errorText}>{dateOfBirthError}</p>}
        </div>

        {/* --- Country --- */}
        <div className={styles.formGroup}>
          <label htmlFor="country" className={styles.label}>Quốc gia:</label>
          <select
            id="country"
            name="country"
            value={country}
            onChange={handleChange}
            className={`${styles.select} ${countryError ? styles.inputError : ''}`}
            aria-describedby={countryError ? "country-error" : undefined}
          >
            {countries.map(option => (
              <option key={option.value} value={option.value} disabled={option.value === ''}>
                {option.label}
              </option>
            ))}
          </select>
          {countryError && <p id="country-error" className={styles.errorText}>{countryError}</p>}
        </div>

        {/* --- Hobbies --- */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Sở thích:</label>
          <div className={styles.checkboxGroup}>
            {hobbiesOptions.map(option => (
              <label key={option.value} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="hobbies"
                  value={option.value}
                  checked={hobbies.includes(option.value)}
                  onChange={handleHobbiesChange}
                />
                {option.label}
              </label>
            ))}
          </div>
          {hobbiesError && <p className={styles.errorText}>{hobbiesError}</p>}
        </div>

        {/* --- Profile Picture --- */}
        <div className={styles.formGroup}>
          <label htmlFor="profilePicture" className={styles.label}>Ảnh đại diện:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept=".jpg,.jpeg,.png" // Chỉ chấp nhận các định dạng này
            onChange={handleProfilePictureChange}
            className={`${styles.fileInput} ${profilePictureError ? styles.inputError : ''}`}
            aria-describedby={profilePictureError ? "profilePicture-error" : undefined}
          />
          {profilePicture && <span className={styles.fileName}>{profilePicture.name}</span>}
          {profilePictureError && <p id="profilePicture-error" className={styles.errorText}>{profilePictureError}</p>}
        </div>

        {/* --- Bio --- */}
        <div className={styles.formGroup}>
          <label htmlFor="bio" className={styles.label}>Tiểu sử (Tùy chọn):</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={handleChange}
            maxLength={300}
            rows={5}
            className={styles.textarea}
          ></textarea>
          <p className={styles.charCount}>Còn lại: {bioCharsRemaining} / 300 ký tự</p>
        </div>

        {/* --- Submit Button --- */}
        <button type="submit" className={styles.submitButton}>
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;