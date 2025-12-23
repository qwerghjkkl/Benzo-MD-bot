const moment = require('moment-timezone');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function githubCommand(sock, chatId, message) {
  try {
    const res = await fetch('https://api.github.com/repos/spark-x1/Benzo-MD');
    if (!res.ok) throw new Error('Error fetching repository data');
    const json = await res.json();

    let txt = `╔══════════════════════╗\n`;
    txt += `║   𝗕𝗘𝗡𝗭𝗢-𝗠𝗗 𝗥𝗘𝗣𝗢𝗦𝗜𝗧𝗢𝗥𝗬  ║\n`;
    txt += `╚══════════════════════╝\n\n`;
    
    txt += `📦  *Repository* : ${json.name}\n`;
    txt += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
    txt += `👁️  *Watchers* : ${json.watchers_count}\n`;
    txt += `📊  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`;
    txt += `🕐  *Updated* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`;
    txt += `🔗  *URL* : ${json.html_url}\n`;
    txt += `🍴  *Forks* : ${json.forks_count}\n`;
    txt += `⭐  *Stars* : ${json.stargazers_count}\n\n`;
    
    txt += `╭──────────────────────╮\n`;
    txt += `│     🚀 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬     │\n`;
    txt += `│     𝐁𝐄𝐍𝐙𝐎-𝐌𝐃 𝐁𝐎𝐓      │\n`;
    txt += `╰──────────────────────╯`;

    // Use the local asset image
    const imgPath = path.join(__dirname, '../assets/bot_image.jpg');
    const imgBuffer = fs.readFileSync(imgPath);

    await sock.sendMessage(chatId, { image: imgBuffer, caption: txt }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: '╔══════════════════╗\n║     ❌ 𝗘𝗥𝗥𝗢𝗥     ║\n╚══════════════════╝\nFailed to fetch repository information.' }, { quoted: message });
  }
}

module.exports = githubCommand;
