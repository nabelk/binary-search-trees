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
log(test.root);
log(prettyPrint(test.root));
