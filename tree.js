const { Node } = require('./nodeBST');

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? '│   ' : '    '}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? '    ' : '│   '}`,
                true
            );
        }
    }

    sortAndRemoveDuplicate(arr) {
        let reorderArr = arr.sort((a, b) => a - b);
        reorderArr = reorderArr.filter(
            (value, index, self) => self.indexOf(value) === index
        );
        return reorderArr;
    }

    buildTree(arr) {
        const sortedArr = this.sortAndRemoveDuplicate(arr);
        if (sortedArr.length === 0 || !sortedArr) return null;
        const findMid = Math.floor(sortedArr.length / 2);
        const root = new Node(
            sortedArr[findMid],
            this.buildTree(sortedArr.slice(0, findMid)),
            this.buildTree(sortedArr.slice(findMid + 1))
        );
        return root;
    }

    insertRec(root, key) {
        if (root == null) {
            root = new Node(key);
            return root;
        }
        if (key < root.data) {
            root.left = this.insertRec(root.left, key);
        } else if (key > root.data) {
            root.right = this.insertRec(root.right, key);
        }

        return root;
    }

    minValue(root) {
        let minv = root.data;
        while (root.left !== null) {
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }

    deleteRec(root, key) {
        if (root === null) {
            return root;
        }
        if (key < root.data) {
            root.left = this.deleteRec(root.left, key);
        } else if (key > root.data) {
            root.right = this.deleteRec(root.right, key);
        } else {
            if (root.left === null) {
                return root.right;
            }
            if (root.right === null) {
                return root.left;
            }
            root.data = this.minValue(root.right);
            root.right = this.deleteRec(root.right, root.data);
        }

        return root;
    }

    find(value, root = this.root) {
        if (!root.left && !root.right)
            return `The value ${value} is not available`;
        if (value === root.data) {
            return root;
        }

        if (value < root.data) {
            return this.find(value, root.left);
        }
        return this.find(value, root.right);
    }

    printNode(node) {
        console.log(node);
    }

    levelOrder(root = [this.root], result = [], callback = null) {
        if (!root) {
            return [];
        }

        const queue = root;
        if (queue.length === 0) return result;

        const node = queue.shift();
        result.push(node.data);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        if (callback) callback(node);

        return this.levelOrder(queue, result);
    }

    preOrder(root = this.root, callback = null) {
        const result = [];
        if (!this.root) return result;
        function preOrderRecursive(node) {
            if (node) {
                result.push(node.data);
                if (callback) callback(node);
                preOrderRecursive(node.left);
                preOrderRecursive(node.right);
            }
        }
        preOrderRecursive(root);

        return result;
    }

    inOrder(root = this.root, callback = null) {
        const result = [];
        if (!this.root) return result;

        function inOrderRecursive(node) {
            if (!node) return;
            inOrderRecursive(node.left);
            result.push(node.data);
            if (callback) callback(node);
            inOrderRecursive(node.right);
        }
        inOrderRecursive(root);
        return result;
    }

    postOrder(root = this.root, callback = null) {
        const result = [];
        if (!this.root) return result;

        function postOrderRecursive(node) {
            if (!node) return;
            postOrderRecursive(node.left);
            postOrderRecursive(node.right);
            result.push(node.data);
            if (callback) callback(node);
        }
        postOrderRecursive(root);
        return result;
    }
}

const { log } = console;
const test = new Tree([10, 10, 6, 12, 100, 8000, 500, 8000]);
const test2 = new Tree([1, 2, 3, 4, 5, 6, 7]);
test.insertRec(test.root, 13);
test.insertRec(test.root, 8);
test.insertRec(test.root, 5);
test.insertRec(test.root, 9000);
test.deleteRec(test.root, 10);
log(test.find(100));
log(test.levelOrder());
log(test.preOrder());
log(test.inOrder());
log(test.postOrder());
log(test2.postOrder());
test.prettyPrint();
test2.prettyPrint();
