const { Node } = require('./nodeBST');

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
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
        while (root.left != null) {
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }

    deleteRec(root, key) {
        if (root == null) {
            return root;
        }
        if (key < root.data) {
            root.left = this.deleteRec(root.left, key);
        } else if (key > root.data) {
            root.right = this.deleteRec(root.right, key);
        } else {
            if (root.left == null) {
                return root.right;
            }
            if (root.right == null) {
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
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

const { log } = console;
const test = new Tree([10, 10, 6, 12, 100, 8000, 500, 8000]);
test.insertRec(test.root, 1);
test.deleteRec(test.root, 10);
log(test.find(100));
log(test.root);
log(prettyPrint(test.root));
