const dotenv = require('dotenv');
dotenv.config();

const delay = ms => new Promise(res => setTimeout(res, ms));

    (async () => {
        while (true) {
            await fetch("https://discord.com/api/v9/users/@me/lootboxes/open", {
                "credentials": "include",
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
                    "Accept": "*/*",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Authorization": process.env.DISCORD_TOKEN,
                    "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjEyNC4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzEyNC4wIiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTI0LjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MjgwNjUxLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
                    "X-Discord-Locale": "en-US",
                    "X-Discord-Timezone": "America/Phoenix",
                    "X-Debug-Options": "bugReporterEnabled",
                    "Sec-GPC": "1",
                    "Alt-Used": "discord.com",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache"
                },
                "referrer": "https://discord.com/channels/@me",
                "method": "POST",
                "mode": "cors"
            });

            await delay(3000);
        }
    })();