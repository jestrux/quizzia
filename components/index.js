import Tabs from "./tabs.js";
import Pane from "./pane.js";

angular
	.module("Components", [])
	.directive("tabs", Tabs)
	.directive("pane", Pane);
