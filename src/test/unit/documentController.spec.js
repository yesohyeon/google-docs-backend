const httpMocks = require("node-mocks-http");

const documentController = require("../../routes/controllers/documentController");
const User = require("../../models/User");
const Document = require("../../models/Document");

const user = { _id: "test user id", username: "test name", googleId: "test googleId" };
const documents = {
  "_id": "test document id",
  "creator": "test creator id",
  "body": "test body"
};
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  next = jest.fn();

  User.findOne = jest.fn();
  Document.find = jest.fn()
    .mockImplementationOnce(
      () => ({ sort: jest.fn().mockResolvedValueOnce(documents) })
    );
  Document.create = jest.fn();
});

afterEach(() => {
  User.findOne.mockClear();
  Document.find.mockClear();
  Document.create.mockClear();
});

describe("GetOwnDocuments", () => {
  it("Have a getOwnDocuments", () => {
    expect(typeof documentController.getOwnDocuments).toBe("function");
  });

  it("Create error when google id is not provided", async () => {
    req.params.googleId = undefined;

    await documentController.getOwnDocuments(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Create error when user is not found", async () => {
    req.params.googleId = "test googleId";
    User.findOne.mockReturnValue(null);

    await documentController.getOwnDocuments(req, res, next);

    expect(next).toBeCalled();
    expect(Document.find).not.toBeCalled();
  });

  it("Return 200 response code and send document when document is found", async () => {
    req.params.googleId = "test googleId";
    User.findOne.mockReturnValue(user);

    await documentController.getOwnDocuments(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toBeCalled();
  });
});

describe("PostNewDocument", () => {
  it("Have a postNewDocument", () => {
    expect(typeof documentController.postNewDocument).toBe("function");
  });

  it("Create error when google id is not provided", async () => {
    req.body.googleId = undefined;

    await documentController.postNewDocument(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Create error when user is not found", async () => {
    req.body.googleId = "test googleId";
    User.findOne.mockReturnValue(null);

    await documentController.postNewDocument(req, res, next);

    expect(next).toBeCalled();
    expect(Document.create).not.toBeCalled();
  });

  it("Return 201 response code and send document id when creating document succeed", async () => {
    req.body.googleId = "test googleId";
    User.findOne.mockReturnValue(user);
    Document.create.mockReturnValue(documents);

    await documentController.postNewDocument(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toBeCalled();
  });
});
