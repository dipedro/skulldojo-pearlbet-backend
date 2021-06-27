"use strict";

const { assign, get } = use("lodash");
const Helpers = use("Helpers");
const { MAX_ITEMS, MAX_LIMIT } = require(Helpers.resourcesPath(
  "constants/default"
));

class onPaginate {
  register(Model, customOptions = {}) {
    const defaultOptions = {
      page: 1, // default pagination page
      limit: MAX_ITEMS, // default pagination limit per page
      maxLimit: MAX_LIMIT // maximum limit per page
    };

    const options = assign(defaultOptions, customOptions);

    Model.queryMacro("onPaginate", async function(getVars = {}) {
      const pagination = {
        page: Number(getVars.page >= 1 ? getVars.page : options.page),
        limit: Number(
          getVars.limit >= 1 && getVars.limit <= options.maxLimit
            ? getVars.limit
            : options.limit
        )
      };

      const response = await this.paginate(
        get(pagination, "page"),
        get(pagination, "limit")
      );
      const data = response.toJSON();

      return {
        pagination: {
          current: get(data, "page"),
          pageSize: get(pagination, "limit"),
          lastPage: get(data, "lastPage"),
          maxLimit: get(defaultOptions, "maxLimit"),
          total: parseInt(get(data, "total"))
        },
        list: get(data, "data")
      };
    });
  }
}

module.exports = onPaginate;
