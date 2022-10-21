// Find specified channel `general`
module.exports = async function handleSweeper(client, subCommand) {
    console.log(client)
    console.log("Inside handleSweeper");
    findChannel(client, "general");
    const arr = await getChannelHistory(client)
    return arr
  };
    // Find conversation ID using the conversations.list method
    async function findChannel(client, name) {
    try {
      // Call the conversations.list method using the built-in WebClient
      const result = await client.conversations.list({
        // The token you used to initialize your app
        token: "xoxb-4254303691764-4251919334163-mdEF3BS91jAwHlTAdnYWa3aj"
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
  }
  async function getChannelHistory(client) {
    // Store conversation history
    let conversationHistory;
    // ID of channel you watch to fetch the history for
    // Need to do a GET command to get JSON output from the "channels" array
    let channelId = "C047AS8CGCV"; // Will be the #general channelId returned from the previous function
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
        console.error(error);
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
      return arr.indexOf(item) == pos;
    })
    return uniqueArray;
}