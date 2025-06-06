const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("messageInput");

function sendMessage() {
  const text = messageInput.value;
  if (text.trim() === "") return;

  db.collection("messages").add({
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  messageInput.value = "";
}

db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot((snapshot) => {
    chatBox.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.textContent = msg.text;
      div.className = "bg-gray-700 p-2 rounded";
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  let confirmationResult;

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.getElementById("login-section").style.display = "none";
      document.getElementById("chat-box").style.display = "block";
    } else {
      document.getElementById("login-section").style.display = "block";
      document.getElementById("chat-box").style.display = "none";
    }
  });

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'normal',
    callback: () => console.log("reCAPTCHA verified"),
  });
};

function sendOTP() {
  const phoneNumber = document.getElementById("phoneNumber").value;

  firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then((result) => {
      confirmationResult = result;
      alert("OTP sent!");
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
}

function verifyOTP() {
  const code = document.getElementById("otpCode").value;

  confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;
      alert("Login successful!");
    })
    .catch((error) => {
      console.error(error);
      alert("Invalid OTP");
    });
}

function logout() {
  firebase.auth().signOut().then(() => {
    alert("Logged out!");
  });
}
