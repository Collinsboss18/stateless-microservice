require("dotenv").config({ path: ".env" });
const DEV_HOST = process.env.DEV_HOST;
const { default: axios } = require("axios");

let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("login GET", () => {
  let input;

  beforeEach(() => {
    input = {
      username: "username",
      password: "password",
    };
  });

  describe("when input is invalid", () => {
    it("returns `status` 400", () => {
      let params = input;
      delete params.password;
      axios({
        method: "POST",
        url: `${DEV_HOST}/api/login`,
        data: params,
      }).catch((error) => {
        expect(error.response.status).to.equal(400);
      });
    });
  });

  describe("when input is valid", () => {
    it("return a `token` field", () => {
      axios({
        method: "POST",
        url: `${DEV_HOST}/api/login`,
        data: input,
      }).then((res) => {
        expect(res.data.data).to.have.property("token");
      });
    });

    it("a different value for `password`", () => {
      axios({
        method: "POST",
        url: `${DEV_HOST}/api/login`,
        data: input,
      }).then((res) => {
        expect(res.data.data.password).to.not.equal(input.password);
      });
    });
  });
});

describe("jsonpatch POST", () => {
  let input;

  beforeEach(() => {
    input = {
      patch: { op: "replace", path: "/baz", value: "boo" },
      json: { baz: "qux", foo: "bar" },
    };
  });

  describe("when input is invalid", () => {
    it("returns `status` 400", () => {
      let params = input;
      delete params.patch;
      axios({
        method: "POST",
        url: `${DEV_HOST}/api/jsonpatch`,
        data: params,
      }).catch((error) => {
        expect(error.response.status).to.equal(400);
      });
    });
  });

  describe("when input is valid", () => {
    it("returns a patched json", () => {
      axios({
        method: "POST",
        url: `${DEV_HOST}/api/jsonpatch`,
        data: input,
      }).then((res) => {
        expect(res.data.data).to.deep.include({
          baz: "boo",
          foo: "bar",
        });
      });
    });
  });
});

describe("thumbnail POST", () => {
  describe("when input is invalid", () => {
    it("returns `status` 400", () => {
      axios({
        method: "POST",
        url: `${DEV_HOST}/api/thumbnail`,
      }).catch((error) => {
        expect(error.response.status).to.equal(400);
      });
    });
  });

  describe("when input is valid", () => {
    it("returns a buffer", () => {
      axios({
        method: "POST",
        url: `${DEV_HOST}/api/thumbnail`,
        data: {
          url: "https://image.tmdb.org/t/p/original/hkC4yNDFmW1yQuQhtZydMeRuaAb.jpg",
        },
      }).then((res) => {
        expect(res.data.data.type).to.equal("Buffer");
      });
    });
  });
});
