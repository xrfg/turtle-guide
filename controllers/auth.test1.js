/**
 * @desc unit test for /api/auth
 */

const axios = require("axios");

const BASEurl = "http://localhost:5000/api/auth";
/**
 * @desc call function
 */

const getData = async (objCall) => {
  return axios(objCall)
    .then((res) => res)
    .catch((err) => err);
};

/**
 * @desc create OBJ to send
 */
const createObj = (objCall) => {
  const { method, url, params, token = "" } = objCall;

  // if token is not empty returns header with token
  // else header with out
  if (token) {
    return {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    method: method,
    url: url,
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

/**
 * @desc Params
 */

const credentialsRight = {
  firstName: "John",
  lastName: "Doe",
  accountName: "jdoe",
  email: "jdoe@email.com",
  isAdmin: false,
  password: "123456",
};

const credentialsWrong = {
  firstName: "FIVE",
  lastName: "LAST FIVE",
  userName: "userfive",
  email: "userfive@email.com",
  isAdmin: false,
  password: "XYZ",
};

/**
 * @desc test POST / GET Success / GET Error / POST Error
 * 1. POST to get the token
 * 2. GET to get user data with the token
 * 3. GET to get an error with wrong token
 * 4. POST to get an error with wrong credentials
 * 5. POST to get an error with wrong credentials
 */

describe("/api/users - POST / GET", () => {
  let tokenToSend = "";

  //   1. POST to get the token
  test(`1. POST user to get a token - Must return {success:true} and a token`, async () => {
    const res = await getData(
      createObj({
        method: "POST",
        url: BASEurl,
        params: credentialsRight,
      })
    );
    expect.assertions(2);

    expect(res.data.data.token).toHaveLength(res.data.data.token.length);
    expect(res.data.success).toBe(true);
    tokenToSend = res.data.data.token;
  });

  // 2. GET to get user data with the token
  test(`2. GET user with the gen token - Must return {success:true}`, async () => {
    const res = await getData(
      createObj({
        method: "GET",
        url: BASEurl,
        token: tokenToSend,
      })
    );
    expect.assertions(1);

    expect(res.data.success).toBe(true);
  });

  // 3. GET to get an error with wrong token
  test(`3. GET user with the wrong token - Must return {success:false}`, async () => {
    const res = await getData(
      createObj({
        method: "GET",
        url: BASEurl,
        token: tokenToSend + "XYZ",
      })
    );
    expect.assertions(3);

    // false
    expect(res.response.data.success).toBe(false);
    // msg
    expect(res.response.data.message).toBe("No valid Token!");
    // status
    expect(res.response.data.status).toBe(401);
  });

  // 4. POST to get an error with wrong credentials
  test(`4. POST user with wrong cred - Must return {success:false}`, async () => {
    const res = await getData(
      createObj({
        method: "POST",
        url: BASEurl,
        params: credentialsWrong,
      })
    );
    expect.assertions(3);

    // false
    expect(res.response.data.success).toBe(false);
    // msg
    expect(res.response.data.message).toBe("Invalid credentials");
    // status
    expect(res.response.data.status).toBe(400);
  });

  // 5. POST to get an error with wrong credentials
  test(`5. POST user with wrong cred - Must return {success:false}`, async () => {
    const res = await getData(
      createObj({
        method: "POST",
        url: BASEurl,
        // params: credentialsWrong,
      })
    );
    expect.assertions(3);

    // false
    expect(res.response.data.success).toBe(false);
    // msg
    expect(res.response.data.message).toBe("Invalid credentials");
    // status
    expect(res.response.data.status).toBe(400);
  });
});
