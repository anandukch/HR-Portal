export class FizzBuzz {
    public fizzBuzz(num: number) {
        if (this.divisibleByThree(num) && num % 5 == 0) return "FizzBuzz";
        if (this.divisibleByThree(num)) return "Fizz";
        if (num % 5 == 0) return "Buzz";
        return num;
    }

    divisibleByThree(num): boolean {
        return num % 3 == 0;
    }
}
const fizzBuzz = new FizzBuzz();
for (let index = 1; index < 101; index++) {
    console.log(fizzBuzz.fizzBuzz(index));
}
