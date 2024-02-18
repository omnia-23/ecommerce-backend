import { catchError } from "../utils/errorHandler.js";

export const executeQuery = ({ status = 200 } = {}) => {
  return catchError(async (req, res, next) => {
    const message = await req.dbQuery;
    res.status(status).json({ message });
  });
};

export const filterQuery = ({ fieldName, parameter }) => {
  return (req, res, next) => {
    req.dbQuery = req.dbQuery.where({ [fieldName]: req.params[parameter] });
    next();
  };
};

export const populateQuery = ({ filedName, fields }) => {
  return (req, res, next) => {
    req.dbQuery = req.dbQuery.populate(filedName, fields);
    next();
  };
};

export const paginationQuery = (req, res, next) => {
  if (!req.query.page) return next();
  const page = req.query.page || 1;
  const pagesize = 2;
  if (page < 1) page = 1;
  req.dbQuery = req.dbQuery.skip((page - 1) * pagesize).limit(pagesize);
  next();
};

export const sortQuery = (req, res, next) => {
  if (!req.query.sort) return next();
  const { sort, dir = "asc" } = req.query;
  req.dbQuery = req.dbQuery.sort({ [sort]: dir });

  next();
};

export const fieldsQuery = (req, res, next) => {
  if (!req.query.fields) return next();
  req.dbQuery = req.dbQuery.select(req.query.fields.split(","));

  next();
};

//********* imp
export const searchQuery = (req, res, next) => {
  if (!req.query.keyword) return next();
  const { keyword } = req.query;
  const fields = ["title", "description"];

  const regex = {
    $or: fields.map((f) => ({ [f]: new RegExp(keyword, "i") })),
  };
  req.dbQuery = req.dbQuery.find(regex);

  next();
};

export const filterAttrQuery = (req, res, next) => {
  const fields = { ...req.query };
  const booked = ["keyword", "sort", "dir", "page", "fields"];

  booked.forEach((one) => {
    delete fields[one];
  });
  req.dbQuery = req.dbQuery.where(fields);

  next();
};
