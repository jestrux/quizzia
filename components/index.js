import Tabs from "./tabs.js";
import Pane from "./pane.js";
import AppLayout from "./app-layout.js";
import CollapsibleStep from "./collapsible-step.js";
import PositionInput from "./position-input.js";
import FilePicker from "./file-picker.js";
import RowFix from "./row-fix.js";

angular
	.module("Components", [])
	.directive("appLayout", AppLayout)
	.directive("collapsibleStep", CollapsibleStep)
	.directive("positionInput", PositionInput)
	.directive("filePicker", FilePicker)
	.directive("rowFix", RowFix)
	.directive("tabs", Tabs)
	.directive("pane", Pane);
