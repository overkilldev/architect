// Project constants
const CONSTANTS = {
  // HTML title tag text
  TITLE: "Architect",
  // HTTP API configurations
  API: {
    // Mock services, change to false if you don't want to mock
    MOCK_SERVICES: true,
    // TODO: If true a registered user with address, billing data and orders will be present
    MOCK_WITH_INITIAL_USER_DATA: false,
    // Default max waiting time for a request reply
    DEFAULT_REQUEST_TIMEOUT: 10000,
    // Excluded status codes that should not be logged
    EXCLUDED_LOGGER_STATUS_CODES: [422],
    // Included environments that should be logged
    INCLUDED_LOGGER_ENVS: ["staging", "production"]
  },
  // Routing
  ROUTES: {
    // Router where the user will land initially to check authentication
    ENTRY_PATH: "/"
  },
  // Activate or desactive features
  FEATURE_FLAGS: {},
  // Limit user actions
  CONSTRAINTS: {},
  // Store user preferences
  STORAGE: {},
  // App themes
  THEMES: {
    LIGHT: "LIGHT",
    DARK: "DARK"
  },
  // CSS Break Points
  BREAKPOINTS: {
    mobile: 420,
    tablet: 768,
    desktop: 1024,
    wide: 1440,
    hd: 2560
  },
  // General settings
  GENERAL: {
    NODE_WIDTH: 192,
    NODE_HEIGHT: 30,
    TABS_HEIGHT: 56
  }
  // OTHERS\
};

export default CONSTANTS;
