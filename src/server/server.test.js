const { validateUrl } = require("./server");

test("Name should be checked appropriately", () => {
    expect(validateUrl("https://www.google.com")).toBe(true);
})