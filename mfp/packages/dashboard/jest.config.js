module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "vue"],
  testMatch: ["<rootDir>/src/**/*.test.js"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/test/styleMock.js",
    "^primevue/.+$": "<rootDir>/test/primeVueStub.js",
  },
};
