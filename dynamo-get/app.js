require('dotenv').config();
const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });
const docClient = new AWS.DynamoDB.DocumentClient();
const { App, ExpressReceiver } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
});

exports.lambdaHandler = async (event, context) => {
  let response;
  let params = {
    TableName: "ExampleTest",
    Key: {
      UserId: 1,
    },
  };
  await docClient
    .get(params, function (err, data) {
      if (err) {
        console.log(`res_err=${err}`);
        response = {
          statusCode: 403,
          body: JSON.stringify({
            message: err,
          }),
        };
      } else {
        console.log(data.Item);
        response = {
          statusCode: 200,
          body: JSON.stringify({
            message: data.Item,
          }),
        };
      }
    })
    .promise();
  // TODO： Slack に何かしら戻したい値を定義する
  app.client.chat.postMessage({
    channel: process.env.SLACK_CHANNEL,
    text: response,
    token: process.env.SLACK_BOT_TOKEN
  });

  return response;
};
