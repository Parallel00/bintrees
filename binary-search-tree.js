class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) {
          curr.left = newNode;
          return this;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = newNode;
          return this;
        }
        curr = curr.right;
      }
    }
  }

  insertRecursively(val, curr = this.root) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    if (val < curr.val) {
      if (!curr.left) {
        curr.left = newNode;
        return this;
      }
      return this.insertRecursively(val, curr.left);
    } else {
      if (!curr.right) {
        curr.right = newNode;
        return this;
      }
      return this.insertRecursively(val, curr.right);
    }
  }

  find(val) {
    let curr = this.root;
    while (curr) {
      if (val === curr.val) return curr;
      curr = val < curr.val ? curr.left : curr.right;
    }
    return undefined;
  }

  findRecursively(val, curr = this.root) {
    if (!curr) return undefined;
    if (val === curr.val) return curr;
    return val < curr.val
      ? this.findRecursively(val, curr.left)
      : this.findRecursively(val, curr.right);
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
      let node = queue.shift();
      result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  remove(val) {
    function removeNode(node, val) {
      if (!node) return null;
      if (val === node.val) {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let temp = node.right;
        while (temp.left) {
          temp = temp.left;
        }
        node.val = temp.val;
        node.right = removeNode(node.right, temp.val);
        return node;
      } else if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else {
        node.right = removeNode(node.right, val);
        return node;
      }
    }
    this.root = removeNode(this.root, val);
  }

  isBalanced() {
    function checkHeight(node) {
      if (!node) return -1;
      let leftHeight = checkHeight(node.left);
      let rightHeight = checkHeight(node.right);
      if (
        leftHeight === Number.NEGATIVE_INFINITY ||
        rightHeight === Number.NEGATIVE_INFINITY ||
        Math.abs(leftHeight - rightHeight) > 1
      ) {
        return Number.NEGATIVE_INFINITY;
      }
      return Math.max(leftHeight, rightHeight) + 1;
    }
    return checkHeight(this.root) !== Number.NEGATIVE_INFINITY;
  }

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let curr = this.root;
    while (curr) {
      if (curr.right && !curr.right.left && !curr.right.right) {
        return curr.val;
      }
      if (curr.right && !curr.right.right) {
        return this.findMax(curr.right.left).val;
      }
      curr = curr.right;
    }
  }

  findMax(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}

module.exports = BinarySearchTree;
