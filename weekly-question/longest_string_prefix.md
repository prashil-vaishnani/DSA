# Longest Common Prefix Among At Least Two Strings

This function takes a list of strings and returns the **longest prefix** that appears in **at least two strings** from the list.

## Problem Description

Write a function that takes a list of strings and returns the longest string that is a prefix of at least two strings in the list.

### Examples:

```javascript
longestCommonPrefix(["flower", "flow", "flight"]);
// Output: "fl"

longestCommonPrefix(["dog", "racecar", "car"]);
// Output: ""

longestCommonPrefix(["interstellar", "internet", "internal", "interval"]);
// Output: "inte"
```

## Implementation

The solution uses a Trie data structure to efficiently track the number of times a prefix appears.

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
      node.count++;
    }
  }

  findCurrentLongestPrefix(node, curr) {
    let prefix = curr;
    let currentNode = node;
    const keys = Object.keys(currentNode.children);
    if (keys.length === 0) return prefix;

    const localKeys = keys.map((key) => {
      if (currentNode.children[key].count > 1) {
        return this.findCurrentLongestPrefix(
          currentNode.children[key],
          prefix + key
        );
      } else {
        return prefix;
      }
    });

    for (const key of localKeys) {
      if (key.length > prefix.length) {
        prefix = key;
      }
    }

    return prefix;
  }

  findLongestCommonPrefix() {
    let prefix = "";
    let node = this.root;
    const keys = Object.keys(node.children);
    if (keys.length === 0) return prefix;

    return this.findCurrentLongestPrefix(node, prefix);
  }
}

function longestCommonPrefix(arr) {
  if (!arr || arr.length === 0) return "";

  const trie = new Trie();
  for (const word of arr) {
    trie.insert(word);
  }

  return trie.findLongestCommonPrefix();
}
```

## Test Cases

```javascript
console.log(longestCommonPrefix(["flower", "flow", "flight"])); 
// Output: "fl"

console.log(longestCommonPrefix(["dog", "racecar", "car"])); 
// Output: ""

console.log(longestCommonPrefix(["interstellar", "internet", "internal", "interval"])); 
// Output: "inte"

console.log(longestCommonPrefix(["interstellar", "internet", "internal", "flow", "glow"])); 
// Output: "intern"
```
