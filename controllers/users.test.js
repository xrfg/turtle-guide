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
// const createObj = (objCall) => {
//   const { method, url, params } = objCall;

//   const obj = {
//     method: method,
//     url: url,
//     data: params,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   return obj;
// };

const createObj = (objCall) => {
  const { method, url, data = {}, token = "", params = "" } = objCall;

  // if token is not empty returns header with token
  // else header with out
  if (token) {
    return {
      method: method,
      url: url,
      params: params,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    method: method,
    url: url,
    data: data,
    params: params,
    headers: {
      "Content-Type": "application/json",
    },
  };
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
  plan: "Basic Plan",
};

const userToPatch = {
  firstName: "PATCHED_NAME_" + userNameEmailGen.toString().substring(0, 4),
  lastName: "PATCHED_LAST_" + userNameEmailGen.toString().substring(0, 4),
  company: "PATCHED_ACME_" + userNameEmailGen.toString().substring(0, 4),
  accountName: userNameEmailGen,
  email: `${userNameEmailGen}@patchedemail.com`,
  isAdmin: false,
  password: "123456",
  plan: "Basic Plan",
};

/**
 * @desc test POST 2 times
 * 1. POST a new user
 * 2. POST the same user to get an error
 * 3. PATCH the same changin some infos
 */

describe("/api/users - POST (2 times)", () => {
  let idToPatch = "";

  // create obj in a const to use it more times
  const makeObjToSendPost = createObj({
    method: "POST",
    url: BASEurl,
    data: userToCreate,
  });

  // 1. POST a user - Must return {success:true}, generated email/userName
  test(`POST a user - Must return {success:true}, generated email/userName`, async () => {
    const res = await getData(makeObjToSendPost);

    expect.assertions(3);

    // set id to patch
    idToPatch = res.data.data._id;

    expect(Number(res.data.data.accountName)).toBe(Number(userNameEmailGen));
    expect(res.data.data.email).toBe(`${userNameEmailGen}@email.com`);
    expect(res.data.success).toBe(true);
  });

  // 2. POST an existing accountName and email - Must return {success:false}
  test(`POST an existing accountName and email - Must return {success:false}`, async () => {
    const res = await getData(makeObjToSendPost);
    expect.assertions(3);
    // false
    expect(res.response.data.success).toBe(false);
    // msg
    expect(res.response.data.message).toBe("Email already exists!");
    // status
    expect(res.response.data.status).toBe(409);
  });

  // 3. PATCH an existing accountName and email - Must return {success:false}
  test(`PATCH a user - Must return {success:true}, patched email/userName`, async () => {
    const makeObjToSendPatch = createObj({
      method: "PUT",
      url: BASEurl,
      data: { ...userToPatch, _id: idToPatch },
      token: process.env.TEST_TOKEN,
    });

    const res = await getData(makeObjToSendPatch);

    expect.assertions(6);

    expect(Number(res.data.data.accountName)).toBe(Number(userNameEmailGen));
    expect(res.data.data.firstName).toBe(userToPatch.firstName);
    expect(res.data.data.lastName).toBe(userToPatch.lastName);
    expect(res.data.data.company).toBe(userToPatch.company);
    expect(res.data.data.email).toBe(`${userNameEmailGen}@patchedemail.com`);
    expect(res.data.success).toBe(true);
  });
});
