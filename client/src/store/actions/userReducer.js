// import {
//   GOOGLE_SEARCH,
//   GOOGLE_SEARCH_ERROR,
//   GOOGLE_SEARCH_CLEAR,
//   GOOGLE_SEARCH_CLEAR_ERROR,
//   GOOGLE_SEARCH_SEARCHED,
//   GOOGLE_SEARCH_SEARCHED_ERROR,
//   ADD_TO_WOO_DB_ERROR,
//   UPDATE_WOO_DB_ERROR,
//   WOO_DB_ALL,
//   WOO_DB_IN,
//   WOO_DB_OUT,
//   WOO_DB_ERROR,
//   WOO_DB_DELETE_ALL,
//   WOO_DB_DELETE_IN,
//   WOO_DB_DELETE_OUT,
//   WOO_DB_DELETE_ERROR,
//   WOO_DB_SEARCH_STATE,
//   WOO_DB_SEARCH_STATE_ERROR,
//   WOO_DB_SEARCH_TERM,
//   WOO_DB_SEARCH_TERM_ERROR,
//   WOO_DB_SEARCH_CLEAR,
//   WOO_DB_SEARCH_CLEAR_ERROR,
//   WOO_DB_DATA_READY,
//   WOO_DB_DATA_READY_ERROR,
//   SET_LOADING,
//   SET_LOADING_ERROR,
// } from "../types";

import axios from "axios";
/**
 * @desc Variables
 */
// const API = process.env.REACT_APP_GOOGLE_BOOK_API;
// const API_CONVERTER = process.env.REACT_APP_API_CONVERTER;
// const WOO_CK = process.env.REACT_APP_WOO_CK;
// const WOO_CS = process.env.REACT_APP_WOO_CS;

/**
 * @desc cals the Google Books APIs
 * and searches based on title/author or ISBN
 */

export const googleSearch = (entry) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      if (!entry.isbn) {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${entry.title}+inauthor:${entry.author}&maxResults=${entry.results}&key=${API}`,
          entry
        );

        await dispatch({ type: GOOGLE_SEARCH, payload: res.data.items });

        return res;
      } else if (entry.isbn) {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${entry.isbn}&maxResults=${entry.results}&key=${API}`,
          entry
        );
        await dispatch({ type: GOOGLE_SEARCH, payload: res.data.items });
        return res;
      }
    } catch (error) {
      dispatch({ type: GOOGLE_SEARCH_ERROR, payload: error });
      console.error("error", error);
    }
  };
};

export const setGoogleSearchClear = () => {
  return async (dispatch) => {
    try {
      await dispatch({ type: GOOGLE_SEARCH_CLEAR });
    } catch (error) {
      dispatch({ type: GOOGLE_SEARCH_CLEAR_ERROR, payload: error });
      console.error("error", error);
    }
  };
};

/**
 * @desc set the terms searched in google
 */

export const setGoogleSearched = (state) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: GOOGLE_SEARCH_SEARCHED, payload: state });
    } catch (error) {
      dispatch({ type: GOOGLE_SEARCH_SEARCHED_ERROR, payload: error });
      console.error("error", error);
    }
  };
};

/**
 * @desc POST to WooCommerce
 */

