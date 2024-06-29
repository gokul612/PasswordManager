document
  .getElementById("passwordForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const site = document.getElementById("site").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (site && username && password) {
      let passwordList = JSON.parse(localStorage.getItem("passwordList")) || [];
      const alreadyExists = passwordList.some(
        (item) => item.site === site && item.username === username
      );

      if (alreadyExists) {
        alert("This site and username combination is already entered.");
      } else {
        const passwordItem = {
          site,
          username,
          password,
        };
        passwordList.push(passwordItem);
        localStorage.setItem("passwordList", JSON.stringify(passwordList));
        document.getElementById("passwordForm").reset();
      }
    }
  });

document.getElementById("viewButton").addEventListener("click", function () {
  const passwordListDiv = document.getElementById("passwordList");
  if (
    passwordListDiv.style.display === "none" ||
    passwordListDiv.style.display === ""
  ) {
    document.getElementById("passwordModal").style.display = "block";
  } else {
    passwordListDiv.style.display = "none";
  }
});

document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    document.getElementById("passwordModal").style.display = "none";
  });

document.getElementById("submitKey").addEventListener("click", function () {
  const key = document.getElementById("passwordKey").value;
  const correctKey = "gokuls";

  if (key === correctKey) {
    document.getElementById("passwordModal").style.display = "none";
    displayPasswords();
  } else {
    alert("Incorrect Password Key");
  }
});

function displayPasswords() {
  const passwordList = JSON.parse(localStorage.getItem("passwordList")) || [];
  const passwordListDiv = document.getElementById("passwordList");
  passwordListDiv.innerHTML = "";

  passwordList.forEach((passwordItem, index) => {
    const passwordDiv = document.createElement("div");
    passwordDiv.classList.add("password-item");
    passwordDiv.innerHTML = `
            <p><strong>Website:</strong> ${passwordItem.site}</p>
            <p><strong>Username:</strong> ${passwordItem.username}</p>
            <p><strong>Password:</strong> ${passwordItem.password}</p>
            <button onclick="deletePassword(${index})">Delete</button>
        `;
    passwordListDiv.appendChild(passwordDiv);
  });
  passwordListDiv.style.display = "block"; 
}

function deletePassword(index) {
  let passwordList = JSON.parse(localStorage.getItem("passwordList")) || [];
  passwordList.splice(index, 1);
  localStorage.setItem("passwordList", JSON.stringify(passwordList));
  displayPasswords();
}

window.onload = function () {
  const passwordListDiv = document.getElementById("passwordList");
  passwordListDiv.style.display = "none"; 
};
