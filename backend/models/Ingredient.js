class Ingredient {
    constructor(id, inv_id, name, quantity, unit, options = {}) {
        this._id = id; // ObjectId
        this.inventoryId = inv_id;
        this.name = name; // String
        this.quantity = quantity; // Number
        this.unit = unit; // String
        this.image = options.image || null; // String (URL), optional
        this.expiryDate = options.expiryDate || null; // Date, optional
        this.addedAt = options.addedAt || new Date(); // Date
        this.updatedAt = options.updatedAt || new Date(); // Date
    }

    getIngredientToJSON() {
        return JSON.stringify(this);
    }

    // Method to update ingredient details
    updateDetails({ name, quantity, unit, image, expiryDate }) {
        if (name) this.name = name;
        if (quantity) this.quantity = quantity;
        if (unit) this.unit = unit;
        if (image) this.image = image;
        if (expiryDate) this.expiryDate = expiryDate;
        this.updatedAt = new Date();
    }

    // Method to get ingredient information
    getIngredientInfo() {
        return {
            _id: this._id,
            userId: this.userId,
            name: this.name,
            image: this.image,
            expiryDate: this.expiryDate,
            quantity: this.quantity,
            unit: this.unit,
            addedAt: this.addedAt,
            updatedAt: this.updatedAt
        };
    }

    getIngredientQuantity(){
        return this.quantity
    };

    getIngredientUnit(){
        return this.unit;
    };

    getIngredientImage(){
        return this.image;
    }

    getIngredientAddedAt(){
        return this.addedAt;
    }

    getIngredientUpdatedAt() {
        return this.updatedAt;
    };

    getInventoryId() {
        return this.inventoryId;
    }


}

// const ingredient = new Ingredient("12345", "67890", "Tomato", 5, "pieces", { image: "https://example.com/tomato.jpg", expiryDate: new Date("2025-01-18") });

