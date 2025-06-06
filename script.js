const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("messageInput");
let userName = "";

// Save the entered name and hide popup
function saveUserName() {
  const input = document.getElementById("userNameInput").value.trim();
  if (input === "") {
    alert("Please enter your name");
    return;
  }

  userName = input;
  document.getElementById("namePopup").style.display = "none";
}

// Send a new message
function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "") return;

  db.collection("messages").add({
    name: userName,
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  messageInput.value = "";
}

// Listen for new messages in Firestore
db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot((snapshot) => {
    chatBox.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `<span class="font-semibold text-blue-400">${msg.name || "Anonymous"}:</span> ${msg.text}`;
      div.className = "bg-gray-700 p-2 rounded";
      chatBox.appendChild(div);
    });

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
  });
