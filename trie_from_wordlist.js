function Trie() {
  this.root = new TrieNode();
  this.insert = function(key) { 
      let length = key.length, next = this.root; 

      for (let level = 0; level < length; level++) { 
          let character = key.charAt(level); 
          if (next.children[character] == null) {
              next.children[character] = new TrieNode(); 
          }

          next = next.children[character]; 
      }
      next.endOfWord = true; 
  }
  this.find = function(key) { 
      let length = key.length, next = this.root; 

      for (let level = 0; level < length; level++) { 
          let character = key.charAt(level);

          if (next && next.children[character]) {
              next = next.children[character];
              continue;
          }
          return false;
      }

      return next && next.endOfWord;
  }
  this.contains = function(key) { 
    let length = key.length, next = this.root; 

    for (let level = 0; level < length; level++) { 
        let character = key.charAt(level);

        if (next && next.children[character]) {
            next = next.children[character];
            continue;
        }
        return false;
    }

    return next && true;
} 

}

function TrieNode() {
  this.children = {};
  this.endOfWord = false; 
}

var trie = new Trie();

const fs = require('fs');

try {
    // read contents of the file
    const data = fs.readFileSync('wordlist.txt', 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    lines.forEach((line) => {
        trie.insert(line.toUpperCase());
    });
} catch (err) {
    console.error(err);
}


jsondata = JSON.stringify(trie)
var result = "const RAW_TRIE =" + jsondata

fs.writeFile("trie.js", result, function (err) {
  if (err) return console.log(err);
});