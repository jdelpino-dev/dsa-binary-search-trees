class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        } else {
          current = current.left;
        }
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (!current.left) {
        current.left = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, current.left);
      }
    } else {
      if (!current.right) {
        current.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, current.right);
      }
    }
  }

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) {
        return current;
      }
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current;
    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else {
      return this.findRecursively(val, current.right);
    }
  }

  dfsPreOrder() {
    const result = [];
    function traverse(node) {
      result.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  dfsInOrder() {
    const result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      result.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  dfsPostOrder() {
    const result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  bfs() {
    const result = [];
    const queue = [];
    if (this.root) queue.push(this.root);
    while (queue.length) {
      const node = queue.shift();
      result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  remove(val) {
    this.root = this._removeNode(this.root, val);
  }

  _removeNode(node, val) {
    if (!node) return null;

    if (val < node.val) {
      node.left = this._removeNode(node.left, val);
      return node;
    } else if (val > node.val) {
      node.right = this._removeNode(node.right, val);
      return node;
    } else {
      // Node to be deleted found
      if (!node.left && !node.right) {
        return null; // No children
      } else if (!node.left) {
        return node.right; // One child
      } else if (!node.right) {
        return node.left; // One child
      } else {
        // Two children
        let temp = this._findMin(node.right);
        node.val = temp.val;
        node.right = this._removeNode(node.right, temp.val);
        return node;
      }
    }
  }

  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  isBalanced() {
    function checkHeight(node) {
      if (!node) return 0;
      let leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;
      let rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      return Math.max(leftHeight, rightHeight) + 1;
    }
    return checkHeight(this.root) !== -1;
  }

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let current = this.root;
    while (current) {
      if (current.right && !current.right.left && !current.right.right) {
        return current.val;
      }
      if (current.left && !current.right) {
        return this._findMax(current.left).val;
      }
      current = current.right;
    }
  }

  _findMax(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}

module.exports = BinarySearchTree;
