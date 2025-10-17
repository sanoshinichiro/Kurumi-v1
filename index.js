// --- PHẦN 1: KEEP ALIVE WEB SERVER (Giữ bot không bị tắt) ---
const express = require('express');
const app = express();
const port = 3000; 

app.get('/', (req, res) => {
  res.send('Bot Kurumi-v1 đang hoạt động!');
});

app.listen(port, () => {
  console.log(`Webserver đang chạy trên port ${port}`);
});

// --- PHẦN 2: LOGIC BOT MESSENGER ---
const login = require("fca-unofficial");

// Lấy appState (cookie) từ Replit Secrets
// !!! Đảm bảo bạn đã lưu chuỗi JSON cookie vào biến FB_APPSTATE trong Replit Secrets !!!
const appstate = JSON.parse(process.env.FB_APPSTATE); 

login({appState: appstate}, (err, api) => {
    if (err) return console.error("Lỗi đăng nhập:", err);
    
    console.log("Kurumi-v1 đã đăng nhập thành công!");

    // Bắt đầu lắng nghe tin nhắn mới
    api.listen((err, message) => {
        if (err) return console.error("Lỗi tin nhắn:", err);
        
        // Bỏ qua tin nhắn do chính bot gửi để tránh loop
        if (message.senderID === api.getCurrentUserID()) return;

        handleCommands(api, message); 
    });
});

// Hàm xử lý các lệnh dựa trên ký hiệu
function handleCommands(api, message) {
    const text = message.body ? message.body.trim() : '';
    const threadID = message.threadID;

    // --- LOGIC PHẢN HỒI THEO KÍ HIỆU ---

    if (text.startsWith('!')) {
        const command = text.substring(1).trim().toLowerCase();
        
        if (command === 'help') {
            api.sendMessage("Danh sách lệnh: !help, !ping, /hello. Hãy thử !ping.", threadID);
        } else if (command === 'ping') {
            api.sendMessage("Pong! Tôi vẫn đang hoạt động.", threadID);
        } else {
            api.sendMessage(`Lệnh '!${command}' không tồn tại. Gõ !help.`, threadID);
        }

    } else if (text.startsWith('/')) {
        const command = text.substring(1).trim().toLowerCase();

        if (command === 'hello') {
            api.sendMessage("Chào bạn! Bạn có cần tôi giúp gì không?", threadID);
        }
    } 
    
    // Ví dụ trả lời tự động cho một từ khóa
    if (text.toLowerCase().includes('bot ơi')) {
         api.sendMessage("Tôi luôn sẵn sàng phục vụ!", threadID);
    }
}
