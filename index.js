// index.js

// 1. Module Keep Alive (Web Server)
const express = require('express');
const app = express();

// Khai báo module login/startBot sau
let botStarter; 

app.get('/', (req, res) => {
  res.send('Kurumi-v1 is running and listening for commands.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[SERVER] Webserver running on port ${PORT}`);
  
  // 2. Gọi hàm bắt đầu bot (Sẽ được định nghĩa trong file khác)
  try {
      // Giả sử hàm startBot nằm trong file 'bot/main.js'
      botStarter = require('./bot/main.js'); 
      botStarter.start();
  } catch (error) {
      console.error("[ERROR] Failed to load main bot module:", error.message);
      console.log("Please make sure you have created the 'bot/main.js' file.");
  }
});

// Chú ý: Code đăng nhập và xử lý tin nhắn sẽ KHÔNG nằm trong file này. 
// Nó sẽ nằm trong 'bot/main.js' và 'modules/commands/'.
