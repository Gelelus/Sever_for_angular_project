"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_1 = __importDefault(require("../models/recipe"));
const fs_1 = __importDefault(require("fs"));
const add = function (data, user, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const ingredients = JSON.parse(data.ingredients);
        const recipe = new recipe_1.default({
            name: data.name,
            description: data.description,
            ingredients: ingredients,
            imagePath: "img/recipes/" + file.filename,
        });
        recipe.users.push(user._id);
        yield recipe.save();
        user.recipes.push(recipe._id);
        yield user.save();
        return recipe;
    });
};
const get = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield recipe_1.default.findById(id);
    });
};
const getAll = function ({ startItem = "5", limit = "0", sortOrder = "1", sortName = "name", matchName = "", matchString = "", startDate = new Date(2012, 7, 14), endDate = Date.now(), }) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = {};
        switch (matchName) {
            case "name":
                const name = new RegExp(matchString, "i");
                query = { name: { $regex: name } };
                break;
            case "date":
                query = {
                    date: { $gte: startDate, $lt: endDate },
                };
                break;
        }
        const res = yield recipe_1.default.aggregate([
            { $match: query },
            { $sort: { [sortName]: +sortOrder } },
            {
                $facet: {
                    recipes: [{ $skip: +startItem }, { $limit: +limit }],
                    maxRecipes: [
                        {
                            $count: "count",
                        },
                    ],
                },
            },
        ]);
        return { recipes: res[0].recipes, maxRecipes: res[0].maxRecipes[0].count };
    });
};
const update = function (data, user, file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user && !user.recipes.includes(data._id)) {
            throw Error("You do not have edit access to this recipe.");
        }
        if (file && typeof data.ingredients === "string") {
            const ingredients = JSON.parse(data.ingredients);
            const recipe = yield recipe_1.default.findById(data._id);
            if (!recipe) {
                throw Error("Recipe doesn't exist");
            }
            fs_1.default.unlinkSync("public/" + recipe.imagePath);
            recipe.name = data.name;
            recipe.description = data.description;
            recipe.ingredients = ingredients;
            recipe.imagePath = "img/recipes/" + file.filename;
            return yield recipe.save();
        }
        else {
            return yield recipe_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
    });
};
const del = function (id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.recipes.includes(id)) {
            throw Error("You do not have permission to delete this recipe.");
        }
        const recipe = yield recipe_1.default.findById(id);
        if (!recipe) {
            throw Error("Recipe doesn't exist");
        }
        if (recipe.imagePath !== "img/avatars/index.jpg") {
            fs_1.default.unlinkSync("public/" + recipe.imagePath);
        }
        yield recipe.remove();
        return { id };
    });
};
exports.default = {
    add,
    get,
    update,
    del,
    getAll,
};
