/**
 * @desc unit test for /api/guides
 */

const axios = require("axios");
const mongoose = require("mongoose");

const BASEurlAuth = "http://localhost:5000/api/auth";
const BASEurl = "http://localhost:5000/api/guides";

/**
 * @desc call function
 */

const getData = async (objCall) => {
  return axios(objCall)
    .then((res) => res)
    .catch((err) => {
      return err;
    });
};

/**
 * @desc create OBJ to send
 */
const createObj = (objCall) => {
  const { method, url, data = {}, token = "", params = "" } = objCall;

  // if token is not empty returns header with token
  // else header with out
  if (token) {
    return {
      method: method,
      url: url,
      // params: params,
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
    // params: params,
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

const credentialsRightUserFour = {
  email: "userXYZ@email.com",
  password: "123456",
};

const newGuideOneRight = {
  nameIdentifier: "testguideone",
  title: "Title Test Guide One",
  description: "A test guide description",
  sections: [
    {
      room: "Room 1",
    },
    { room: "Room 2" },
  ],
  menuOne: [
    {
      title: "Item 1",
    },
    { title: "Item 2" },
  ],
  menuTwo: [
    {
      title: "Item 1",
    },
    { title: "Item 2" },
  ],
  account: "611e5aca56104a1c09f9d13e",
};

const newGuideTwoRight = {
  nameIdentifier: "testguidetwo",
  title: "Title Test Guide Two",
  description: "A test guide description",
  sections: [
    {
      room: "Room 1",
    },
    { room: "Room 2" },
  ],
  menuOne: [
    {
      title: "Item 1",
    },
    { title: "Item 2" },
  ],
  menuTwo: [
    {
      title: "Item 1",
    },
    { title: "Item 2" },
  ],
  account: "611e5aca56104a1c09f9d13e",
};

const newGuideOneUpdate = {
  nameIdentifier: "testguideoneUPDATE",
  title: "Title Test Guide One UPDATE",
  description: "A test guide description UPDATE",
  sections: [
    {
      room: "Room 1",
    },
    { room: "Room 2" },
  ],
  menuOne: [
    {
      title: "Item 1",
    },
    { title: "Item 2" },
  ],
  menuTwo: [
    {
      title: "Item 1",
    },
    { title: "Item 2" },
  ],
  account: "611e5aca56104a1c09f9d13e",
};

describe("/api/guides - POST - GET - PUT - DELETE", () => {
  // token to use for access
  let tokenToSend = "";

  // 1. POST to get a token
  test(`1. POST user to get a token - Must return {success:true} and a token`, async () => {
    const res = await getData(
      createObj({
        method: "POST",
        url: BASEurlAuth,
        data: credentialsRight,
      })
    );
    expect.assertions(3);

    // check length and test it
    expect(res.data.success).toBe(true);

    // right length
    expect(res.data.data.token).toHaveLength(res.data.data.token.length);

    // wrong length
    expect(res.data.data.token).not.toHaveLength(9789770);

    tokenToSend = res.data.data.token;
  });

  // 2. POST a first new guide
  test(`2. POST a first new guide - Must return {success:true} and a token`, async () => {
    const res = await getData(
      createObj({
        method: "POST",
        url: BASEurl,
        token: tokenToSend,
        data: newGuideOneRight,
      })
    );
    expect.assertions(2);
    // check length and test it
    expect(res.data.success).toBe(true);

    // check if title matches
    expect(res.data.data.nameIdentifier).toMatch(
      newGuideOneRight.nameIdentifier
    );
  });

  // 3. POST the same guide the second time and get error
  test(`3. POST the same guide the second time and get error - Must return {success:false}`, async () => {
    const res = await getData(
      createObj({
        method: "POST",
        url: BASEurl,
        token: tokenToSend,
        data: newGuideOneRight,
      })
    );
    expect.assertions(3);

    // false
    expect(res.response.data.success).toBe(false);
    // msg
    expect(res.response.data.message).toBe(
      "The Name Identifier must be unique! Please enter another one."
    );
    // status
    expect(res.response.data.status).toBe(409);
  });

  // 4. POST a guide without permission
  test(`4. POST a guide with a wrong token - Must return {success:false}`, async () => {
    const res = await getData(
      createObj({
        method: "POST",
        url: BASEurl,
        token: tokenToSend + "JKJ",
        data: newGuideOneRight,
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

  // 5. POST a second new guide
  test(`5. POST a second new guide - Must return {success:true}`, async () => {
    const res = await getData(
      createObj({
        method: "POST",
        url: BASEurl,
        token: tokenToSend,
        data: newGuideTwoRight,
      })
    );
    expect.assertions(2);
    // check length and test it
    expect(res.data.success).toBe(true);

    // check if title matches
    expect(res.data.data.nameIdentifier).toMatch(
      newGuideTwoRight.nameIdentifier
    );
  });

  // 6. GET a specifc guide the first posted
  test(`6. GET a specifc guide the first posted - Must return {success:true}`, async () => {
    const res = await getData(
      createObj({
        method: "GET",
        url: BASEurl + "/" + newGuideOneRight.nameIdentifier,
        token: tokenToSend,
      })
    );
    expect.assertions(2);
    // check length and test it
    expect(res.data.success).toBe(true);

    // check if title matches
    expect(res.data.data.nameIdentifier).toMatch(
      newGuideOneRight.nameIdentifier
    );
  });

  // 7. GET a specifc guide the second posted
  test(`7. GET a specifc guide the second posted - Must return {success:true}`, async () => {
    const res = await getData(
      createObj({
        method: "GET",
        url: BASEurl + "/" + newGuideTwoRight.nameIdentifier,
        token: tokenToSend,
      })
    );
    expect.assertions(2);
    // check length and test it
    expect(res.data.success).toBe(true);

    // check if title matches
    expect(res.data.data.nameIdentifier).toMatch(
      newGuideTwoRight.nameIdentifier
    );
  });

  // 8. GET all the guides of a user
  test(`8. GET all the guides of a user - Must return {success:true}`, async () => {
    const res = await getData(
      createObj({
        method: "GET",
        url: BASEurl,
        token: tokenToSend,
      })
    );
    expect.assertions(2);
    // check length and test it
    expect(res.data.success).toBe(true);

    // check if title matches
    expect(res.data.data).toHaveLength(res.data.data.length);
  });

  // 9. PUT update a guide the first posted guide
  test(`9. PUT update a guide the first posted guide - Must return {success:true}`, async () => {
    const res = await getData(
      createObj({
        method: "PUT",
        url: BASEurl + "/" + newGuideOneRight.nameIdentifier,
        token: tokenToSend,
        data: newGuideOneUpdate,
      })
    );

    expect.assertions(2);
    // check length and test it
    expect(res.data.success).toBe(true);

    // check if title matches
    expect(res.data.data.nameIdentifier).toMatch(
      newGuideOneUpdate.nameIdentifier
    );
  });

  // 10. PUT update a guide without permission
  test(`10. PUT update a guide without permission - Must return {success:false}`, async () => {
    const res = await getData(
      createObj({
        method: "PUT",
        url: BASEurl + "/" + newGuideOneRight.nameIdentifier,
        token: tokenToSend + "JKJ",
        data: newGuideOneUpdate,
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

  // 11. DELETE guide without permission
  test(`11. DELETE guide without permission - Must return {success:false}`, async () => {
    const res = await getData(
      createObj({
        method: "DELETE",
        url: BASEurl + "/" + newGuideOneRight.nameIdentifier,
        token: tokenToSend + "JKJ",
        data: newGuideOneUpdate,
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

  // 12. DELETE the first guide
  test(`12. DELETE the first UPDATED guide - Must return {success:true}`, async () => {
    const res = await getData(
      createObj({
        method: "DELETE",
        url: BASEurl + "/" + newGuideOneUpdate.nameIdentifier,
        token: tokenToSend,
      })
    );

    expect.assertions(2);
    // check length and test it
    expect(res.data.success).toBe(true);

    // check if title matches
    expect(res.data.data.nameIdentifier).toMatch(
      newGuideOneUpdate.nameIdentifier
    );
  });

  // 13. DELETE the second guide
  test(`13. DELETE the second guide - Must return {success:true}`, async () => {
    const res = await getData(
      createObj({
        method: "DELETE",
        url: BASEurl + "/" + newGuideTwoRight.nameIdentifier,
        token: tokenToSend,
      })
    );

    expect.assertions(2);
    // check length and test it
    expect(res.data.success).toBe(true);

    // check if title matches
    expect(res.data.data.nameIdentifier).toMatch(
      newGuideTwoRight.nameIdentifier
    );
  });
});
