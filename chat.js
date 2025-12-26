document.documentElement.classList.add('dark');

  const chatButton = document.getElementById('botcahx-chat-button');
  const chatBox = document.getElementById('botcahx-chat-box');
  const closeBtn = document.getElementById('botcahx-close-btn');
  const newSessionBtn = document.getElementById('botcahx-new-session');
  const messagesDiv = document.getElementById('botcahx-messages');
  const userInput = document.getElementById('botcahx-user-input');
  const sendBtn = document.getElementById('botcahx-send-btn');

  let conversationHistory = [];

  const systemPrompt = { role: "system", content: `Kamu adalah Diao Assistant, AI support resmi panel BOTCAHX – hosting bot gratis tanpa biaya / always free (termasuk WhatsApp bot, Discord bot, dll) di https://botcahx.64-b.it.

Tugas utama: Bantu user dari nol sampai server/bot aktif.

Link penting:
- Panel utama: https://botcahx.64-b.it
- Profile/Akun: https://botcahx.64-b.it/account
- Store: https://botcahx.64-b.it/store
- Resources: https://botcahx.64-b.it/store/resources
- Credits/Balance: https://botcahx.64-b.it/store/credits
- Create Server: https://botcahx.64-b.it/store/create
- Support Ticket: https://botcahx.64-b.it/tickets
- Login: https://botcahx.64-b.it/auth/login
- Logout: https://botcahx.64-b.it/auth/logout
- Forgot Password: https://botcahx.64-b.it/auth/password
- Register: https://botcahx.64-b.it/auth/register
- Security: https://botcahx.64-b.it/account/security
- Referrals: https://botcahx.64-b.it/account/referrals
- API token: https://botcahx.64-b.it/account/api
- SSH Key: https://botcahx.64-b.it/account/ssh
- Coupons: https://botcahx.64-b.it/account/coupons

Selalu ramah, jelas, dan beri langkah bernomor (1, 2, 3...).

Mulai dengan tanya: "Ada yang bisa Saya bantu?"

Panduan utama:
1. Daftar/login di https://botcahx.64-b.it (pastikan verifikasi email sebelum create server)
2. Cek balance/resources di store (untuk pengguna pertama bergabung create server gratis tanpa balance)
3. Buat server baru di https://botcahx.64-b.it/store/create
4. Pilih egg/location yang sesuai
5. Konfigurasi startup (versi nodejs, dll)
6. Upload source code ke panel atau clone via git clone
7. Edit file konfigurasi seperti .env, settings.js, settings.json, config.js, config.json, atau file pengaturan lainnya sesuai dengan petunjuk dari developer atau dokumentasi bot.
8. Start server & test bot


Note: 
- Panel ini hanya menyediakan versi Node.js Versi 23 & 24, jadi pastikan bot source code anda sudah support berjalan di Node.js 20++.
- Tidak untuk diperjualbelikan.
- Tidak untuk dipakai untuk Mining, DDoS, crypto, atau gal terlarang lainya
- Jika tidak ada aktivitas selama 4/5 hari sistem akan menghapus server user guna untuk memberikan kesempatan kepada yang belum kebagian.
- Tidak menyediakan upgrade Ram hanya disk (disk limit= 3GB /per user)
- Sistem akan menambahkan 1 credits AFK setiap user berada di website tanpa ada aktivitas, credits tersebut bisa digunakan untuk Renew Server jika Expired.


Ingatkan: Jangan share token bot, session, API key, code, atau info sensitif lainnya ke orang lain. Jangan bagikan data pribadi sensitif. Butuh bantuan error? Kirim pesan errornya aja.

Akhiri respons dengan: "Apakah masih ada lagi yang bisa Diao bantu?"` };

  function renderMarkdown(text) {
    let result = text;

    result = result.replace(/```([\s\S]*?)```/g, '<pre class="bg-black text-green-400 p-4 rounded-2xl my-4 overflow-x-auto font-mono text-sm border border-gray-800"><code>$1</code></pre>');

    result = result.replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>');

    result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');

    result = result.replace(/\*([^\*\s][^\*]*?[^\*\s])\*/g, '<em class="italic">$1</em>');

    result = result.replace(/\n/g, '<br>');

    result = result.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-gray-400 underline hover:text-white">$1</a>');

    result = result.replace(/(?<!href=")(https?:\/\/[^\s<>"']+)(?![^<]*>)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-gray-400 underline hover:text-white">$1</a>');

    return result;
  }

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user'
      ? 'ml-auto max-w-[85%] bg-gray-800 text-white rounded-3xl rounded-br-md px-6 py-4 shadow-xl'
      : 'mr-auto max-w-[85%] bg-gray-950 text-gray-200 rounded-3xl rounded-bl-md px-6 py-4 shadow';
    msgDiv.innerHTML = renderMarkdown(text);
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function addWelcomeMessage() {
    addMessage("Halo! 👋<br>Saya <strong>Diao Assistant</strong>, support resmi panel BOTCAHX.<br>", 'bot');
  }

  chatButton.addEventListener('click', () => {
    chatBox.classList.remove('hidden', 'scale-0');
    chatBox.classList.add('scale-100');
    if (messagesDiv.children.length === 0) addWelcomeMessage();
    userInput.focus();
  });

  closeBtn.addEventListener('click', () => {
    chatBox.classList.add('scale-0');
    setTimeout(() => chatBox.classList.add('hidden'), 400);
  });

  newSessionBtn.addEventListener('click', () => {
    if (confirm('Mulai sesi chat baru? Riwayat percakapan akan dihapus.')) {
      messagesDiv.innerHTML = '';
      conversationHistory = [];
      addWelcomeMessage();
    }
  });

  async function sendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;
    addMessage(userText, 'user');
    userInput.value = '';

    const typing = document.createElement('div');
    typing.className = 'mr-auto flex items-center space-x-2 text-sm text-gray-500';
    typing.innerHTML = `<div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div><div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div><div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div><span>Sedang mengetik...</span>`;
    messagesDiv.appendChild(typing);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    conversationHistory.push({ role: "user", content: userText });

    try {
      const response = await fetch('https://aichat-api.vercel.app/chatgpt', {
        method: 'POST',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [systemPrompt, ...conversationHistory] })
      });
      const data = await response.json();
      messagesDiv.removeChild(typing);
      if (data.error) {
        addMessage('Error: ' + data.error, 'bot');
      } else {
        addMessage(data.content, 'bot');
        conversationHistory.push({ role: "assistant", content: data.content });
      }
    } catch (err) {
      messagesDiv.removeChild(typing);
      addMessage('Gagal terhubung ke server. Silakan coba lagi dalam beberapa detik.', 'bot');
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
