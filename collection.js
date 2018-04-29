class Collection {

    constructor(content = []) {
        this._content = content;
    }


    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }


    getIndexOf(item) {
        if (typeof item === "string" && item in this._content) {
            return item;
        }
        else {
            let index = this._content.indexOf(item);

            if (index > -1) {
                return index;
            }
        }
        return item;
    }

    add(item, itemName = null) {
        if (itemName !== null) {
            this._content[itemName] = item;
        }
        else {
            this._content.push(item);
        }
        return this;
    }

    remove(item) {
        if (this._content.length === 1){
            this._content = [];
            return this;
        }
        let index = this.getIndexOf(item);
        if(index === 0) {
            delete this._content[0];
        }
        else if (index) {
            this._content.splice(index, 1);

        }

        return this;
    }

    update(item, value) {

        let index = this.getIndexOf(item);
        if (index) {
            this._content[index] = value;
        }
        else {
            this.add(value, item);
        }

        return this;
    }

    forEach(callback) {
        this._content.forEach(callback);
    }

}