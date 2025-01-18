const mongoose = require('mongoose');
// Create the Inventory model
const InventoryModel = mongoose.model('Inventory', InventorySchema);

class Inventory {
    constructor(id = null) {
        this._id = id; // ObjectId of the inventory
    }

    // Create a new inventory document
    static async createInventory(name, userId) {
        try {
            const inventory = new InventoryModel({ name, userId, ingredients: [] });
            const savedInventory = await inventory.save();
            return savedInventory;
        } catch (err) {
            console.error('Error creating inventory:', err);
            throw err;
        }
    }

    // Add an ingredient to the inventory
    async addIngredient(name, qty, unit, imageUrl = '', expiryDate = null) {
        try {
            const inventory = await InventoryModel.findById(this._id);
            if (!inventory) throw new Error('Inventory not found');

            inventory.ingredients.push({ name, qty, unit, imageUrl, expiryDate });
            await inventory.save();
            return inventory;
        } catch (err) {
            console.error('Error adding ingredient:', err);
            throw err;
        }
    }

    // Retrieve all ingredients from the inventory
    async getIngredients() {
        try {
            const inventory = await InventoryModel.findById(this._id);
            if (!inventory) throw new Error('Inventory not found');

            return inventory.ingredients;
        } catch (err) {
            console.error('Error retrieving ingredients:', err);
            throw err;
        }
    }

    // Remove an ingredient by name
    async removeIngredient(name) {
        try {
            const inventory = await InventoryModel.findById(this._id);
            if (!inventory) throw new Error('Inventory not found');

            inventory.ingredients = inventory.ingredients.filter(ingredient => ingredient.name !== name);
            await inventory.save();
            return inventory;
        } catch (err) {
            console.error('Error removing ingredient:', err);
            throw err;
        }
    }

    // Delete the entire inventory
    async deleteInventory() {
        try {
            const result = await InventoryModel.findByIdAndDelete(this._id);
            if (!result) throw new Error('Inventory not found');

            return result;
        } catch (err) {
            console.error('Error deleting inventory:', err);
            throw err;
        }
    }
}

module.exports = Inventory;
