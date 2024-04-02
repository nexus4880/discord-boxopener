require('dotenv').config();

const runUntilOneOfEach = process.env.RUN_UNTIL_ONE_OF_EACH == "true";
let baseWaitTimeInMs = parseInt(process.env.BASE_WAIT_TIME_IN_MS);
if (isNaN(baseWaitTimeInMs)) {
    baseWaitTimeInMs = 0;
}

const options = {
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
};

const delay = ms => new Promise(res => setTimeout(res, ms));

if (baseWaitTimeInMs < 1000) {
    console.log(`BASE_WAIT_TIME was ${baseWaitTimeInMs}, that is too low, correcting it to 1000ms`);
    baseWaitTimeInMs = 1000;
}

(async () => {
    console.log("Starting...");
    while (true) {
        await delay(baseWaitTimeInMs);

        const response = await fetch("https://discord.com/api/v9/users/@me/lootboxes/open", options);
        const result = await response.json();

        if (!response.ok) {
            if ("retry_after" in result) {
                const rateLimitTime = (result["retry_after"] + 1) * 1000;
                console.log(`Rate limited, waiting for ${rateLimitTime}ms`);
                await delay(rateLimitTime);

                continue;
            }
            else {
                console.log("Received non-ok, but not being rate limited, breaking");

                break;
            }
        }

        if (!("user_lootbox_data" in result)) {
            console.log("Received result does not have user_lootbox_data key");

            break;
        }

        const user_lootbox_data = result["user_lootbox_data"];
        if (!("opened_items" in user_lootbox_data)) {
            console.log("Received user_lootbox_data does not have opened_items key");

            break;
        }

        if (runUntilOneOfEach) {
            let hasAll = true;
            for (const count of Object.values(user_lootbox_data)) {
                if (count <= 0) {
                    hasAll = false;

                    break;
                }
            }

            if (hasAll) {
                console.log("We have all of them, breaking");

                break;
            }
        }
    }
})();