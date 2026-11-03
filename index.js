/**
 * Neural Network Studio — Host half.
 *
 * The workbench is entirely a Client plugin: it edits a local graph, infers
 * shapes, and generates Python source in the browser. Nothing here needs a
 * Host service, so this row only anchors the bundle in the Loader and keeps
 * the package a valid plugin with no model-facing surface.
 *
 * @returns nothing; the plugin exposes no Host capability.
 */
export function apply() {}
