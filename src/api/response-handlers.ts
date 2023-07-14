import * as httpError from "http-errors";
import {
  ErrorHandler,
  ResponseHandler,
  ResponseValidator,
} from "../utils/api.gate-keeper.utils";

export type ApiResponse = {
  success: true;
  message: string;
  data: any;
};

export const isSendable: ResponseValidator = (response) => {
  const isValidResponse =
    typeof response === "object" &&
    Reflect.get(response, "success") === true &&
    typeof response.message === "string" &&
    Reflect.has(response, "data");

  return isValidResponse;
};

export const onResponse: ResponseHandler = (response, req, res) => {
  return res.json(response);
};

export const onError: ErrorHandler = (err: any, req, res) => {
  console.error(err);
  const defaultError = httpError.InternalServerError();

  err.status = err.status || defaultError.status;
  err.message = err.message || defaultError.message;

  return res.status(err.status).json({
    success: false,
    reason: err.message,
  });
};