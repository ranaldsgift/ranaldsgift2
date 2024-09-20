//@ts-nocheck
import QuillResizeModule from "@botom/quill-resize-module";
import Quill from "quill";

// Allow img to have all attributes passed originally
const ImageBlot = Quill.import("formats/image");

export class CustomBlot extends ImageBlot {
	static blotName = "customImage";
	static tagName = "img";

	/**
	 * Converts the HTML tag to image blot
	 * @param value
	 */
	static create(value) {
		let node = super.create();
		Object.getOwnPropertyNames(value).forEach((attribute_name) => {
			node.setAttribute(attribute_name, value[attribute_name]);
		});

		return node;
	}

	/**
	 * Converts the image blot to HTML tag
	 * @param node
	 */
	static value(node) {
		var blot = {};
		node.getAttributeNames().forEach((attribute_name) => {
			blot[attribute_name] = node.getAttribute(attribute_name);
		});

		return blot;
	}
}

const DivBlot = Quill.import("blots/block/embed");

export class CustomDivBlot extends DivBlot {
	static blotName = "customDiv";
	static tagName = "div";

	/**
	 * Converts the HTML tag to image blot
	 * @param value
	 */
	static create(value) {
		let node = super.create();
		Object.getOwnPropertyNames(value).forEach((attribute_name) => {
			if (attribute_name === "innerHTML") {
				node.innerHTML = value[attribute_name];
				return;
			}

			node.setAttribute(attribute_name, value[attribute_name]);
		});

		return node;
	}

	/**
	 * Converts the image blot to HTML tag
	 * @param node
	 */
	static value(node) {
		var blot = {};
		node.getAttributeNames().forEach((attribute_name) => {
			blot[attribute_name] = node.getAttribute(attribute_name);
		});

		blot.innerHTML = node.innerHTML;
		return blot;
	}
}

const SpanBlot = Quill.import("blots/block/embed");

export class CustomSpanBlot extends SpanBlot {
	static blotName = "customSpan";
	static tagName = "span";

	/**
	 * Converts the HTML tag to image blot
	 * @param value
	 */
	static create(value) {
		let node = super.create();
		Object.getOwnPropertyNames(value).forEach((attribute_name) => {
			if (attribute_name === "innerHTML") {
				node.innerHTML = value[attribute_name];
				return;
			}

			node.setAttribute(attribute_name, value[attribute_name]);
		});

		return node;
	}

	/**
	 * Converts the image blot to HTML tag
	 * @param node
	 */
	static value(node) {
		var blot = {};
		node.getAttributeNames().forEach((attribute_name) => {
			blot[attribute_name] = node.getAttribute(attribute_name);
		});

		blot.innerHTML = node.innerHTML;
		return blot;
	}
}

Quill.register(CustomBlot);
Quill.register(CustomDivBlot);
Quill.register(CustomSpanBlot);
Quill.register("modules/resize", QuillResizeModule);