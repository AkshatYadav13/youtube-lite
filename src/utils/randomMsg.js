const messages = [
  "Keep going, you're doing great!",
  "Today is a wonderful day!",
  "Believe in yourself and all that you are.",
  "Success is just around the corner.",
  "You are stronger than you think.",
  "A positive attitude leads to positive outcomes.",
  "You are capable of amazing things!",
  "Every day is a new beginning.",
  "Your potential is limitless.",
  "Dream big, work hard, stay focused.",
  "Great things never come from comfort zones.",
  "You are exactly where you need to be.",
  "The harder you work, the luckier you get.",
  "Don't watch the clock; do what it does. Keep going.",
  "Believe you can, and you're halfway there.",
  "Every step you take is a step closer to your goals.",
  "Challenges are what make life interesting.",
  "Push yourself, because no one else is going to do it for you.",
  "Don't stop when you're tired. Stop when you're done.",
  "The only way to do great work is to love what you do.",
];

export function generateRandomMessage() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const randomMessage = messages[randomIndex];
  return randomMessage;
}

const names = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Edward",
  "Fiona",
  "George",
  "Hannah",
  "Isabella",
  "Jack",
  "Katie",
  "Liam",
  "Mia"
];

export function generateRandomName() {
  const randomIndex = Math.floor(Math.random() * names.length);
  const randomName = names[randomIndex];
  return randomName;
}
