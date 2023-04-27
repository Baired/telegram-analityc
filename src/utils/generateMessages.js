const emojiFlags = require('emoji-flags');

const { extractDomain } = require('./../utils/extractDomain');
const { iplocation } = require('./../utils/iplocation');

const { Click } = require('./../models/ClickModel');
const click = new Click();

const config = require('./../../config.json');

async function generateMessages(domain, data) {
    const message = config.telegram.message.click;
    let messages = '';
  
    for (let i = 0; i < message.length; i++) {
      // Create a message for the current item in the message list
      let msg = message[i][Object.keys(message[i])[0]].join('\n');
  
      if (i === 0) {
        // For the first item in the message list, replace variables in the template with corresponding values
        for (let j = 0; j < data.length; j++) {

          await click.update(data[j].id, {
            ip: data[j].ip,
            tag: data[j].tag,
            domain: data[j].domain,
            event: data[j].event,
            send: 1
          })

          let ip = data[j].ip;
          let domain = data[j].domain;
          let ipdetails = await iplocation(ip);
          let country_code = emojiFlags.countryCode(ipdetails.country_code2).emoji;

          messages += msg.replace('{ip}', ip)
                         .replace('{url}', domain)
                         .replace('{domain}', extractDomain(domain))
                         .replace('{tag}', data[j].tag)
                         .replace('{country}', `${country_code} ${ipdetails.country_name}`) + '\n';

          // Add a newline character between messages, except for the last one
          if (j < data.length - 1) {
            messages += '\n';
          }
        }
      } else {
        const AllClicks = await click.countAllClicks(domain);
        const DailyClicks = await click.countDailyClicks(domain);
        
        // For the second item in the message list, replace the variable in the template with the number of clicks
        messages += msg.replace('{clicks_all}', AllClicks.toString())
                       .replace('{clicks_day}', DailyClicks.toString()) + '\n';
      }
  
      // Add a newline character between messages, except for the last one
      if (i < message.length - 1) {
        messages += '\n';
      }
    }

    // Return all messages as a single string
    return messages;
}

module.exports = { generateMessages }