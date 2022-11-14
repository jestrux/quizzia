import ImportService from "./service.js";
import ImportUI from "./import.js";

angular
	.module("Import", [])
	.factory("ImportService", ImportService)
	.directive("import", ImportUI);
