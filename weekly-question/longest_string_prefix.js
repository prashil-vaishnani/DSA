/*
Write a function that takes a list of strings and returns the longest string that is a 
prefix of at least two strings in the list.

Examples:

longestCommonPrefix(["flower","flow","flight"])
"fl"

longestCommonPrefix(["dog","racecar","car"])
""

longestCommonPrefix(["interstellar","internet","internal","interval"])
"inte"
*/
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
    if (keys.length === 0) {
      return prefix;
    } else {
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

// Examples
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "flow"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ""
console.log(
  longestCommonPrefix(["interstellar", "internet", "internal", "interval"])
); // "inten"
console.log(
  longestCommonPrefix(["interstellar", "internet", "internal", "flow", "glow"])
); // "intern"
