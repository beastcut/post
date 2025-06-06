const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("messageInput");
let userName = "";

function saveUserName() {
  const input = document.getElementById("userNameInput").value.trim();
  if (input === "") return alert("Please enter a name");

  userName = input;
  document.getElementById("namePopup").style.display = "none";
}

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

db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot((snapshot) => {
    chatBox.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `<strong>${msg.name || "Anonymous"}:</strong> ${msg.text}`;
      div.className = "bg-gray-700 p-2 rounded";
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
