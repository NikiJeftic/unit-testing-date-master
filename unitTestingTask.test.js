const unitTestingTask = require("./unitTestingTask");

let mockDate = new Date(Date.parse("2023-09-16T11:30:42.123"));

describe("testing argument types", () => {
  test("Should throw an error if the format argument is not a string or dosen't exists", () => {
    expect(() => unitTestingTask(null, mockDate)).toThrow(TypeError);
  });

  test("Should throw an error message if date argument is  not an instance of Date or string", () => {
    expect(() => unitTestingTask("YYYY", null)).toThrow(TypeError);
  });
});

describe("formatting the date 2023-09-16T11:30:42.123", () => {
  it.each([
    ["YYYY", mockDate, "2023"],
    ["YY", mockDate, "23"],
  ])("format %s for date %s returns year %s", (format, date, result) => {
    expect(unitTestingTask(format, date)).toBe(result);
  });

  it.each([
    ["MMMM", mockDate, "September"],
    ["MMM", mockDate, "Sep"],
    ["M", mockDate, "9"],
  ])("Format %s for date %s returns month %s", (format, date, result) => {
    expect(unitTestingTask(format, date)).toBe(result);
  });

  it.each([
    ["DDD", mockDate, "Saturday"],
    ["DD", mockDate, "Sat"],
    ["D", mockDate, "Sa"],
    ["d", mockDate, "16"],
  ])("Format %s for date %s returns day %s", (format, date, result) => {
    expect(unitTestingTask(format, date)).toBe(result);
  });

  it.each([
    ["H", mockDate, "11"],
    ["h", mockDate, "11"],
  ])("Format %s for date %s returns hour %s", (format, date, result) => {
    expect(unitTestingTask(format, date)).toBe(result);
  });

  it.each([
    ["m", mockDate, "30"],
    ["s", mockDate, "42"],
    ["f", mockDate, "123"],
    ["A", mockDate, "AM"],
    ["a", mockDate, "am"],
    ["ZZ", mockDate, "+0200"],
    ["Z", mockDate, "+02:00"],
  ])("format %s for date %s returns %s", (format, date, result) => {
    expect(unitTestingTask(format, date)).toBe(result);
  });

  test("Format A should return AM", () => {
    expect(unitTestingTask("A", new Date(Date.parse(mockDate)))).toBe("AM");
  });

  test("Format a should return am ", () => {
    expect(unitTestingTask("a", new Date(Date.parse(mockDate)))).toBe("am");
  });
});

describe("test date and time values with padded zeroes", () => {
  it.each([["MM", mockDate, "09"]])(
    "format %s for date %s returns %s",
    (format, date, result) => {
      expect(unitTestingTask(format, date)).toBe(result);
    }
  );
});

test("register should contain new longDate format", () => {
  unitTestingTask.register("longDate", "d MMM");
  expect(unitTestingTask.formatters()).toContain("longDate");
});

test("return list of unit testing formatters", () => {
  expect(unitTestingTask.formatters()).toContain("ISODate");
});

describe("test lang function", () => {
  test("lang should return en language if it is a falsy value(ex. empty string)", () => {
    expect(unitTestingTask.lang("")).toBe("en");
  });

  test("lang should return en", () => {
    expect(unitTestingTask.lang("en")).toBe("en");
  });

  test("lang should return uk", () => {
    expect(unitTestingTask.lang("us", {})).toBe("us");
  });
});

test("unix time stamp", () => {
  var dateUnix = mockDate.getTime();
  expect(unitTestingTask("YYYY", dateUnix)).toBe("2023");
});

describe("test formats", () => {
  it.each([
    ["ISODate", "2023-09-16T11:30:42.123", "2023-09-16"],
    ["ISOTime", "2023-09-16T11:30:42.123", "11:30:42"],
    ["ISODateTime", "2023-09-16T11:30:42.123", "2023-09-16T11:30:42"],
    ["ISODateTimeTZ", "2023-09-16T11:30:42.123", "2023-09-16T11:30:42+02:00"],
  ])(`%s format for value %s returns %s date`, (formatName, date, result) => {
    expect(unitTestingTask(formatName, date)).toBe(result);
  });
});