export const addToWooDb = (info, isbn, item2, quantity, status, price) => {
  const getIsbn = (arr) => {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
      let typeOfCode = "";
      if (arr[i].type.includes("_")) {
        typeOfCode = arr[i].type.replace("_", " ");
        str += typeOfCode + " : " + arr[i].identifier + " ";
      } else {
        str += arr[i].type + " : " + arr[i].identifier + " ";
      }
    }

    return str;
  };

  /**
   * @desc creates obj for the cover
   * prepares it for the conversion
   */
  const dataImg = {
    Parameters: [
      {
        Name: "File",
        FileValue: {
          Url: `${info.imageLinks.thumbnail}`,
        },
      },
      {
        Name: "StoreFile",
        Value: true,
      },
      {
        Name: "WebHook",
        Value: `${info.imageLinks.thumbnail}`,
      },
    ],
  };

  return async (dispatch) => {
    /**
     * @desc converts webp to JPG
     */
    const fetchData = async () => {
      const result = await axios.request({
        method: "post",
        url: `https://v2.convertapi.com/convert/webp/to/jpg?Secret=${API_CONVERTER}`,
        data: dataImg,
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      });
      return result;
    };

    try {
      const imgResults = await fetchData();

      // fetchData().then(async function (results) {
      /**
       * @desc obj creation for the codes
       */

      //1. create obj
      const objCodes = {
        isbn_10: "Not provided",
        isbn_13: "Not provided",
        other: "Not provided",
      };

      //
      const extractArr = () => {
        isbn.map((x) => {
          if (x.type === "OTHER") {
            objCodes.other = x.identifier;
          }
          if (x.type === "ISBN_10") {
            objCodes.isbn_10 = x.identifier;
          }
          if (x.type === "ISBN_13") {
            objCodes.isbn_13 = x.identifier;
          }
        });
      };

      extractArr();

      /**
       * @desc remapping the data in a new obj
       */
      const data = {
        name: `${info.title}`,
        type: "simple",
        regular_price: `${price.price}`,
        description: `${info.description}`,
        short_description: `${info.authors.join(", ")}`,
        categories: [{ id: 9 }, { id: 14 }],
        manage_stock: true,
        stock_quantity: quantity.stock,
        images: [
          {
            src: imgResults.data.Files[0].Url,
          },
        ],
        /**
         * @desc ids are changing based on the wordpress
         * console.log(res.data) at line 443 and check the ids
         */
        attributes: [
          {
            id: 1,
            name: "ISBN 10",
            position: 1,
            visible: true,
            variation: false,
            options: [objCodes.isbn_10],
          },
          {
            id: 2,
            name: "ISBN 13",
            position: 2,
            visible: true,
            variation: false,
            options: [objCodes.isbn_13],
          },
          {
            id: 3,
            name: "OTHER",
            position: 3,
            visible: true,
            variation: false,
            options: [objCodes.other],
          },
          {
            id: 0,
            name: "Book status",
            position: 0,
            visible: true,
            variation: false,
            options: status.status,
          },
        ],
        meta_data: [
          {
            id: 32,
            key: "_wpm_gtin_code",
            value: getIsbn(isbn),
          },
        ],
        ean_code: getIsbn(isbn),

        /**
         * @desc gets visualized in WooCommerce Product
         */
      };

      /**
       * @function sendPostRequest
       * @desc POST in WooCommerce
       */

      const sendPostRequest = async (obj) => {
        try {
          const resultReq = await axios({
            method: "post",
            url: `https://www.marcovignotto.com/mybookstore/wp-json/wc/v3/products?consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`,
            data: obj,
          });

          return resultReq.status;
        } catch (error) {
          dispatch({ type: ADD_TO_WOO_DB_ERROR, payload: error });
          console.error(error);
        }
      };

      /**
       * @desc call the function
       */
      return sendPostRequest(data);
    } catch (error) {
      dispatch({ type: ADD_TO_WOO_DB_ERROR, payload: error });
      console.error(error);
    }
  };
};

/**
 * @desc PUT on WooCommerce
 */

export const updateWooDb = (
  id,
  newPrice,
  newStockQuantity,
  newBookStatus,
  codes
) => {
  const data = {
    regular_price: `${newPrice.price}`,
    stock_quantity: newStockQuantity.stock,
    attributes: [
      {
        id: 4,
        name: "Book status",
        position: 0,
        visible: true,
        variation: false,
        options: newBookStatus.status,
      },
      { ...codes[1] },
      { ...codes[2] },
      { ...codes[3] },
    ],
  };

  const dataJson = JSON.stringify(data);

  const config = {
    config: {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8",
      },
    },
    data: dataJson,
  };

  return async (dispatch) => {
    try {
      const resultReq = axios({
        method: "put",
        url: `https://www.marcovignotto.com/mybookstore/wp-json/wc/v3/products/${id}?consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`,
        data,
      });

      /**
       * @desc sends status back
       */
      return resultReq.then((x) => x.status);
    } catch (error) {
      dispatch({ type: UPDATE_WOO_DB_ERROR, payload: error });
      console.log(error);
    }
  };
};

