const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

generateBtn.addEventListener("click", function () {
  let password = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    password += characters[randomIndex];
  }

  passwordInput.value = password;
});

copyBtn.addEventListener("click", function () {
  passwordInput.select();
  passwordInput.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(passwordInput.value);

  alert("✅ Password copied successfully!");
});
