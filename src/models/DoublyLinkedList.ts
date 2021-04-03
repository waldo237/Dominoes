/* eslint-disable prefer-const */
class DoublyLinkedListNode<T>{
    public prev: DoublyLinkedListNode<T> | null;
    public next: DoublyLinkedListNode<T> | null;
    public data: T;

    constructor(data: T) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList<T> {
    public head: DoublyLinkedListNode<T> | null;
    public tail: DoublyLinkedListNode<T> | null;
    public size: number;
    
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

   protected insertAtTail(data: T) {
        const newNode = new DoublyLinkedListNode(data);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    protected insertAtHead(data: T) {
        const newNode = new DoublyLinkedListNode<T>(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
    }
    protected deleteAtHead() {
        let deletedNode = null;

        if (this.head === null) {
            return deletedNode;
        } else {
            deletedNode = this.head.data;
            if (this.head === this.tail) {
                this.head = null;
                this.tail = null;
                this.size--;
            } else {
                this.head = this.head.next;
                this.head!.prev = null;
                this.size--;
            }
        }
        return deletedNode;
    }
    protected deleteAtTail() {
        let deletedNode = null;

        if (this.tail === null) {
            return deletedNode;

        } else {
            deletedNode = this.tail?.data;
            if (this.tail === this.head) {
                this.head = null;
                this.tail = null;
                this.size--;
            } else {
                this.tail = this.tail.prev;
                this.tail!.next = null;
                this.size--;
            }
        }
        return deletedNode;
    }

    protected findStartingHead(value: T): Array<T> {
        let currentNode = this.head;
        let results: Array<T> = [];
        while (currentNode?.next) {
            if (currentNode.data === value) {
                results.push(currentNode.data);
            }
            currentNode = currentNode.next;
        }
        return results;
    }
    protected findStartingTail(value: T): Array<T> {
        let currentNode = this.tail;
        let results: Array<T> = [];
        while (currentNode?.prev) {
            if (currentNode.data === value) {
                results.push(currentNode.data);
            }
            currentNode = currentNode.prev;
        }
        return results;
    }

    public print(): void {
        let currentNode = this.head;

        while (currentNode?.next) {
            currentNode && console.log(currentNode.data);

            currentNode = currentNode.next;
        }
    }
}
export {DoublyLinkedList}