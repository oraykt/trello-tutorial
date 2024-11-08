function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;

  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// Usage
console.time("first1");
console.log(fibonacci(100));
console.timeEnd("first1");
console.time("second1");
console.log(fibonacci(100));
console.timeEnd("second1");
console.time("third1");
console.log(fibonacci(30));
console.timeEnd("third1");

function fibonacci2(n) {
  if (n <= 2) return 1;
  return fibonacci2(n - 1) + fibonacci2(n - 2);
}

console.time("first2");
console.log(fibonacci2(100));
console.timeEnd("first2");
console.time("second2");
console.log(fibonacci2(100));
console.timeEnd("second2");
console.time("third2");
console.log(fibonacci2(30));
console.timeEnd("third2");
