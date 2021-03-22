/*
  Write a function called luckySevens which takes an array of integers and
  returns true if any three consecutive elements sum to 7.
*/

nums = [5, 5, 5, 1, 2, 4]

function luckySevens(nums) {
  let counter = 0
  let summer = 0
  for (var i = 0; i < nums.length; i++) {
    summer += nums[i]
    if (counter === 3) {
      counter = 0
      let checkSummer = summer
      summer = 0
      if (checkSummer === 7) {
        return true
      }
    }
    counter++
  }
  return false
}

let bool = luckySevens(nums)
console.log(bool)
// 
run()

let run = function () {
  console.log('run')
}

function run() {
  console.log('run')
}
//  
var text = "outside"
function logIt() {
  console.log(text)
  var text = "inside"
}
logIt()

// result : undefined

/*
  Each object represents a license the customer bought.
  Write a function named "hasActiveLicense()" that receives a date and checks whether
  there is at least 1 active license on that date or not.
*/

let licenses = [
  {
    start: new Date('December 17, 2017 03:24:00'),
    end: new Date('December 24, 2017 03:24:00')
  },
  {
    start: new Date('December 19, 2017 04:00:00'),
    end: new Date('December 28, 2017 04:00:00')
  },
  {
    start: new Date('November 14, 2017 00:00:00'),
    end: new Date('November 21, 2017 00:00:00')
  },
  {
    start: new Date('December 20, 2017 00:00:00'),
    end: new Date('January 1, 2018 00:00:00')
  },
  {
    start: new Date('October 4, 2017 00:00:00'),
    end: new Date('October 9, 2017 00:00:00')
  }
];

const dateToCheck = new Date('December 29, 2017 04:00:00');

function hasActiveLicense(licenses, dateToCheck) {
  for (var license of licenses) {
    if ((dateToCheck.getTime() > license.start.getTime()) && (dateToCheck.getTime() < license.end.getTime())) {
      return true
    }
  }
  return false
}

bool = hasActiveLicense(licenses, dateToCheck)

console.log(bool)

/*
  Make a function that receives a string and validates if it contains correct brackets.
  Examples:
      "(hello)(my)(name)" - should return true
      "(he(llo)" - should return false
*/

string = "(hello)(my)(name)"

function check(string) {



}

/*
  Check for balanced parentheses in an expression.
  Two brackets are considered to be a matched pair if the an opening bracket ("(", "[", or "{") occurs
  to the left of a closing bracket ("(", "[", or "{") of the exact same type.
  There are three types of matched pairs of brackets: [], {}, and ().

  Examples:
  [()]{}{[()]}    should return true
  [(])            should return false
*/

let closers = ["]", ")", "}"]
let openers = ["(", "[", "}"]
let closers2 = []
let openers2 = []
let string = "[()]{}{[()]}"

for (let x of string) {

}

/*
  Check for balanced parentheses in an expression.
  Two brackets are considered to be a matched pair if the an opening bracket ("(", "[", or "{") occurs
  to the left of a closing bracket ("(", "[", or "{") of the exact same type.
  There are three types of matched pairs of brackets: [], {}, and ().

  Examples:
  [()]{}{[()]}    should return true
  [(])            should return false
*/
const str = '[()]{}{[()]}';
function isBalanced(str) {
  const stack = [];
  const map = {
    '{': '}',
    '[': ']',
    '(': ')'
  };
  for (let i = 0; i < str.length; i++) {
    if (map[str[i]]){
      stack.push(str[i])
    }
    else {
      const lastItem = stack.pop();
      if (map[lastItem]!==str[i]) {
        return false;
      }
    }
  return stack.length === 0
}
}
isBalanced(str)


























function isBalanced(str) {
  const stack = [];
  const map = {
    '{': '}',
    '[': ']',
    '(': ')'
  };
  for (let i = 0; i < str.length; i++) {
    if (map[str[i]]) {
      stack.push(str[i]);
    } else {
      const lastInStack = stack.pop();
      if (map[lastInStack] !== str[i]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log(isBalanced(str));