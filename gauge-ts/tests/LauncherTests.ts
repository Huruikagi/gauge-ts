const { getPackageRunner } = require("../launcher-runner.cjs");

describe("launcher package runner", () => {
  test.each([
    [undefined, ["npx"]],
    ["npx", ["npx"]],
    ["npm", ["npm", "exec", "--"]],
    ["pnpm", ["pnpm", "exec"]],
    ["yarn", ["yarn", "exec"]],
    ["bun", ["bun", "x"]],
  ])("maps %p to %p", (value, expected) => {
    expect(getPackageRunner(value)).toEqual(expected);
  });

  test.each(["", "pnpm exec", '["pnpm", "exec"]', "custom-runner"])(
    "rejects unsupported value %p",
    (value) => {
      expect(() => getPackageRunner(value)).toThrow(
        `Unsupported GAUGE_TS_PACKAGE_RUNNER: ${JSON.stringify(value)}`,
      );
    },
  );
});
