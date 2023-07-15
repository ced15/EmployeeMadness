/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const brands = require("./brands.json");
const colors = require("./colors.json");
const EmployeeModel = require("../db/employee.model");
const BrandsModel = require("../db/brands.model");
const ColorsModel = require("../db/colors.model");
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  let allNewCreatedBrands = await BrandsModel.find();
  let allNewCreatedcolors = await ColorsModel.find();

  allNewCreatedBrands.map((brand) => brand._id);
  allNewCreatedcolors.map((color) => color._id);


  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    brands: pick(allNewCreatedBrands),
    colors: pick(allNewCreatedcolors)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateBrands = async () => {
  await BrandsModel.deleteMany({});

  const brand = brands.map((name) => ({
    name,
  }));

  await BrandsModel.create(...brand);
  console.log("Brands created");
};

const populateColors = async () => {
  await ColorsModel.deleteMany({});

  const color = colors.map((name) => ({
    name,
  }));

  await ColorsModel.create(...color);
  console.log("Colors created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateBrands();

  await populateColors();

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
