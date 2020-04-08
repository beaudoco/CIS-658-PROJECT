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

describe("getProviders", () => {
  const rootRef = firebase.firestore().doc("providers/");
  beforeEach(() => {
    jest.clearAllMocks();
    getProviders(rootRef);
  });

  it("gets the correct doc", () => {
    expect(firestore().doc).toHaveBeenCalledWith("providers/");
  });
});

describe("addShows", () => {
  const mockData = { fake: "data" };
  const rootRef = firebase.firestore().doc("shows/");
  const printer = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    addShows(rootRef, mockData, printer);
  });

  it("adds a show to the doc", () => {
    expect(firestore().doc().set).toHaveBeenCalledWith({
      fake: "data"
    });
  });
});

describe("getShows", () => {
  const rootRefShows = firebase.firestore().doc("shows/");
  beforeEach(() => {
    jest.clearAllMocks();
    getShows(rootRefShows);
  });

  it("gets the correct show doc", () => {
    expect(firestore().doc).toHaveBeenCalledWith("shows/");
  });
});

describe("getSeasons", () => {
  const rootRefShows = firebase.firestore().doc("seasons/");
  beforeEach(() => {
    jest.clearAllMocks();
    getSeasons(rootRefShows);
  });

  it("gets the correct show doc", () => {
    expect(firestore().doc).toHaveBeenCalledWith("seasons/");
  });
});

describe("updateRelatedShows", () => {
  const mockData = { fake: "data" };
  const rootRef = firebase.firestore();
  beforeEach(() => {
    jest.clearAllMocks();
    updateRelatedShows(rootRef, "fakeDocID", mockData);
  });

  it("writes the correct doc", () => {
    expect(firestore().doc).toHaveBeenCalledWith("shows/fakeDocID");
  });

  it("adds a show, and writes it to the doc", () => {
    expect(firestore().doc().set).toHaveBeenCalledWith({
      fake: "data"
    });
  });
});


describe("addComments", () => {
  const mockData = { fake: "data" };
  const rootRef = firebase.firestore().doc("comments/");
  beforeEach(() => {
    jest.clearAllMocks();
    addComments(rootRef, mockData);
  });

  it("adds a comment to the doc", () => {
    expect(firestore().doc().set).toHaveBeenCalledWith({
      fake: "data"
    });
  });
});

describe("getComments", () => {
  const rootRefShows = firebase.firestore().doc("comments/");
  beforeEach(() => {
    jest.clearAllMocks();
    getComments(rootRefShows);
  });

  it("gets the correct show doc", () => {
    expect(firestore().doc).toHaveBeenCalledWith("comments/");
  });
});

module.export = setDocData = (id, data) => {
  const newDoc = {
    created: firebase.firestore.FieldValue.serverTimestamp(),
    ...data
  };
  firebase.firestore().doc("docs/" + id).set(newDoc);
};

module.export = getProviders = (rootRef) => {
  firebase.firestore().doc("providers/").get().then();
  //rootRef.get();
}

module.export = addShows = (rootRef, showObj, printer) => {
  rootRef.set(showObj);
}

module.export = addComments = (rootRef, commentObj) => {
  rootRef.set(commentObj);
};

module.export = getShows = (rootRef) => {
  firebase.firestore().doc("shows/").get().then();
  //rootRef.get();
}

module.export = getSeasons = (rootRef) => {
  firebase.firestore().doc("seasons/").get().then();
  //rootRef.get();
}

module.export = updateRelatedShows = (rootRef, id, data) => {
  rootRef.doc("shows/" + id).set(data);
};

module.export = getComments = (rootRef) => {
  firebase.firestore().doc("comments/").get().then();
  //rootRef.get();
}