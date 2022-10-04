const httpMocks = require("node-mocks-http");

const rootController = require("../../routes/controllers/rootController");
const User = require("../../models/User");

const user = { _id: "test id", username: "test name", googleId: "test googleId" };
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();

  User.findOne = jest.fn();
  User.create = jest.fn();
});

afterEach(() => {
  User.findOne.mockClear();
  User.create.mockClear();
});

describe("PostLogin", () => {
  it("Have a postLogin function", () => {
    expect(typeof rootController.postLogin).toBe("function");
  });

  it("Don't call User.create when user with given googleId is found", async () => {
    req.body = { username: "test name", googleId: "test googleId" };
    User.findOne.mockReturnValue(user);

    await rootController.postLogin(req, res, next);

    expect(User.create).not.toBeCalled();
    expect(res.statusCode).toBe(200);
  });

  it("Call User.create when user with given googleId is not found", async () => {
    req.body = { username: "test name", googleId: "test googleId" };
    User.findOne.mockReturnValue(null);

    await rootController.postLogin(req, res, next);

    expect(User.create).toBeCalled();
    expect(res.statusCode).toBe(200);
  });
});
