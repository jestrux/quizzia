import Tabs from "./tabs.js";
import Pane from "./pane.js";
import AppLayout from "./app-layout.js";
import CollapsibleStep from "./collapsible-step.js";
import PositionInput from "./position-input.js";

angular
	.module("Components", [])
	.directive("appLayout", AppLayout)
	.directive("collapsibleStep", CollapsibleStep)
	.directive("positionInput", PositionInput)
	.directive("tabs", Tabs)
	.directive("pane", Pane);
