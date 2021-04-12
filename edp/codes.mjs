/**
 * @file Error Coding List
 * @summary
 * @copyright 2021 CommodityStream LLC
 * @license Apache-2.0
 */

"use strict";

export const GENERAL = {
	min: 1,
	max: 99,
	title: "General errors",
};
export const NETWORK = {
	min: 100,
	max: 199,
	title: "Network related errors",
};
export const TASK_DEFINITIONS = {
	min: 200,
	max: 299,
	title: "Task definition errors",
};
export const ARGUMENTS = {
	min: 300,
	max: 399,
	title: "Arguments related errors",
};
export const RESOLVER = {
	min: 400,
	max: 499,
	title: "Dependencies resolution errors",
};
export const SOLC = {
	min: 500,
	max: 599,
	title: "Solidity related errors",
};
export const BUILTIN_TASKS = {
	min: 600,
	max: 699,
	title: "Built-in tasks errors",
};
export const ARTIFACTS = {
	min: 700,
	max: 799,
	title: "Artifacts related errors",
};
export const PLUGINS = {
	min: 800,
	max: 899,
	title: "Plugin system errors",
};
export const INTERNAL = {
	min: 900,
	max: 999,
	title: "Internal Hardhat errors",
};
export const SOURCE_NAMES = {
	min: 1000,
	max: 1099,
	title: "Source name errors",
};
export const CONTRACT_NAMES = {
	min: 1100,
	max: 1199,
	title: "Contract name errors",
};
