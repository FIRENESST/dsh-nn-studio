# Neural Network Studio for DeepSeek Harness

A visual neural-network workbench that lives in the DeepSeek Harness sidebar. Drag layers onto a canvas, wire them together, and get live shape inference, validation, parameter counts, and exportable PyTorch or Keras code with a matching training script.

[中文说明](#中文说明)

## Features

- **Visual graph editor** — 14 layer types, draggable cards, port-to-port connections, pan/zoom, multi-input `Add` / `Concat` merges, undo/redo, and keyboard shortcuts.
- **Live shape inference** — every layer resolves its output shape and parameter count as you edit. The checker reports rank mismatches, invalid convolution/pooling sizes, channel/group divisibility, merge mismatches, cycles, missing inputs, and missing output layers.
- **Model summary** — layer count, total parameters, model size, input/output shapes, and a per-layer table.
- **Inspector** — per-layer parameters, validation issues that jump to the offending node, training configuration, and generated source.
- **Code export** — PyTorch and Keras model code, training script, and requirements. Loss handling covers logits, softmax tails, and reconstruction (autoencoder) graphs; Keras output uses channels-last so it runs on CPU.
- **Templates** — MLP, CNN, residual block, LSTM text classifier, autoencoder, and a blank canvas.
- **Persistence** — automatic local save, JSON import/export, and copy/download for generated code.
- **Bilingual UI** — Chinese and English, using the host theme tokens.

## Layer types

| Category | Layers |
| --- | --- |
| I/O | Input, Output |
| Dense | Dense, Dropout, BatchNorm, Activation |
| Convolution | Conv2D, MaxPool2D, AvgPool2D, Flatten |
| Sequence | Embedding, LSTM |
| Merge | Add, Concat |

## Install

This repository is a DeepSeek Harness bundle (`dsh.bundle.patch` plus a Client plugin). It is not a standalone web app.

1. Clone or copy this repository into a workspace directory that the Harness can read.
2. Ask the Harness agent to install the bundle from that absolute path, or use the Plugin Manager's local-bundle installation with the package directory.
3. The plugin is installed as `@local/nn-studio`. It adds an entry to the sidebar and a main panel keyed by `nn-studio`.
4. Click the **Neural Network Studio** icon in the left sidebar. The first launch starts from the MLP template; everything is editable.

The Host half (`index.js`) is intentionally empty: the workbench runs entirely in the Client and needs no Host service or filesystem access.

## Usage

- Drag an output port (right side of a card) onto an input port (left side) to connect layers.
- Click a layer to edit it in the **Node** tab. Invalid layers turn red with an explanation in **Checks**.
- Add layers from the library; when a selected layer has no outgoing connection, the new layer is connected automatically.
- Use **Templates** for a ready-made network, then **Model** to adjust training settings and **Code** to export.
- Press `Delete` to remove the selection, `Ctrl+Z` / `Ctrl+Shift+Z` for undo/redo, `Ctrl+D` to duplicate, and `F` to fit the graph.

## Generated code

The **Code** tab generates:

- `model.py` — a PyTorch `nn.Module` or a Keras functional model;
- `train.py` — a runnable training script with MNIST/CIFAR-10 loaders or a synthetic dataset for custom graphs;
- `requirements.txt`.

Save the model and training files in the same directory. The training script imports `model.py` by its generated class or `build_model` function.

## Verification

The repository was validated before release:

- all five templates pass shape inference (MLP 235,146; CNN 421,642; ResNet 72,426; LSTM 1,413,386; autoencoder 103,328 parameters);
- generated PyTorch/Keras model and training files compile with `python -m py_compile`;
- the Client UI server-renders under React 18 in English and Chinese;
- the `sidebar.panellist` and `main` slot registrations are active in the running Harness.

Pixel-level browser verification is environment-dependent; open the panel and check the theme if you change styles.

## Files

- `client.js` — the complete Client workbench (graph model, inference, code generation, UI).
- `index.js` — empty Host entry that anchors the bundle.
- `cordis.patch.yml` — installs the `nn-studio` row.
- `locale/{en,zh}.json` — plugin metadata.
- `icon.svg` — original sidebar artwork.

## 中文说明

这是一个 DeepSeek Harness 的侧边栏插件：在可视化节点图中设计神经网络，实时推导每层输出形状与参数量，检查连接错误，并导出 PyTorch / Keras 模型代码和训练脚本。

主要功能：

- 14 种层与节点图编辑：拖动、连线、平移缩放、撤销重做；
- 实时形状推导与检查：卷积/池化尺寸、分组整除、合并层形状、循环连接、缺少输入/输出；
- 模型面板：层数、参数量、模型大小、逐层明细、训练配置；
- 代码面板：PyTorch / Keras 模型、训练脚本、依赖清单，可复制或下载；
- 模板：MLP、CNN、残差网络、LSTM 文本分类、自编码器；
- 自动保存、JSON 导入导出、中英双语、跟随宿主主题。

安装：把本仓库复制到 Harness 可访问的工作区，让 Agent 通过 Plugin Manager 安装该 bundle。侧边栏出现「神经网络工作室」图标后点击即可使用。

## License

No license file is included yet. Add one before redistributing if needed.
