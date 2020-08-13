"use strict";

const app = require("../../app.js");
const chai = require("chai");
const expect = chai.expect;
var event, context;

describe("Tests index", function () {
  it("verifies successful response", async () => {
    const result = await app.lambdaHandler(event, context);
    console.log(`result=${result}`);

    expect(result).to.be.an("object");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an("string");

    let response = JSON.parse(result.body);
    let item = response.message;

    expect(response).to.be.an("object");
    console.log(result.body);
    console.log(`result.body=${result.body}`);
    console.log(`item=${item}`);
    console.log(`Comment=${item.Comment}`);
  });
});
