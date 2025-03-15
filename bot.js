const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: process.env.MC_SERVER, 
  username: process.env.MC_USERNAME, 
  password: process.env.MC_PASSWORD 
});

bot.once('spawn', () => {
  console.log('Bot has joined the server!');
  
  bot.on('time', () => {
    if (bot.time.isNight && !bot.isSleeping) {
      const bed = bot.findBlock({
        matching: block => bot.isABed(block)
      });
      if (bed) {
        bot.sleep(bed).then(() => {
          console.log("Bot is sleeping.");
        }).catch(err => console.log("Failed to sleep:", err));
      }
    }
  });

  // Wake up when morning comes
  bot.on('wake', () => {
    console.log("Bot woke up.");
  });
});

// Keep bot online even if kicked
bot.on('end', () => {
  console.log("Bot was disconnected, reconnecting...");
  setTimeout(() => {
    bot.connect();
  }, 5000);
});
