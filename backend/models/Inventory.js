class Inventory {

    constructor(id, name, userId = {}) {
        this._id = id; // ObjectId
        this.name = name; // String
        this.userId = userId; //String: the user who owns the inventory
    }

    addIngredient(name, qty, unit, imageUrl, expiryDate) {

    }

    getIngredients() {}





}