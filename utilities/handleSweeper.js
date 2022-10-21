// Find specified channel `general`
module.exports = async function handleSweeper(client, subCommand) {
    console.log("Inside handleSweeper");
    const channelId = await findChannel(client, "test2");
    const arr = await getChannelHistory(client, channelId)
    return arr
  };
    // Find conversation ID using the conversations.list method
    async function findChannel(client, name) {
    try {
      // Call the conversations.list method using the built-in WebClient
      const result = await client.conversations.list({
        // The token you used to initialize your app
        token: process.env.SLACK_BOT_TOKEN
      });
      for (const channel of result.channels) {
        if (channel.name === name) {
          channelId = channel.id;
          // Print result
          console.log("Found channel ID: " + channelId);
          // Break from for loop
          break;
        }
      }
    }
    catch (error) {
      console.error(error);
    }
    return channelId;
  }

  async function getChannelHistory(client, channelId) {
    // Store conversation history
    let conversationHistory;
  
    try {
    // Call the conversations.history method using WebClient
    const result = await client.conversations.history({
        channel: channelId
    });
    conversationHistory = result.messages;
    // Print results
    console.log(conversationHistory.length + " messages found in " + channelId);
    var json = JSON.stringify(conversationHistory);
    var arr = await getMR(client, json, conversationHistory)
    } catch (error) {
        console.error("Inside getChannelHistory" + error);
    }
    return arr;
  }
  async function getMR(client, json, conversationHistory) {
    let arr = []
    for (let i = 0; i < conversationHistory.length; i++) {
        if (conversationHistory[i].text.includes("merge_requests")) {
            arr.push(conversationHistory[i].text)
        }
    }
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i] + "\n")
    }
    const uniqueArray = arr.filter(function(item, pos) {
      console.log("Item: " + item)
      return arr.indexOf(item) == pos;
    })
    return uniqueArray;
}