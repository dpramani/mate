// Imports
const { App } = require("@slack/bolt");
const handleDrop = require("./utilities/handleDrop");
const handleSweeper = require("./utilities/handleSweeper");
require("dotenv").config();

// Initializing the app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN,
});

// Handling the mate command
app.command("/mate", async ({ client, command, ack, say }) => {
    try { 
      let subCommand = command.text;
      await ack();
      if(!!subCommand){
        subCommand = subCommand.toLowerCase();
        if(subCommand.includes("drop")){
            const dropReply = await handleDrop(subCommand);
            say(dropReply);
        } else if(subCommand.includes("mrsweeper")) {
          const resultArray = await handleSweeper(client, subCommand);
          if (resultArray && resultArray.length > 0) {
            await say('🔎 👀 *List of MRs*:')
            for (let i = 0; i < resultArray.length; i++) {
              say(resultArray[i])
            }
          } else {
            say(`You don't have any MRs to sweep. 😥`);
          }
        } else if(subCommand.includes("help")) {
          say("📙 *Here are the commands that I understand:* \n" + 
          "`/mate mrsweeper [insert channel name]`: Sweeps through the channel and collects all recent MRs \n" + 
          "`/mate drop npm packages for [insert package name]`: Returns top 10 npm packages for [package name] \n" +
          "`/mate drop an icebreaker question`: Asks an icebreaker question \n" +
          "`/mate drop a joke`: Cracks a joke \n" + 
          "`/mate drop tech news`: Tells you some recent tech news \n" + 
          "`/mate drop news`: Tells you some recent non-tech news \n")
        } else {
          say(`Type /mate help to see what I can do 😊`);
        }
      }
    } catch (error) {
      console.log("Error is:", error);
    }
});

// Handling the mate2 command
app.command("/mate2", async ({ command, ack, say }) => {
    try { 
      let subCommand = command.text;
      await ack();
      if(!!subCommand){
        subCommand = subCommand.toLowerCase();
        if(subCommand.includes("drop")){
            const dropReply = await handleDrop(subCommand);
            say(dropReply);
        };
      } else {
        say(`Type /mate2 help to see what I can do 😊`);
      }
    } catch (error) {
      console.log("Error is:", error);
    }
});

// Handling personal messages
app.message(/joke/, async ({ say }) => {
    try {
      say("I don't have any joke 😥");
    } catch (error) {
      console.log("error");
      console.error(error);
    }
});

// Starting the app
(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`The server is running on port ${port}!`);
})();