/**
 * @desc DELETE from WooCommerce
 */

export const deleteWooDb = (id) => {
  return async (dispatch) => {
    try {
      const resultReq = axios({
        method: "delete",
        url: `https://www.marcovignotto.com/mybookstore/wp-json/wc/v3/products/${id}?consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`,
      });

      setTimeout(() => {
        dispatch({ type: WOO_DB_DELETE_ALL, payload: id });
        dispatch({ type: WOO_DB_DELETE_IN, payload: id });
        dispatch({ type: WOO_DB_DELETE_OUT, payload: id });
      }, 2000);
      return resultReq.then((x) => x.status);
    } catch (error) {
      dispatch({ type: WOO_DB_DELETE_ERROR, payload: error });
      console.error("error", error);
    }
  };
};

/**
 * @desc retrives all the data from WooCommerce
 * @requires setWooDbState to choose the kind of search
 * stock / out of stock / all
 */

export const getWooDbAll = (stock, searchTerms) => {
  if (searchTerms === null) {
    return async (dispatch) => {
      try {
        const res = await axios.request({
          method: "get",
          url: `https://www.marcovignotto.com/mybookstore/wp-json/wc/v3/products?${stock}&per_page=100&consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`,
        });

        if (stock === "") {
          await dispatch({ type: WOO_DB_ALL, payload: res.data });
          return await res.data;
        } else if (stock === "stock_status=instock&") {
          await dispatch({ type: WOO_DB_IN, payload: res.data });
          return await res.data;
        } else if (stock === "stock_status=outofstock&") {
          await dispatch({ type: WOO_DB_OUT, payload: res.data });
          return await res.data;
        }
      } catch (error) {
        dispatch({ type: WOO_DB_ERROR, payload: error });
        console.error("error", error);
      }
    };
  } else {
    return async (dispatch) => {
      try {
        const res = await axios.request({
          method: "get",
          url: `https://www.marcovignotto.com/mybookstore/wp-json/wc/v3/products?${stock}&search=${searchTerms}&per_page=100&consumer_key=${WOO_CK}&consumer_secret=${WOO_CS}`,
        });

        if (stock === "") {
          await dispatch({ type: WOO_DB_ALL, payload: res.data });
          return await res.data;
        } else if (stock === "stock_status=instock&") {
          await dispatch({ type: WOO_DB_IN, payload: res.data });
          return await res.data;
        } else if (stock === "stock_status=outofstock&") {
          await dispatch({ type: WOO_DB_OUT, payload: res.data });
          return await res.data;
        }
      } catch (error) {
        dispatch({ type: WOO_DB_ERROR, payload: error });
        console.error("error", error);
      }
    };
  }
};

/**
 * @desc set the kind of search in WooCommerce
 * stock / out of stock / all
 */

export const setWooDbState = (state) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: WOO_DB_SEARCH_STATE, payload: state });
    } catch (error) {
      dispatch({ type: WOO_DB_SEARCH_STATE_ERROR, payload: error });
      console.error("error", error);
    }
  };
};

export const setWooSearchTerm = (state) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: WOO_DB_SEARCH_TERM, payload: state });
    } catch (error) {
      dispatch({ type: WOO_DB_SEARCH_TERM_ERROR, payload: error });
      console.error("error", error);
    }
  };
};

export const setWooSearchClear = () => {
  return async (dispatch) => {
    try {
      await dispatch({ type: WOO_DB_SEARCH_CLEAR });
    } catch (error) {
      dispatch({ type: WOO_DB_SEARCH_CLEAR_ERROR, payload: error });
      console.error("error", error);
    }
  };
};

export const setWooDbDataReady = (state) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: WOO_DB_DATA_READY, payload: state });
    } catch (error) {
      dispatch({ type: WOO_DB_DATA_READY_ERROR, payload: error });
      console.error("error", error);
    }
  };
};

export const setLoading = (state) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: SET_LOADING, payload: state });
    } catch (error) {
      dispatch({ type: SET_LOADING_ERROR, payload: error });
      console.error("error", error);
    }
  };
};
