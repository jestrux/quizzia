import Tabs from "./tabs.js";
import Pane from "./pane.js";
import AppLayout from "./app-layout.js";
import CollapsibleStep from "./collapsible-step.js";

angular
	.module("Components", [])
	.directive("appLayout", AppLayout)
	.directive("collapsibleStep", CollapsibleStep)
	.directive("tabs", Tabs)
	.directive("pane", Pane);
