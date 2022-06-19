// Accounts services
import { mockedAccountResponse } from "./accounts.service.mock";
import { AccountResponse } from "./accounts.service.types";
import { shouldMock } from "utils/services.utils";

export const fetchAccount = (token: string): Promise<AccountResponse> => {
  if (!token) throw new Error("Missing token, the user must be authenticated");

  try {
    if (!shouldMock) {
      // TODO: Replace with your API request call
      return Promise.resolve(mockedAccountResponse);
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(mockedAccountResponse);
        }, 1000);
      });
    }
  } catch (e) {
    throw new Error(e.message);
  }
};
