// Accounts services mock data

import { AccountResponse } from "./accounts.service.types";
import { buildAccount } from "testing/builders/accounts.builders";
import { buildResponse } from "testing/builders/services.builders";

const mockedAccount = buildAccount();

export const mockedAccountResponse: AccountResponse = buildResponse({
  data: mockedAccount
});
