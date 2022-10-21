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
          if (resultArray.length > 0) {
            for (let i = 0; i < (await resultArray).length; i++) {
              say(resultArray[i])
            }
          }
          } else {
            say(`You don't have any MRs to sweep.`);
          }
      } else {
        say(`Type /mate help to see what I can do`);
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
        say(`Type /mate2 help to see what I can do`);
      }
    } catch (error) {
      console.log("Error is:", error);
    }
});

// Handling personal messages
app.message(/joke/, async ({ say }) => {
    try {
      say("I don't have any joke");
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