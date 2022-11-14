import TestService from "./service.js";
import TestUI from "./test.js";

angular
	.module("Test", [])
	.factory("TestService", TestService)
	.directive("test", TestUI);
