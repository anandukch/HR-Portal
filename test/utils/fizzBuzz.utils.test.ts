import { FizzBuzz } from "../../src/utils/fizzBuzz.utils";
describe("fizzBuzz test", () => {
    let fizzBuzz: FizzBuzz;
    beforeEach(() => {
        fizzBuzz = new FizzBuzz();
    });
    it("should return fizz for numbers divisible by 3", () => {
        const fizzBuzz = new FizzBuzz();
        expect(fizzBuzz.fizzBuzz(3)).toBe("Fizz");
        expect(fizzBuzz.fizzBuzz(6)).toBe("Fizz");
    });

    it("should return fizz for numbers divisible by 5", () => {
        const fizzBuzz = new FizzBuzz();
        expect(fizzBuzz.fizzBuzz(5)).toBe("Buzz");
        expect(fizzBuzz.fizzBuzz(25)).toBe("Buzz");
    });
    it("should return fizz for numbers divisible by 15", () => {
        const fizzBuzz = new FizzBuzz();
        expect(fizzBuzz.fizzBuzz(15)).toBe("FizzBuzz");
        expect(fizzBuzz.fizzBuzz(45)).toBe("FizzBuzz");
    });

    it("using mocks", () => {
        let mockFn = jest.fn(fizzBuzz.divisibleByThree).mockReturnValue(true);
        fizzBuzz.divisibleByThree = mockFn;
        expect(fizzBuzz.fizzBuzz(4)).toBe("Fizz");
        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it("using spy", () => {
        const spy = jest.spyOn(fizzBuzz, "divisibleByThree");
        expect(fizzBuzz.fizzBuzz(4)).toBe(4)
        expect(spy).toHaveBeenCalledTimes(2)
        spy.mockRestore()

    });
   
});
