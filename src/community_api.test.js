const firebase = require("firebase/app");
const firestore = require("./community_api_firestore");
firebase.firestore = firestore;

describe("setDocData", () => {
  const mockData = { fake: "data" };
  beforeEach(() => {
    jest.clearAllMocks();
    setDocData("fakeDocID", mockData);
  });

  it("writes the correct doc", () => {
    expect(firestore().doc).toHaveBeenCalledWith("docs/fakeDocID");
  });

  it("adds a timestamp, and writes it to the doc", () => {
    expect(firestore().doc().set).toHaveBeenCalledWith({
      created: "MOCK_TIME",
      fake: "data"
    });
  });
});

module.export = setDocData = (id, data) => {
  const newDoc = {
    created: firebase.firestore.FieldValue.serverTimestamp(),
    ...data
  };
  firebase.firestore().doc("docs/" + id).set(newDoc);
};
// const APICallsService = require('../community_api.js');

// const APICallsDB = require('firebase');
// jest.mock('firebase');