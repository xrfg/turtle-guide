/**
 * @desc unit test for /api/users
 */
const axios = require("axios");

const BASEurl = "http://localhost:5000/api/users";

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
  const { method, url, params } = objCall;

  const obj = {
    method: method,
    url: url,
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return obj;
};

/**
 * @desc Params
 */

const userNameEmailGen = Math.floor(Math.random() * 999999);
const userToCreate = {
  firstName: "NAME_" + userNameEmailGen.toString().substring(0, 4),
  lastName: "LAST_" + userNameEmailGen.toString().substring(0, 4),
  company: "ACME_" + userNameEmailGen.toString().substring(0, 4),
  accountName: userNameEmailGen,
  email: `${userNameEmailGen}@email.com`,
  isAdmin: false,
  password: "123456",
};

/**
 * @desc test POST 2 times
 * 1. POST a new user
 * 2. POST the same user to get an error
 */

describe("/api/users - POST (2 times)", () => {
  // create obj in a const to use it more times
  const makeObjToSend = createObj({
    method: "POST",
    url: BASEurl,
    params: userToCreate,
  });

  // 1. POST a user - Must return {success:true}, generated email/userName
  test(`POST a user - Must return {success:true}, generated email/userName`, async () => {
    const res = await getData(makeObjToSend);

    expect.assertions(3);

    expect(Number(res.data.data.accountName)).toBe(Number(userNameEmailGen));
    expect(res.data.data.email).toBe(`${userNameEmailGen}@email.com`);
    expect(res.data.success).toBe(true);
  });

  // 2. POST an existing accountName and email - Must return {success:false}
  test(`POST an existing accountName and email - Must return {success:false}`, async () => {
    const res = await getData(makeObjToSend);
    expect.assertions(3);

    // false
    expect(res.response.data.success).toBe(false);
    // msg
    expect(res.response.data.message).toBe("Email already exists!");
    // status
    expect(res.response.data.status).toBe(409);
  });
});
