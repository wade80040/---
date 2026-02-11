const { 
    Client, 
    GatewayIntentBits, 
    ChannelType 
} = require('discord.js');
const { 
    joinVoiceChannel, 
    createAudioPlayer, 
    createAudioResource, 
    AudioPlayerStatus, 
    VoiceConnectionStatus,
    NoSubscriberBehavior,
    entersState,
    getVoiceConnection // 新增這個來檢查連線狀態
} = require('@discordjs/voice');
const path = require('path');
require('dotenv').config();

const ffmpeg = require('ffmpeg-static');
process.env.FFMPEG_PATH = ffmpeg; 
console.log('--- 系統啟動：已自動定位 FFmpeg 路徑 ---');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, // 必須開啟這個才能讀取訊息內容
    ],
});

const SONG_PATH = path.join(__dirname, 'gong-xi-fa-cai.mp3');

function playSong(player) {
    console.log('--- 嘗試讀取路徑 ---:', SONG_PATH); // 偵測點 1
    const resource = createAudioResource(SONG_PATH, {
        inlineVolume: true
    });
    
    resource.playStream.on('error', error => {
        console.error('--- 資源流錯誤 ---:', error.message); // 偵測點 2
    });

    resource.volume.setVolume(1.0);
    player.play(resource);
    console.log('--- 核心日誌：指令已發送到播放器 ---');
}
// 核心功能：加入特定頻道
async function connectToChannel(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Play },
    });

    player.on(AudioPlayerStatus.Idle, () => playSong(player));
    player.on('error', error => {
        console.error('播放器錯誤:', error.message);
        playSong(player);
    });

    connection.subscribe(player);
    playSong(player);
    
    return connection;
}

client.once('ready', () => {
    console.log(`華仔已就位！名稱：${client.user.tag}`);
});

// --- 新增指令監聽功能 ---
client.on('messageCreate', async message => {
    if (message.author.bot) return; // 忽略機器人的訊息

    // 指令 1：讓華仔進來
    if (message.content === '!join') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('你得先進入一個語音頻道，華仔才能去找你！');
        }
        await connectToChannel(voiceChannel);
        message.reply('來了！恭喜發財！');
    }

    // 指令 2：讓華仔離開
    if (message.content === '!stop') {
        const connection = getVoiceConnection(message.guild.id);
        if (connection) {
            connection.destroy();
            message.reply('大家新年快樂，華仔先走啦！');
        } else {
            message.reply('我現在沒在唱歌呀？');
        }
    }
});

process.on('unhandledRejection', error => console.error('未處理錯誤:', error));

// 請記得換成你 Reset 後的新 Token
client.login(process.env.DISCORD_TOKEN);