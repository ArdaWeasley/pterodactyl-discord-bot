![](https://cdn.pterodactyl.io/logos/new/pterodactyl_logo_transparent.png) 
# Pterodactyl Discord Status (User Servers)
- This bot is a system that runs on Discord and is used to monitor the status of servers using Pterodactyl. It collects and visualizes information using Pterodactyl APIs to show the performance of servers on Discord.

# Images
![image](https://github.com/user-attachments/assets/cc85a391-f817-4fa9-b79d-a44802305ef8)

# Setup
1. Clone or download the project.
2. Install the required modules:
```
npm install
```
3. Edit config.js and add your Discord bot token and Pterodactyl API key:
- `api`: Example https://panel.rasbyte.net/api/ (You need to put a slash at the end)
- `key`: The api key you created from the panel
- `bot.channels.status`: Channel id where statuses will be discarded
- `filteredServers`: Name of the server you do not want to appear on the channel
4. Run it:
```node index.js```

# Contribution
If you have found a bug or would like to contribute to the development, please open an Issue or submit a Pull Request.

# License
This project is licensed under the [MIT](LICENSE) License.
