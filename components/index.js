import Tabs from "./tabs.js";
import Pane from "./pane.js";

angular
	.module("components", [])
	.directive("tabs", Tabs)
	.directive("pane", Pane);
