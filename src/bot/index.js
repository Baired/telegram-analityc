const { Telegraf } = require('telegraf');
const config = require('./../../config.json');

const { generateMessages } = require('./../utils/generateMessages');

const { Click } = require('./../models/ClickModel');
const click = new Click();

// Create a new Telegram bot instance
const bot = new Telegraf(config.telegram.token);

// Schedule a periodic task to check for unsent messages and send them
setInterval(() => {
    // Find all unsent messages in the database
    click.find('send', 0).then(async (data) => {
        // Group the messages by domain
        const domains = {};

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const domain = item.domain;

            if (!domains[domain]) {
                domains[domain] = [];
            }

            domains[domain].push(item);
        }

        // Send the messages for each domain
        for (const domain in domains) {
            const data = domains[domain];

            bot.telegram.sendMessage(
                config.telegram.chatId,
                await generateMessages(domain, data),
                {
                    parse_mode: "HTML",
                    disable_web_page_preview: true
                }
            )
        }
    })
}, 5000)

// Start the bot
bot.launch();
