const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-northeast-1",
});
const docClient = new AWS.DynamoDB.DocumentClient();

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
  return response;
};
