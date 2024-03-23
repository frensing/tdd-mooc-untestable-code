// The function diceRoll uses randomness which is hard(/impossible) to test
// Approach would be to seed (not possible in JS) or run experiments with large sample sizes
function diceRoll() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// This function uses the function above which introduces randomness
// approach is to extract the function, or give possibility to replace diceRoll function
export function diceHandValue() {
  const die1 = diceRoll();
  const die2 = diceRoll();
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}
