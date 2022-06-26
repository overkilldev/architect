// services utility functions

import CONSTANTS from "config/constants";

const { MOCK_SERVICES } = CONSTANTS.API;

// This value should not be modified if you want to disable mocks
// To disable mocks, go to config/constants.ts
export const shouldMock = (() => {
  // TODO: uncomment when we can list all user accounts from the db
  // const forceNoMocks = import.meta.env.MODE === "production" || window.Cypress;
  const forceNoMocks = false;
  const forceMocks = import.meta.env.MODE === "test";
  if (forceNoMocks) return false;
  if (forceMocks) return true;
  return MOCK_SERVICES;
})();
