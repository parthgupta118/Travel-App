import './dateChecker';
import { checkForDate } from './dateChecker';

test("Date should be appropriate", () => {
    expect(checkForDate("22/07/2010")).toBe(true);
})