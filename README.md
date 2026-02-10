# 劉德華 Discord 恭喜發財機器人

這是一個專門為了新年設計的 Discord 機器人。它的唯一功能就是：**一進語音頻道就無限循環播放劉德華的《恭喜發財》**，直到被踢出去為止。

## 功能
- 自動偵測伺服器中的語音頻道並加入。
- 無限循環播放《恭喜發財》。
- 當被邀請進入新伺服器時，自動開始播放。

## 安裝與設定步驟

### 1. 在 Discord Developer Portal 建立機器人
1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)。
2. 點擊 **New Application**，取名為「劉德華」。
3. 在左側選單點擊 **Bot**。
4. 點擊 **Reset Token** 獲取你的 **Bot Token**（請妥善保存）。
5. 在下方 **Privileged Gateway Intents** 區塊，開啟以下權限：
   - **Presence Intent**
   - **Server Members Intent**
   - **Message Content Intent**
6. 點擊 **Save Changes**。

### 2. 設定權限與邀請機器人
1. 在左側選單點擊 **OAuth2** -> **URL Generator**。
2. 在 **Scopes** 勾選 `bot`。
3. 在 **Bot Permissions** 勾選：
   - `Connect` (語音連接)
   - `Speak` (語音說話)
   - `View Channels` (查看頻道)
4. 複製下方的 URL 並在瀏覽器開啟，將機器人邀請到你的伺服器。

### 3. 執行機器人
1. 確保你的電腦已安裝 [Node.js](https://nodejs.org/)。
2. 在專案資料夾內執行：
   ```bash
   npm install
   ```
3. 建立一個 `.env` 檔案，內容如下：
   ```env
   DISCORD_TOKEN=你的機器人Token
   ```
4. 執行機器人：
   ```bash
   node index.js
   ```

## 檔案說明
- `index.js`: 機器人主程式。
- `gong-xi-fa-cai.mp3`: 劉德華《恭喜發財》音訊檔。
- `package.json`: 專案依賴設定。

祝大家新年快樂，發大財！
