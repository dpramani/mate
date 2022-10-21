// Function that sweeps a set of MRs from a respective channel mentioned in the slash command
module.exports = async function handleSweeper(client, subCommand) {
    const channel = subCommand.split(' ').pop();
    let arr = [];
    if(channel.length > 0){
      const channelId = await findChannel(client, channel);
      arr = await getChannelHistory(client, channelId);
    }
    return arr;
};

// Find channel id using the conversations.list method
async function findChannel(client, name) {
    let channelId;
    try {
      // Call the conversations.list method using the built-in WebClient
      const result = await client.conversations.list({
        // The token you used to initialize your app
        token: process.env.SLACK_BOT_TOKEN
      });
      for (const channel of result.channels) {
        if (channel.name === name) {
          channelId = channel.id;
          // Break from for loop
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
    return channelId;
}

// Returns conversation history
async function getChannelHistory(client, channelId) {
    // Store conversation history
    let conversationHistory;
    let arr;
  
    try {
    // Call the conversations.history method using WebClient
    const result = await client.conversations.history({
        channel: channelId
    });
    conversationHistory = result.messages;
    arr = await getMR(conversationHistory)
    } catch (error) {
      console.error(error);
    }
    return arr;
}

// Gets all the merge requests
async function getMR(conversationHistory) {
    let arr = []
    conversationHistory = conversationHistory.sort((a, b) => a.ts < b.ts ? 1 : -1);
    for (let i = 0; i < conversationHistory.length; i++) {
        if (conversationHistory[i].text.includes("merge_requests")) {
            arr.push(conversationHistory[i].text)
        }
    }
    const uniqueArray = arr.filter(function(item, pos) {
      return arr.indexOf(item) == pos;
    })
    return uniqueArray;
}