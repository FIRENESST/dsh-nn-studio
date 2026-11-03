window.__ModuleLoader__.load({
  id: '@local/nn-studio',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const useState = React.useState
    const useEffect = React.useEffect
    const useMemo = React.useMemo
    const useRef = React.useRef
    const useCallback = React.useCallback

    const NS = 'nnStudio'
    const PANEL_ID = 'nn-studio'
    const STORE_KEY = 'dsh.nn-studio.graph.v1'
    const MONO = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
    const NODE_W = 184
    const NODE_H = 78
    const MAX_NODES = 240
    const MAX_EDGES = 480
    const MAX_HISTORY = 80

    /* ------------------------------------------------------------------ *
     * Copy
     * ------------------------------------------------------------------ */

    const ZH = {
      'nav.title': '神经网络工作室',
      'nav.aria': '打开神经网络工作室',
      'header.namePlaceholder': '未命名网络',
      'header.undo': '撤销',
      'header.redo': '重做',
      'header.templates': '模板',
      'header.import': '导入',
      'header.export': '导出',
      'header.exportPy': '导出 Python',
      'header.exportJson': '导出 JSON',
      'header.fit': '适应画布',
      'header.zoomIn': '放大',
      'header.zoomOut': '缩小',
      'header.palette': '节点库',
      'header.inspector': '面板',
      'palette.title': '节点库',
      'palette.search': '搜索层，如 conv / norm',
      'palette.empty': '没有匹配的层',
      'palette.hint': '点击添加；选中节点会自动连线',
      'cat.io': '输入输出',
      'cat.mlp': '全连接',
      'cat.conv': '卷积',
      'cat.seq': '序列',
      'cat.merge': '组合',
      'node.input': '输入',
      'node.output': '输出',
      'node.dense': '全连接',
      'node.dropout': 'Dropout',
      'node.batchnorm': '批归一化',
      'node.activation': '激活',
      'node.conv2d': '卷积',
      'node.maxpool2d': '最大池化',
      'node.avgpool2d': '平均池化',
      'node.flatten': '展平',
      'node.embedding': '词嵌入',
      'node.lstm': 'LSTM',
      'node.add': '相加',
      'node.concat': '拼接',
      'canvas.empty': '从节点库添加第一层',
      'canvas.emptyHint': '或者从一个模板开始，几秒得到一个可运行的网络。',
      'canvas.hint': '拖动空白处平移 · 滚轮缩放 · 从右侧端口拖到左侧端口连线 · Delete 删除',
      'canvas.loadTemplate': '浏览模板',
      'canvas.connecting': '松开以连接到目标层的左侧端口',
      'shape.pending': '形状待定',
      'shape.invalid': '形状错误',
      'summary.flatten': '张量 → 向量',
      'summary.batchnorm': '按通道归一化',
      'summary.bidirectional': '双向',
      'summary.residual': '残差',
      'summary.skip': '跳跃',
      'port.input': '输入端口',
      'port.output': '输出端口',
      'param.count': '参数',
      'inspector.tab.props': '属性',
      'inspector.tab.checks': '检查',
      'inspector.tab.model': '模型',
      'inspector.tab.code': '代码',
      'inspector.emptyTitle': '未选择节点',
      'inspector.emptyBody': '在画布中选择一个层来编辑参数，或者从节点库添加新的层。',
      'inspector.nodeTitle': '层名称',
      'inspector.output': '输出形状',
      'inspector.params': '参数量',
      'inspector.duplicate': '复制',
      'inspector.delete': '删除',
      'inspector.center': '居中',
      'inspector.disconnect': '断开输入',
      'inspector.deleteEdge': '删除连线',
      'inspector.shortcuts': '快捷键',
      'sc.undo': 'Ctrl+Z 撤销',
      'sc.redo': 'Ctrl+Shift+Z 重做',
      'sc.delete': 'Delete 删除所选',
      'sc.duplicate': 'Ctrl+D 复制节点',
      'sc.fit': 'F 适应画布',
      'checks.okTitle': '检查通过',
      'checks.okBody': '所有层的形状都能推导，可以导出代码。',
      'checks.errors': '错误',
      'checks.warnings': '警告',
      'checks.empty': '还没有可检查的内容。',
      'model.layers': '层数',
      'model.params': '参数量',
      'model.size': '模型大小',
      'model.output': '输出',
      'model.input': '输入',
      'model.tableLayer': '层',
      'model.tableType': '类型',
      'model.tableShape': '输出形状',
      'model.tableParams': '参数',
      'model.tableTotal': '合计',
      'model.training': '训练配置',
      'model.trainingHint': '这些设置会写入导出的训练脚本。',
      'note.reconstruction': '输出形状与输入相同，训练脚本会按自编码器重建任务使用 MSE，并用输入本身作为目标。',
      'field.dataset': '数据集',
      'field.optimizer': '优化器',
      'field.lr': '学习率',
      'field.batch': '批大小',
      'field.epochs': '轮数',
      'field.seed': '随机种子',
      'field.device': '设备',
      'field.loss': '损失函数',
      'field.name': '名称',
      'field.shape': '输入形状',
      'field.shapeHint': '如 1,28,28（通道×高×宽）或 784',
      'field.outName': '输出名',
      'field.units': '单元数',
      'field.activation': '激活函数',
      'field.bias': '偏置',
      'field.filters': '滤波器',
      'field.kernel': '卷积核',
      'field.stride': '步长',
      'field.padding': '填充',
      'field.dilation': '膨胀',
      'field.groups': '分组',
      'field.rate': '丢弃率',
      'field.vocab': '词表大小',
      'field.dim': '嵌入维度',
      'field.hidden': '隐藏维度',
      'field.layers': '层数',
      'field.bidirectional': '双向',
      'field.returnSequences': '返回序列',
      'field.axis': '拼接轴',
      'dataset.mnist': 'MNIST',
      'dataset.cifar10': 'CIFAR-10',
      'dataset.custom': '自定义 / 合成',
      'optimizer.adam': 'Adam',
      'optimizer.adamw': 'AdamW',
      'optimizer.sgd': 'SGD',
      'optimizer.rmsprop': 'RMSprop',
      'device.auto': '自动',
      'device.cpu': 'CPU',
      'device.cuda': 'CUDA',
      'device.mps': 'Apple MPS',
      'loss.auto': '自动',
      'loss.ce': '交叉熵',
      'loss.nll': '负对数似然',
      'loss.mse': '均方误差',
      'loss.autoValue': '自动（{loss}）',
      'axis.last': '最后一维',
      'axis.channels': '通道维',
      'unit.units': '单元',
      'unit.filters': '滤波器',
      'unit.hidden': '隐藏',
      'act.relu': 'ReLU',
      'act.leaky_relu': 'LeakyReLU',
      'act.gelu': 'GELU',
      'act.silu': 'SiLU',
      'act.elu': 'ELU',
      'act.sigmoid': 'Sigmoid',
      'act.tanh': 'Tanh',
      'act.softmax': 'Softmax',
      'act.linear': '无',
      'code.framework': '框架',
      'code.model': '模型',
      'code.train': '训练',
      'code.requirements': '依赖',
      'code.copy': '复制',
      'code.copied': '已复制',
      'code.download': '下载',
      'code.invalid': '先修复检查面板里的错误，才能生成代码。',
      'code.empty': '暂无可生成的代码。',
      'code.hint': '模型保存为 model.py，训练脚本保存为 train.py，放在同一目录。',
      'code.lines': '{lines} 行',
      'frameworks.pytorch': 'PyTorch',
      'frameworks.keras': 'Keras',
      'templates.title': '网络模板',
      'templates.subtitle': '选一个起点，加载后仍可自由编辑。',
      'templates.layers': '{n} 层',
      'templates.params': '{n} 参数',
      'templates.use': '使用',
      'templates.blank': '空白画布',
      'templates.blankDesc': '从零开始，手动添加每一层。',
      'templates.mlp.title': 'MLP 分类器',
      'templates.mlp.desc': '784 → 256 → 128 → 10，适合手写数字或表格特征。',
      'templates.cnn.title': 'CNN 图像分类',
      'templates.cnn.desc': '两层卷积 + 池化 + 全连接，MNIST 级别图像分类。',
      'templates.resnet.title': '残差网络',
      'templates.resnet.desc': '带跳跃连接的卷积块，演示 Add 合并与批归一化。',
      'templates.lstm.title': 'LSTM 文本分类',
      'templates.lstm.desc': '词嵌入 + LSTM 编码 + 全连接，处理 token 序列。',
      'templates.autoencoder.title': '自编码器',
      'templates.autoencoder.desc': '784 → 64 → 16 → 64 → 784，学习压缩表示。',
      'common.cancel': '取消',
      'common.close': '关闭',
      'graph.defaultName': '未命名网络',
      'toast.imported': '已导入网络',
      'toast.importFailed': '导入失败：{reason}',
      'toast.exported': '已导出 {file}',
      'toast.copied': '代码已复制到剪贴板',
      'toast.copyFailed': '复制失败，请手动选择代码',
      'toast.cycle': '无法连接：会形成循环',
      'toast.duplicateEdge': '这两个层已经连接',
      'toast.selfEdge': '不能连接到自身',
      'toast.inputBusy': '该层已有输入，请先断开再连接',
      'toast.connected': '已连接',
      'toast.templateLoaded': '已加载模板：{name}',
      'toast.cleared': '已清空画布',
      'toast.nodeAdded': '已添加 {name}',
      'toast.nodeDeleted': '已删除层',
      'toast.edgeDeleted': '已删除连线',
      'toast.restored': '已恢复上次编辑',
      'toast.invalidGraph': '文件不是有效的神经网络网络',
      'toast.needFix': '先修复检查面板中的错误',
      'toast.noCode': '没有可导出的代码',
      'toast.downloadFailed': '下载失败',
      'toast.importPicked': '请选择 NN Studio 导出的 .json 文件',
      'err.shapeParse': '无法解析输入形状“{value}”',
      'err.shapeRank': '输入形状需要 1–4 维',
      'err.noInput': '网络至少需要一个输入层',
      'err.noOutput': '网络至少需要一个输出层',
      'err.multiInput': '当前版本只支持一个输入层',
      'err.multiOutput': '当前版本只支持一个输出层',
      'err.missingInput': '该层没有连接输入',
      'err.tooManyInputs': '该层只接受一个输入（请用 Add 或 Concat 合并）',
      'err.cycle': '网络中存在循环连接',
      'err.unreachable': '该层没有连接到任何输入',
      'err.deadEnd': '该层没有下游，不会被模型使用',
      'err.denseFlat': '全连接层需要 1D 输入，当前为 {shape}，请先添加 Flatten',
      'err.convRank': '卷积层需要 (C, H, W) 输入，当前为 {shape}',
      'err.poolRank': '池化层需要 (C, H, W) 输入，当前为 {shape}',
      'err.convGroups': '通道数 {channels} 无法按分组 {groups} 均分',
      'err.filtersGroups': '滤波器数 {filters} 无法按分组 {groups} 均分',
      'err.spatial': '卷积/池化后的空间尺寸必须为正，请减小卷积核或填充',
      'err.bnRank': '批归一化只支持 1D 或 (C, H, W) 输入，当前为 {shape}',
      'err.dropoutRange': '丢弃率需要在 0 到 0.95 之间',
      'err.embeddingRank': '词嵌入需要 1D token 序列，当前为 {shape}',
      'err.lstmRank': 'LSTM 需要 (序列长度, 特征) 输入，当前为 {shape}',
      'err.mergeInputs': 'Add / Concat 至少需要两个输入',
      'err.addMismatch': 'Add 的输入形状必须一致：{shapes}',
      'err.concatRank': 'Concat 的输入需要相同的秩：{shapes}',
      'err.concatDims': 'Concat 除拼接轴外的维度必须一致：{shapes}',
      'err.concatAxis': '通道拼接只支持 (C, H, W) 输入',
      'err.unknownType': '未知的层类型“{type}”',
      'err.positive': '{field} 必须是正整数',
      'err.invalidNumber': '{field} 必须是有效数字',
      'warn.alreadyFlat': '输入已经是 1D，Flatten 不会改变形状',
      'warn.noParams': '这个网络没有可训练参数',
      'warn.hugeModel': '模型较大（{params} 参数），导出前确认训练资源',
      'warn.multiInput': '网络有多个输入，导出代码会生成多个输入参数',
      'warn.inputHasInput': '输入层不应有输入连接',
      'warn.softmaxMismatch': '输出带 Softmax，损失函数选择交叉熵时脚本会自动处理',
    }

    const EN = {
      'nav.title': 'Neural Network Studio',
      'nav.aria': 'Open Neural Network Studio',
      'header.namePlaceholder': 'Untitled network',
      'header.undo': 'Undo',
      'header.redo': 'Redo',
      'header.templates': 'Templates',
      'header.import': 'Import',
      'header.export': 'Export',
      'header.exportPy': 'Export Python',
      'header.exportJson': 'Export JSON',
      'header.fit': 'Fit view',
      'header.zoomIn': 'Zoom in',
      'header.zoomOut': 'Zoom out',
      'header.palette': 'Node library',
      'header.inspector': 'Inspector',
      'palette.title': 'Layer library',
      'palette.search': 'Search layers, e.g. conv / norm',
      'palette.empty': 'No matching layers',
      'palette.hint': 'Click to add; auto-connects from the selected layer',
      'cat.io': 'I/O',
      'cat.mlp': 'Dense',
      'cat.conv': 'Convolution',
      'cat.seq': 'Sequence',
      'cat.merge': 'Merge',
      'node.input': 'Input',
      'node.output': 'Output',
      'node.dense': 'Dense',
      'node.dropout': 'Dropout',
      'node.batchnorm': 'BatchNorm',
      'node.activation': 'Activation',
      'node.conv2d': 'Conv2D',
      'node.maxpool2d': 'MaxPool2D',
      'node.avgpool2d': 'AvgPool2D',
      'node.flatten': 'Flatten',
      'node.embedding': 'Embedding',
      'node.lstm': 'LSTM',
      'node.add': 'Add',
      'node.concat': 'Concat',
      'canvas.empty': 'Add your first layer',
      'canvas.emptyHint': 'Or start from a template and get a runnable network in seconds.',
      'canvas.hint': 'Drag empty space to pan · Wheel to zoom · Drag output port to input port · Delete to remove',
      'canvas.loadTemplate': 'Browse templates',
      'canvas.connecting': 'Release on a target layer input port',
      'shape.pending': 'shape pending',
      'shape.invalid': 'shape error',
      'summary.flatten': 'tensor → vector',
      'summary.batchnorm': 'per-channel normalize',
      'summary.bidirectional': 'bidirectional',
      'summary.residual': 'residual',
      'summary.skip': 'skip',
      'port.input': 'Input port',
      'port.output': 'Output port',
      'param.count': 'params',
      'inspector.tab.props': 'Node',
      'inspector.tab.checks': 'Checks',
      'inspector.tab.model': 'Model',
      'inspector.tab.code': 'Code',
      'inspector.emptyTitle': 'No node selected',
      'inspector.emptyBody': 'Select a layer on the canvas to edit it, or add one from the layer library.',
      'inspector.nodeTitle': 'Layer name',
      'inspector.output': 'Output shape',
      'inspector.params': 'Parameters',
      'inspector.duplicate': 'Duplicate',
      'inspector.delete': 'Delete',
      'inspector.center': 'Center',
      'inspector.disconnect': 'Disconnect inputs',
      'inspector.deleteEdge': 'Remove edge',
      'inspector.shortcuts': 'Shortcuts',
      'sc.undo': 'Ctrl+Z undo',
      'sc.redo': 'Ctrl+Shift+Z redo',
      'sc.delete': 'Delete removes selection',
      'sc.duplicate': 'Ctrl+D duplicates a node',
      'sc.fit': 'F fits the view',
      'checks.okTitle': 'All checks passed',
      'checks.okBody': 'Every layer shape resolves; the model is ready to export.',
      'checks.errors': 'Errors',
      'checks.warnings': 'Warnings',
      'checks.empty': 'Nothing to check yet.',
      'model.layers': 'Layers',
      'model.params': 'Parameters',
      'model.size': 'Model size',
      'model.output': 'Output',
      'model.input': 'Input',
      'model.tableLayer': 'Layer',
      'model.tableType': 'Type',
      'model.tableShape': 'Output shape',
      'model.tableParams': 'Params',
      'model.tableTotal': 'Total',
      'model.training': 'Training setup',
      'model.trainingHint': 'These settings feed the exported training script.',
      'note.reconstruction': 'The output matches the input, so the training script runs reconstruction with MSE against the input itself.',
      'field.dataset': 'Dataset',
      'field.optimizer': 'Optimizer',
      'field.lr': 'Learning rate',
      'field.batch': 'Batch size',
      'field.epochs': 'Epochs',
      'field.seed': 'Seed',
      'field.device': 'Device',
      'field.loss': 'Loss',
      'field.name': 'Name',
      'field.shape': 'Input shape',
      'field.shapeHint': 'e.g. 1,28,28 (C×H×W) or 784',
      'field.outName': 'Output name',
      'field.units': 'Units',
      'field.activation': 'Activation',
      'field.bias': 'Bias',
      'field.filters': 'Filters',
      'field.kernel': 'Kernel',
      'field.stride': 'Stride',
      'field.padding': 'Padding',
      'field.dilation': 'Dilation',
      'field.groups': 'Groups',
      'field.rate': 'Drop rate',
      'field.vocab': 'Vocabulary',
      'field.dim': 'Embedding dim',
      'field.hidden': 'Hidden size',
      'field.layers': 'Layers',
      'field.bidirectional': 'Bidirectional',
      'field.returnSequences': 'Return sequences',
      'field.axis': 'Concat axis',
      'dataset.mnist': 'MNIST',
      'dataset.cifar10': 'CIFAR-10',
      'dataset.custom': 'Custom / synthetic',
      'optimizer.adam': 'Adam',
      'optimizer.adamw': 'AdamW',
      'optimizer.sgd': 'SGD',
      'optimizer.rmsprop': 'RMSprop',
      'device.auto': 'Auto',
      'device.cpu': 'CPU',
      'device.cuda': 'CUDA',
      'device.mps': 'Apple MPS',
      'loss.auto': 'Auto',
      'loss.ce': 'Cross entropy',
      'loss.nll': 'Negative log likelihood',
      'loss.mse': 'Mean squared error',
      'loss.autoValue': 'Auto ({loss})',
      'axis.last': 'Last axis',
      'axis.channels': 'Channels',
      'unit.units': 'units',
      'unit.filters': 'filters',
      'unit.hidden': 'hidden',
      'act.relu': 'ReLU',
      'act.leaky_relu': 'LeakyReLU',
      'act.gelu': 'GELU',
      'act.silu': 'SiLU',
      'act.elu': 'ELU',
      'act.sigmoid': 'Sigmoid',
      'act.tanh': 'Tanh',
      'act.softmax': 'Softmax',
      'act.linear': 'None',
      'code.framework': 'Framework',
      'code.model': 'Model',
      'code.train': 'Training',
      'code.requirements': 'Requirements',
      'code.copy': 'Copy',
      'code.copied': 'Copied',
      'code.download': 'Download',
      'code.invalid': 'Fix the errors under Checks before generating code.',
      'code.empty': 'No code to show.',
      'code.hint': 'Save the model as model.py and the training script as train.py in one folder.',
      'code.lines': '{lines} lines',
      'frameworks.pytorch': 'PyTorch',
      'frameworks.keras': 'Keras',
      'templates.title': 'Network templates',
      'templates.subtitle': 'Pick a starting point; everything stays editable.',
      'templates.layers': '{n} layers',
      'templates.params': '{n} params',
      'templates.use': 'Use',
      'templates.blank': 'Blank canvas',
      'templates.blankDesc': 'Start from scratch and add every layer yourself.',
      'templates.mlp.title': 'MLP classifier',
      'templates.mlp.desc': '784 → 256 → 128 → 10 for digits or tabular features.',
      'templates.cnn.title': 'CNN image classifier',
      'templates.cnn.desc': 'Two conv blocks + pooling + dense head for MNIST-scale images.',
      'templates.resnet.title': 'Residual network',
      'templates.resnet.desc': 'A conv block with a skip connection, Add merge, and batch norm.',
      'templates.lstm.title': 'LSTM text classifier',
      'templates.lstm.desc': 'Embedding + LSTM encoder + dense head for token sequences.',
      'templates.autoencoder.title': 'Autoencoder',
      'templates.autoencoder.desc': '784 → 64 → 16 → 64 → 784 to learn a compressed representation.',
      'common.cancel': 'Cancel',
      'common.close': 'Close',
      'graph.defaultName': 'Untitled network',
      'toast.imported': 'Network imported',
      'toast.importFailed': 'Import failed: {reason}',
      'toast.exported': 'Exported {file}',
      'toast.copied': 'Code copied to the clipboard',
      'toast.copyFailed': 'Copy failed; select the code manually',
      'toast.cycle': 'Cannot connect: this would create a cycle',
      'toast.duplicateEdge': 'These layers are already connected',
      'toast.selfEdge': 'A layer cannot connect to itself',
      'toast.inputBusy': 'This layer already has an input; disconnect it first',
      'toast.connected': 'Connected',
      'toast.templateLoaded': 'Template loaded: {name}',
      'toast.cleared': 'Canvas cleared',
      'toast.nodeAdded': 'Added {name}',
      'toast.nodeDeleted': 'Layer removed',
      'toast.edgeDeleted': 'Edge removed',
      'toast.restored': 'Restored your last edit',
      'toast.invalidGraph': 'That file is not a valid network',
      'toast.needFix': 'Fix the errors under Checks first',
      'toast.noCode': 'No code to export',
      'toast.downloadFailed': 'Download failed',
      'toast.importPicked': 'Choose a .json file exported from NN Studio',
      'err.shapeParse': 'Cannot parse the input shape “{value}”',
      'err.shapeRank': 'The input shape needs 1–4 dimensions',
      'err.noInput': 'The network needs at least one Input layer',
      'err.noOutput': 'The network needs at least one Output layer',
      'err.multiInput': 'Only one Input layer is supported in this version',
      'err.multiOutput': 'Only one Output layer is supported in this version',
      'err.missingInput': 'This layer has no input connection',
      'err.tooManyInputs': 'This layer accepts one input (use Add or Concat to merge)',
      'err.cycle': 'The graph contains a cycle',
      'err.unreachable': 'This layer is not connected to any input',
      'err.deadEnd': 'This layer has no downstream and will not be used',
      'err.denseFlat': 'Dense needs a 1D input, got {shape}; add Flatten first',
      'err.convRank': 'Conv2D needs a (C, H, W) input, got {shape}',
      'err.poolRank': 'Pooling needs a (C, H, W) input, got {shape}',
      'err.convGroups': '{channels} channels cannot be split into {groups} groups',
      'err.filtersGroups': '{filters} filters cannot be split into {groups} groups',
      'err.spatial': 'The spatial size must stay positive; reduce the kernel or padding',
      'err.bnRank': 'BatchNorm supports 1D or (C, H, W) inputs, got {shape}',
      'err.dropoutRange': 'Drop rate must be between 0 and 0.95',
      'err.embeddingRank': 'Embedding needs a 1D token sequence, got {shape}',
      'err.lstmRank': 'LSTM needs a (sequence, features) input, got {shape}',
      'err.mergeInputs': 'Add / Concat need at least two inputs',
      'err.addMismatch': 'Add inputs must share one shape: {shapes}',
      'err.concatRank': 'Concat inputs need the same rank: {shapes}',
      'err.concatDims': 'Concat inputs must match outside the concat axis: {shapes}',
      'err.concatAxis': 'Channel concat supports (C, H, W) inputs only',
      'err.unknownType': 'Unknown layer type “{type}”',
      'err.positive': '{field} must be a positive integer',
      'err.invalidNumber': '{field} must be a number',
      'warn.alreadyFlat': 'The input is already 1D; Flatten changes nothing',
      'warn.noParams': 'This network has no trainable parameters',
      'warn.hugeModel': 'Large model ({params} params); check your training budget',
      'warn.multiInput': 'Multiple inputs become separate input arguments in the exported code',
      'warn.inputHasInput': 'An Input layer should not receive a connection',
      'warn.softmaxMismatch': 'The output ends with Softmax; the training script handles the loss accordingly',
    }

    let I18N = { t: (key) => EN[key] || key }

    /**
     * Resolve a message key, interpolating named parameters.
     * @param ctx - plugin context that owns the locale service.
     * @returns a translate function.
     */
    function makeTranslator(ctx) {
      const locale = ctx && typeof ctx.get === 'function' ? ctx.get('locale') : undefined
      if (locale && typeof locale.register === 'function') {
        try {
          locale.register(NS, 'en', EN)
        } catch (_alreadyRegistered) {
          /* a reload of the same package keeps the previous dictionary */
        }
        try {
          locale.register(NS, 'zh', ZH)
        } catch (_alreadyRegistered) {
          /* a reload of the same package keeps the previous dictionary */
        }
      }
      let bound = null
      if (locale && typeof locale.bind === 'function') {
        try {
          bound = locale.bind(NS)
        } catch (_unbound) {
          bound = null
        }
      }
      const translate = (key, params) => {
        let text = key
        if (bound) {
          try {
            const value = bound(key)
            if (typeof value === 'string' && value !== '' && value !== key) text = value
          } catch (_translationFailed) {
            /* fall through to the bundled dictionary */
          }
        }
        if (text === key) text = EN[key] || ZH[key] || key
        if (params) {
          for (const name of Object.keys(params)) {
            let value = params[name]
            if (value && typeof value === 'object' && value.i18n) value = translate(value.i18n)
            text = text.split('{' + name + '}').join(String(value == null ? '' : value))
          }
        }
        return text
      }
      return translate
    }

    /* ------------------------------------------------------------------ *
     * Node catalog
     * ------------------------------------------------------------------ */

    const ACTIVATIONS = ['relu', 'leaky_relu', 'gelu', 'silu', 'elu', 'sigmoid', 'tanh', 'softmax', 'linear']
    const ACTIVATION_OPTIONS = ACTIVATIONS.map((value) => ({ value, labelKey: 'act.' + value }))

    const NODE_SPECS = {
      input: { cat: 'io', color: '#3b82f6', params: { name: 'input', shape: '784' } },
      output: { cat: 'io', color: '#3b82f6', params: { name: 'logits' } },
      dense: { cat: 'mlp', color: '#8b5cf6', params: { units: 128, activation: 'relu', bias: true } },
      dropout: { cat: 'mlp', color: '#8b5cf6', params: { rate: 0.5 } },
      batchnorm: { cat: 'mlp', color: '#8b5cf6', params: {} },
      activation: { cat: 'mlp', color: '#8b5cf6', params: { activation: 'relu' } },
      conv2d: {
        cat: 'conv',
        color: '#0d9488',
        params: { filters: 32, kernel: 3, stride: 1, padding: 1, dilation: 1, groups: 1, activation: 'relu', bias: true },
      },
      maxpool2d: { cat: 'conv', color: '#0d9488', params: { kernel: 2, stride: 2, padding: 0 } },
      avgpool2d: { cat: 'conv', color: '#0d9488', params: { kernel: 2, stride: 2, padding: 0 } },
      flatten: { cat: 'conv', color: '#0d9488', params: {} },
      embedding: { cat: 'seq', color: '#d97706', params: { vocab: 10000, dim: 128 } },
      lstm: {
        cat: 'seq',
        color: '#d97706',
        params: { hidden: 128, layers: 1, bidirectional: false, returnSequences: false, dropout: 0 },
      },
      add: { cat: 'merge', color: '#db2777', params: {} },
      concat: { cat: 'merge', color: '#db2777', params: { axis: 'last' } },
    }

    const CATEGORIES = [
      { id: 'io', types: ['input', 'output'] },
      { id: 'mlp', types: ['dense', 'dropout', 'batchnorm', 'activation'] },
      { id: 'conv', types: ['conv2d', 'maxpool2d', 'avgpool2d', 'flatten'] },
      { id: 'seq', types: ['embedding', 'lstm'] },
      { id: 'merge', types: ['add', 'concat'] },
    ]

    const FIELDS = {
      input: [
        { key: 'name', kind: 'text', labelKey: 'field.name' },
        { key: 'shape', kind: 'text', labelKey: 'field.shape', hintKey: 'field.shapeHint' },
      ],
      output: [{ key: 'name', kind: 'text', labelKey: 'field.outName' }],
      dense: [
        { key: 'units', kind: 'int', min: 1, max: 1000000, step: 1, labelKey: 'field.units' },
        { key: 'activation', kind: 'select', options: ACTIVATION_OPTIONS, labelKey: 'field.activation' },
        { key: 'bias', kind: 'bool', labelKey: 'field.bias' },
      ],
      conv2d: [
        { key: 'filters', kind: 'int', min: 1, max: 100000, step: 1, labelKey: 'field.filters' },
        { key: 'kernel', kind: 'int', min: 1, max: 31, step: 1, labelKey: 'field.kernel' },
        { key: 'stride', kind: 'int', min: 1, max: 16, step: 1, labelKey: 'field.stride' },
        { key: 'padding', kind: 'int', min: 0, max: 32, step: 1, labelKey: 'field.padding' },
        { key: 'dilation', kind: 'int', min: 1, max: 8, step: 1, labelKey: 'field.dilation' },
        { key: 'groups', kind: 'int', min: 1, max: 256, step: 1, labelKey: 'field.groups' },
        { key: 'activation', kind: 'select', options: ACTIVATION_OPTIONS, labelKey: 'field.activation' },
        { key: 'bias', kind: 'bool', labelKey: 'field.bias' },
      ],
      maxpool2d: [
        { key: 'kernel', kind: 'int', min: 1, max: 31, step: 1, labelKey: 'field.kernel' },
        { key: 'stride', kind: 'int', min: 1, max: 16, step: 1, labelKey: 'field.stride' },
        { key: 'padding', kind: 'int', min: 0, max: 32, step: 1, labelKey: 'field.padding' },
      ],
      avgpool2d: [
        { key: 'kernel', kind: 'int', min: 1, max: 31, step: 1, labelKey: 'field.kernel' },
        { key: 'stride', kind: 'int', min: 1, max: 16, step: 1, labelKey: 'field.stride' },
        { key: 'padding', kind: 'int', min: 0, max: 32, step: 1, labelKey: 'field.padding' },
      ],
      flatten: [],
      dropout: [{ key: 'rate', kind: 'number', min: 0, max: 0.95, step: 0.05, labelKey: 'field.rate' }],
      batchnorm: [],
      activation: [{ key: 'activation', kind: 'select', options: ACTIVATION_OPTIONS, labelKey: 'field.activation' }],
      embedding: [
        { key: 'vocab', kind: 'int', min: 1, max: 5000000, step: 1, labelKey: 'field.vocab' },
        { key: 'dim', kind: 'int', min: 1, max: 8192, step: 1, labelKey: 'field.dim' },
      ],
      lstm: [
        { key: 'hidden', kind: 'int', min: 1, max: 8192, step: 1, labelKey: 'field.hidden' },
        { key: 'layers', kind: 'int', min: 1, max: 8, step: 1, labelKey: 'field.layers' },
        { key: 'bidirectional', kind: 'bool', labelKey: 'field.bidirectional' },
        { key: 'returnSequences', kind: 'bool', labelKey: 'field.returnSequences' },
        { key: 'dropout', kind: 'number', min: 0, max: 0.9, step: 0.05, labelKey: 'field.rate' },
      ],
      add: [],
      concat: [
        {
          key: 'axis',
          kind: 'select',
          options: [
            { value: 'last', labelKey: 'axis.last' },
            { value: 'channels', labelKey: 'axis.channels' },
          ],
          labelKey: 'field.axis',
        },
      ],
    }

    const DEFAULT_TRAINING = {
      dataset: 'mnist',
      optimizer: 'adam',
      lr: 0.001,
      batchSize: 32,
      epochs: 10,
      seed: 42,
      device: 'auto',
      loss: 'auto',
    }

    const RESERVED_BASES = new Set([
      'self', 'x', 'y', 'z', 'out', 'output', 'outputs', 'inputs', 'input', 'target', 'targets',
      'model', 'net', 'torch', 'nn', 'keras', 'layers', 'loss', 'logits', 'device', 'optimizer',
      'criterion', 'train', 'test', 'data', 'loader', 'epoch', 'batch', 'pred', 'label', 'labels',
      'class', 'def', 'lambda', 'global', 'nonlocal', 'pass', 'from', 'import', 'in', 'is', 'not',
      'and', 'or', 'if', 'else', 'for', 'while', 'return', 'try', 'except', 'finally', 'with',
      'as', 'del', 'raise', 'yield', 'assert', 'break', 'continue', 'true', 'false', 'none',
    ])

    const PY_KEYWORDS = new Set([
      'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
      'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import',
      'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while',
      'with', 'yield',
    ])

    let idSeq = 0

    /**
     * Build a collision-resistant local id.
     * @param prefix - id namespace, such as `n` or `e`.
     * @returns the generated id.
     */
    function makeId(prefix) {
      idSeq += 1
      return prefix + '_' + Date.now().toString(36) + idSeq.toString(36)
    }

    /**
     * Read one finite coordinate from untrusted data.
     * @param value - candidate number.
     * @param fallback - value to use when the candidate is not finite.
     * @returns a finite number.
     */
    function finite(value, fallback) {
      const number = Number(value)
      return Number.isFinite(number) ? number : fallback
    }

    /**
     * Format one shape for display.
     * @param shape - feature dimensions without batch, or null.
     * @returns a compact parenthesized shape, or an em dash.
     */
    function formatShape(shape) {
      return shape && shape.length ? '(' + shape.join(',') + ')' : '—'
    }

    /**
     * Format a profile count with separators.
     * @param value - integer count.
     * @returns the grouped decimal text.
     */
    function formatCount(value) {
      return Number(value || 0).toLocaleString('en-US')
    }

    /**
     * Abbreviate a large count for badges.
     * @param value - integer count.
     * @returns a compact text such as 1.2M.
     */
    function compactCount(value) {
      const number = Number(value || 0)
      if (number >= 1e9) return (number / 1e9).toFixed(1) + 'B'
      if (number >= 1e6) return (number / 1e6).toFixed(1) + 'M'
      if (number >= 1e3) return (number / 1e3).toFixed(1) + 'K'
      return String(number)
    }

    /**
     * Format a byte count as a model-size label.
     * @param bytes - raw byte count.
     * @returns a human-readable size.
     */
    function formatBytes(bytes) {
      const number = Number(bytes || 0)
      if (number >= 1024 * 1024) return (number / (1024 * 1024)).toFixed(1) + ' MB'
      if (number >= 1024) return (number / 1024).toFixed(0) + ' KB'
      return number + ' B'
    }

    /**
     * Parse a comma/space separated input shape.
     * @param value - raw text such as `1, 28, 28`.
     * @returns `{ ok, shape }` or `{ ok: false, value }`.
     */
    function parseShape(value) {
      const text = String(value == null ? '' : value).trim()
      if (!text) return { ok: false, value: text }
      const parts = text
        .replace(/[×xX]/g, ',')
        .split(/[\s,;]+/)
        .filter(Boolean)
      if (!parts.length) return { ok: false, value: text }
      const shape = []
      for (const part of parts) {
        const number = Number(part)
        if (!Number.isFinite(number) || number <= 0 || Math.floor(number) !== number) {
          return { ok: false, value: text }
        }
        shape.push(number)
      }
      return { ok: true, shape, value: text }
    }

    /**
     * Read one positive integer parameter.
     * @param value - candidate value.
     * @returns the integer, or null when invalid.
     */
    function positiveInt(value) {
      const number = Number(value)
      return Number.isFinite(number) && number > 0 && Math.floor(number) === number ? number : null
    }

    /**
     * Read one non-negative integer parameter.
     * @param value - candidate value.
     * @returns the integer, or null when invalid.
     */
    function nonNegativeInt(value) {
      const number = Number(value)
      return Number.isFinite(number) && number >= 0 && Math.floor(number) === number ? number : null
    }

    /**
     * Read one bounded rate parameter.
     * @param value - candidate value.
     * @param max - inclusive upper bound.
     * @returns the rate, or null when invalid.
     */
    function rateValue(value, max) {
      const number = Number(value)
      return Number.isFinite(number) && number >= 0 && number <= max ? number : null
    }

    /**
     * Clone the parameter object of a node.
     * @param type - node type.
     * @param params - optional overrides.
     * @returns a fresh parameter object.
     */
    function defaultParams(type, params) {
      const base = NODE_SPECS[type] ? NODE_SPECS[type].params : {}
      return Object.assign({}, base, params || {})
    }

    /**
     * Build a node with catalog defaults.
     * @param type - known node type.
     * @param x - world x coordinate.
     * @param y - world y coordinate.
     * @param options - optional title and parameter overrides.
     * @returns the new node.
     */
    function createNode(type, x, y, options) {
      const extra = options || {}
      return {
        id: makeId('n'),
        type,
        x: finite(x, 0),
        y: finite(y, 0),
        title: String(extra.title || I18N.t('node.' + type)),
        params: defaultParams(type, extra.params),
      }
    }

    /* ------------------------------------------------------------------ *
     * Graph normalization
     * ------------------------------------------------------------------ */

    /**
     * Validate and normalize an untrusted graph snapshot.
     * @param raw - parsed JSON or a stored graph.
     * @returns a safe graph, or null when the payload is not a graph.
     */
    function normalizeGraph(raw) {
      if (!raw || typeof raw !== 'object' || !Array.isArray(raw.nodes)) return null
      if (raw.nodes.length > MAX_NODES) return null
      const idMap = new Map()
      const used = new Set()
      const nodes = []
      for (const entry of raw.nodes) {
        if (!entry || typeof entry !== 'object') continue
        const type = String(entry.type || '')
        if (!NODE_SPECS[type]) continue
        let id = String(entry.id || '')
        if (!id || used.has(id)) id = makeId('n')
        used.add(id)
        if (entry.id) idMap.set(String(entry.id), id)
        const params = defaultParams(type, entry.params && typeof entry.params === 'object' ? entry.params : null)
        for (const field of FIELDS[type] || []) {
          if (field.kind === 'int' || field.kind === 'number') {
            const number = Number(params[field.key])
            if (!Number.isFinite(number)) params[field.key] = NODE_SPECS[type].params[field.key]
            else params[field.key] = field.kind === 'int' ? Math.round(number) : number
          } else if (field.kind === 'bool') {
            params[field.key] = Boolean(params[field.key])
          } else if (field.kind === 'select') {
            const allowed = field.options.map((option) => option.value)
            if (!allowed.includes(params[field.key])) params[field.key] = NODE_SPECS[type].params[field.key]
          }
        }
        nodes.push({
          id,
          type,
          x: finite(entry.x, 0),
          y: finite(entry.y, 0),
          title: String(entry.title || I18N.t('node.' + type)).replace(/[\r\n\t]+/g, ' ').slice(0, 80),
          params,
        })
      }
      if (!nodes.length && raw.nodes.length) return null
      const nodeIds = new Set(nodes.map((node) => node.id))
      const edges = []
      const edgeIds = new Set()
      const seenPairs = new Set()
      for (const entry of Array.isArray(raw.edges) ? raw.edges : []) {
        if (!entry || typeof entry !== 'object') continue
        const from = idMap.get(String(entry.from)) || (nodeIds.has(String(entry.from)) ? String(entry.from) : null)
        const to = idMap.get(String(entry.to)) || (nodeIds.has(String(entry.to)) ? String(entry.to) : null)
        if (!from || !to || from === to || !nodeIds.has(from) || !nodeIds.has(to)) continue
        const pair = from + '>' + to
        if (seenPairs.has(pair)) continue
        seenPairs.add(pair)
        let id = String(entry.id || '')
        if (!id || edgeIds.has(id)) id = makeId('e')
        edgeIds.add(id)
        edges.push({ id, from, to })
        if (edges.length >= MAX_EDGES) break
      }
      const training = Object.assign({}, DEFAULT_TRAINING, raw.training && typeof raw.training === 'object' ? raw.training : null)
      training.batchSize = Math.max(1, Math.round(finite(training.batchSize, DEFAULT_TRAINING.batchSize)))
      training.epochs = Math.max(1, Math.round(finite(training.epochs, DEFAULT_TRAINING.epochs)))
      training.seed = Math.max(0, Math.round(finite(training.seed, DEFAULT_TRAINING.seed)))
      training.lr = Math.min(1, Math.max(1e-9, finite(training.lr, DEFAULT_TRAINING.lr)))
      const name = String(raw.name || I18N.t('graph.defaultName')).replace(/[\r\n\t]+/g, ' ').slice(0, 80)
      return { name, nodes, edges, training }
    }

    /**
     * Clone a graph through its serialized form.
     * @param graph - graph to copy.
     * @returns a deep copy.
     */
    function cloneGraph(graph) {
      return {
        name: graph.name,
        nodes: graph.nodes.map((node) => ({ id: node.id, type: node.type, x: node.x, y: node.y, title: node.title, params: Object.assign({}, node.params) })),
        edges: graph.edges.map((edge) => ({ id: edge.id, from: edge.from, to: edge.to })),
        training: Object.assign({}, graph.training),
      }
    }

    /* ------------------------------------------------------------------ *
     * Shape inference
     * ------------------------------------------------------------------ */

    /**
     * Compute output spatial extent of a 2D convolution or pooling window.
     * @param size - input extent.
     * @param kernel - window size.
     * @param stride - step size.
     * @param padding - symmetric padding.
     * @param dilation - kernel dilation.
     * @returns the output extent, which may be zero or negative.
     */
    function windowOut(size, kernel, stride, padding, dilation) {
      return Math.floor((size + 2 * padding - dilation * (kernel - 1) - 1) / stride) + 1
    }

    /**
     * Infer every layer shape, parameter count, and validation issue.
     * @param graph - normalized graph.
     * @returns inference results consumed by the canvas, checks, and codegen.
     */
    function analyze(graph) {
      const nodes = graph.nodes
      const byId = new Map()
      for (const node of nodes) if (!byId.has(node.id)) byId.set(node.id, node)
      const incoming = new Map()
      const outgoing = new Map()
      for (const node of nodes) {
        incoming.set(node.id, [])
        outgoing.set(node.id, [])
      }
      for (const edge of graph.edges) {
        if (!byId.has(edge.from) || !byId.has(edge.to) || edge.from === edge.to) continue
        incoming.get(edge.to).push(edge)
        outgoing.get(edge.from).push(edge)
      }

      const issues = []
      let issueSeq = 0
      const report = (severity, code, params, nodeId) => {
        issueSeq += 1
        issues.push({ id: 'issue_' + issueSeq, severity, code, params: params || {}, nodeId: nodeId || null })
      }

      const indeg = new Map(nodes.map((node) => [node.id, incoming.get(node.id).length]))
      const queue = nodes.filter((node) => indeg.get(node.id) === 0).map((node) => node.id)
      const order = []
      const resolved = new Set()
      while (queue.length) {
        const id = queue.shift()
        if (resolved.has(id)) continue
        resolved.add(id)
        order.push(id)
        for (const edge of outgoing.get(id)) {
          const next = indeg.get(edge.to) - 1
          indeg.set(edge.to, next)
          if (next === 0) queue.push(edge.to)
        }
      }
      const cyclic = nodes.filter((node) => !resolved.has(node.id))

      const state = new Map()
      const inputNodes = nodes.filter((node) => node.type === 'input')
      const outputNodes = nodes.filter((node) => node.type === 'output')

      for (const id of order) {
        const node = byId.get(id)
        const spec = NODE_SPECS[node.type]
        const inEdges = incoming.get(id)
        const inShapes = inEdges.map((edge) => {
          const source = state.get(edge.from)
          return source ? source.shape : null
        })
        const firstShape = inShapes.length ? inShapes[0] : null
        const params = node.params || {}
        let shape = null
        let parameterCount = 0
        let error = null
        const fail = (code, extra) => {
          if (!error) error = { code, params: extra || {} }
        }
        const badField = (key) => fail('err.positive', { field: { i18n: key } })

        if (!spec) {
          fail('err.unknownType', { type: String(node.type) })
        } else if (node.type === 'input') {
          const parsed = parseShape(params.shape)
          if (!parsed.ok) fail('err.shapeParse', { value: String(params.shape == null ? '' : params.shape) })
          else if (parsed.shape.length > 4) fail('err.shapeRank')
          else shape = parsed.shape
          if (inEdges.length) report('warn', 'warn.inputHasInput', {}, id)
        } else if (node.type === 'output') {
          if (!inEdges.length) fail('err.missingInput')
          else if (inEdges.length > 1) fail('err.tooManyInputs')
          else shape = firstShape
        } else if (node.type === 'add' || node.type === 'concat') {
          if (inEdges.length < 2) fail('err.mergeInputs')
          else if (inShapes.some((entry) => entry === null)) {
            /* an upstream error already explains the missing shape */
          } else if (node.type === 'add') {
            const first = inShapes[0]
            const same = inShapes.every(
              (entry) => entry.length === first.length && entry.every((dim, index) => dim === first[index]),
            )
            if (!same) fail('err.addMismatch', { shapes: inShapes.map(formatShape).join(' / ') })
            else shape = first.slice()
          } else {
            const axis = params.axis === 'channels' ? 'channels' : 'last'
            const first = inShapes[0]
            const sameRank = inShapes.every((entry) => entry.length === first.length)
            if (!sameRank) fail('err.concatRank', { shapes: inShapes.map(formatShape).join(' / ') })
            else if (axis === 'channels') {
              if (first.length !== 3) fail('err.concatAxis')
              else {
                let channels = 0
                let matching = true
                for (const entry of inShapes) {
                  if (entry[1] !== first[1] || entry[2] !== first[2]) matching = false
                  channels += entry[0]
                }
                if (!matching) fail('err.concatDims', { shapes: inShapes.map(formatShape).join(' / ') })
                else shape = [channels, first[1], first[2]]
              }
            } else {
              let total = 0
              let matching = true
              for (const entry of inShapes) {
                for (let index = 0; index < first.length - 1; index += 1) {
                  if (entry[index] !== first[index]) matching = false
                }
                total += entry[entry.length - 1]
              }
              if (!matching) fail('err.concatDims', { shapes: inShapes.map(formatShape).join(' / ') })
              else shape = first.slice(0, -1).concat(total)
            }
          }
        } else {
          if (!inEdges.length) fail('err.missingInput')
          else if (inEdges.length > 1) fail('err.tooManyInputs')
        }

        if (!error && node.type !== 'input' && node.type !== 'output' && node.type !== 'add' && node.type !== 'concat') {
          if (firstShape === null && inEdges.length) {
            /* the upstream layer failed; do not repeat its message */
          } else if (firstShape !== null) {
            if (node.type === 'dense') {
              const units = positiveInt(params.units)
              if (units === null) badField('field.units')
              else if (firstShape.length !== 1) fail('err.denseFlat', { shape: formatShape(firstShape) })
              else {
                shape = [units]
                parameterCount = firstShape[0] * units + (params.bias === false ? 0 : units)
              }
            } else if (node.type === 'conv2d') {
              const filters = positiveInt(params.filters)
              const kernel = positiveInt(params.kernel)
              const stride = positiveInt(params.stride)
              const padding = nonNegativeInt(params.padding)
              const dilation = positiveInt(params.dilation)
              const groups = positiveInt(params.groups)
              if (filters === null) badField('field.filters')
              else if (kernel === null) badField('field.kernel')
              else if (stride === null) badField('field.stride')
              else if (padding === null) badField('field.padding')
              else if (dilation === null) badField('field.dilation')
              else if (groups === null) badField('field.groups')
              else if (firstShape.length !== 3) fail('err.convRank', { shape: formatShape(firstShape) })
              else if (firstShape[0] % groups !== 0) fail('err.convGroups', { channels: firstShape[0], groups })
              else if (filters % groups !== 0) fail('err.filtersGroups', { filters, groups })
              else {
                const height = windowOut(firstShape[1], kernel, stride, padding, dilation)
                const width = windowOut(firstShape[2], kernel, stride, padding, dilation)
                if (height <= 0 || width <= 0) fail('err.spatial')
                else {
                  shape = [filters, height, width]
                  parameterCount = filters * ((firstShape[0] / groups) * kernel * kernel) + (params.bias === false ? 0 : filters)
                }
              }
            } else if (node.type === 'maxpool2d' || node.type === 'avgpool2d') {
              const kernel = positiveInt(params.kernel)
              const stride = positiveInt(params.stride)
              const padding = nonNegativeInt(params.padding)
              if (kernel === null) badField('field.kernel')
              else if (stride === null) badField('field.stride')
              else if (padding === null) badField('field.padding')
              else if (firstShape.length !== 3) fail('err.poolRank', { shape: formatShape(firstShape) })
              else {
                const height = windowOut(firstShape[1], kernel, stride, padding, 1)
                const width = windowOut(firstShape[2], kernel, stride, padding, 1)
                if (height <= 0 || width <= 0) fail('err.spatial')
                else shape = [firstShape[0], height, width]
              }
            } else if (node.type === 'flatten') {
              let product = 1
              for (const dim of firstShape) product *= dim
              shape = [product]
              if (firstShape.length === 1) report('warn', 'warn.alreadyFlat', {}, id)
            } else if (node.type === 'dropout') {
              const rate = rateValue(params.rate, 0.95)
              if (rate === null) fail('err.dropoutRange')
              else shape = firstShape.slice()
            } else if (node.type === 'batchnorm') {
              if (firstShape.length !== 1 && firstShape.length !== 3) fail('err.bnRank', { shape: formatShape(firstShape) })
              else {
                shape = firstShape.slice()
                parameterCount = 2 * firstShape[0]
              }
            } else if (node.type === 'activation') {
              shape = firstShape.slice()
            } else if (node.type === 'embedding') {
              const vocab = positiveInt(params.vocab)
              const dim = positiveInt(params.dim)
              if (vocab === null) badField('field.vocab')
              else if (dim === null) badField('field.dim')
              else if (firstShape.length !== 1) fail('err.embeddingRank', { shape: formatShape(firstShape) })
              else {
                shape = [firstShape[0], dim]
                parameterCount = vocab * dim
              }
            } else if (node.type === 'lstm') {
              const hidden = positiveInt(params.hidden)
              const layers = positiveInt(params.layers)
              const dropout = rateValue(params.dropout, 0.9)
              if (hidden === null) badField('field.hidden')
              else if (layers === null) badField('field.layers')
              else if (dropout === null) fail('err.dropoutRange')
              else if (firstShape.length !== 2) fail('err.lstmRank', { shape: formatShape(firstShape) })
              else {
                const directions = params.bidirectional ? 2 : 1
                shape = params.returnSequences ? [firstShape[0], hidden * directions] : [hidden * directions]
                let inputSize = firstShape[1]
                for (let layer = 0; layer < layers; layer += 1) {
                  parameterCount += 4 * hidden * (inputSize + hidden) * directions + 8 * hidden * directions
                  inputSize = hidden * directions
                }
              }
            }
          }
        }

        if (error) report('error', error.code, error.params, id)
        state.set(id, { shape, params: parameterCount, error })
      }

      for (const node of cyclic) {
        report('error', 'err.cycle', {}, node.id)
        state.set(node.id, { shape: null, params: 0, error: { code: 'err.cycle', params: {} } })
      }

      if (!inputNodes.length) report('error', 'err.noInput', {})
      if (!outputNodes.length) report('error', 'err.noOutput', {})
      if (inputNodes.length > 1) report('error', 'err.multiInput', {})
      if (outputNodes.length > 1) report('error', 'err.multiOutput', {})

      const reachable = new Set()
      const stack = inputNodes.map((node) => node.id)
      while (stack.length) {
        const id = stack.pop()
        if (reachable.has(id)) continue
        reachable.add(id)
        for (const edge of outgoing.get(id)) stack.push(edge.to)
      }
      for (const id of order) {
        const info = state.get(id)
        if (!reachable.has(id) && info && !info.error) report('warn', 'err.unreachable', {}, id)
      }
      for (const node of nodes) {
        const info = state.get(node.id)
        if (!info || info.error || node.type === 'output' || node.type === 'input') continue
        if (!outgoing.get(node.id).length) report('warn', 'err.deadEnd', {}, node.id)
      }

      let totalParams = 0
      for (const node of nodes) {
        const info = state.get(node.id)
        if (info) totalParams += info.params
      }
      const errorCount = issues.filter((issue) => issue.severity === 'error').length
      const warningCount = issues.filter((issue) => issue.severity === 'warning').length
      if (!errorCount && outputNodes.length) {
        if (totalParams === 0) report('warn', 'warn.noParams', {})
        if (totalParams > 100000000) report('warn', 'warn.hugeModel', { params: compactCount(totalParams) })
      }

      const outputTail = (nodeId) => {
        const inEdges = incoming.get(nodeId)
        if (inEdges.length !== 1) return false
        const source = byId.get(inEdges[0].from)
        if (!source) return false
        if (source.type === 'activation') return source.params.activation === 'softmax'
        if (source.type === 'dense' || source.type === 'conv2d') return source.params.activation === 'softmax'
        return false
      }
      const softmaxTail = outputNodes.length > 0 && outputNodes.every((node) => outputTail(node.id))

      return {
        byId,
        incoming,
        outgoing,
        order,
        state,
        issues,
        inputNodes,
        outputNodes,
        totalParams,
        sizeBytes: totalParams * 4,
        outputShapes: outputNodes.map((node) => (state.get(node.id) ? state.get(node.id).shape : null)).filter(Boolean),
        softmaxTail,
        errorCount,
        warningCount,
        valid: errorCount === 0 && cyclic.length === 0 && inputNodes.length > 0 && outputNodes.length > 0,
      }
    }

    /* ------------------------------------------------------------------ *
     * Naming for generated code
     * ------------------------------------------------------------------ */

    /**
     * Derive a unique Python identifier per node.
     * @param nodes - graph nodes in display order.
     * @returns a map from node id to identifier.
     */
    function nodeBases(nodes) {
      const used = new Set(RESERVED_BASES)
      const map = new Map()
      for (const node of nodes) {
        let base = String(node.title || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '')
        if (!base || /^[0-9]/.test(base)) base = String(node.type).replace(/[^a-z0-9]+/gi, '').toLowerCase() || 'layer'
        let candidate = base
        let suffix = 2
        while (used.has(candidate)) {
          candidate = base + '_' + suffix
          suffix += 1
        }
        used.add(candidate)
        map.set(node.id, candidate)
      }
      return map
    }

    /**
     * Turn a display name into a Python class name.
     * @param name - graph name.
     * @returns a valid class identifier.
     */
    function classNameFor(name) {
      const words = String(name || '')
        .replace(/[^A-Za-z0-9]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
      let result = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')
      if (!result || /^[0-9]/.test(result)) result = 'Net'
      if (PY_KEYWORDS.has(result)) result = 'Net'
      return result.slice(0, 48)
    }

    /**
     * Quote a string for a double-quoted Python literal.
     * @param value - raw text.
     * @returns the escaped content without quotes.
     */
    function pyEscape(value) {
      return String(value == null ? '' : value)
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/[\r\n]+/g, ' ')
    }

    /**
     * Sanitize text that lands inside a triple-quoted docstring.
     * @param value - raw text.
     * @returns single-line text without triple quotes.
     */
    function pyDoc(value) {
      return String(value == null ? '' : value)
        .replace(/"""/g, "'''")
        .replace(/[\r\n]+/g, ' ')
    }

    /**
     * Read the first input shape of a resolved node.
     * @param analysis - analyze() result.
     * @param node - target node.
     * @returns the shape or null.
     */
    function firstInputShape(analysis, node) {
      const edges = analysis.incoming.get(node.id) || []
      if (!edges.length) return null
      const source = analysis.state.get(edges[0].from)
      return source ? source.shape : null
    }

    /**
     * Read all resolved input shapes of a node.
     * @param analysis - analyze() result.
     * @param node - target node.
     * @returns shapes in edge order, skipping unresolved ones.
     */
    function inputShapesOf(analysis, node) {
      return (analysis.incoming.get(node.id) || [])
        .map((edge) => analysis.state.get(edge.from))
        .filter((info) => info && info.shape)
        .map((info) => info.shape)
    }

    /* ------------------------------------------------------------------ *
     * PyTorch code generation
     * ------------------------------------------------------------------ */

    /**
     * Render one PyTorch activation module.
     * @param activation - activation id.
     * @returns module source, or null for a linear layer.
     */
    function pytorchActivation(activation) {
      switch (activation) {
        case 'relu':
          return 'nn.ReLU()'
        case 'leaky_relu':
          return 'nn.LeakyReLU(0.1)'
        case 'gelu':
          return 'nn.GELU()'
        case 'silu':
          return 'nn.SiLU()'
        case 'elu':
          return 'nn.ELU()'
        case 'sigmoid':
          return 'nn.Sigmoid()'
        case 'tanh':
          return 'nn.Tanh()'
        case 'softmax':
          return 'nn.Softmax(dim=-1)'
        default:
          return null
      }
    }

    /**
     * Generate a PyTorch nn.Module for the graph.
     * @param graph - normalized graph.
     * @param analysis - analyze() result.
     * @returns Python source, or null when the graph is invalid.
     */
    function generatePyTorchModel(graph, analysis) {
      if (!analysis.valid) return null
      const bases = nodeBases(graph.nodes)
      const classBase = classNameFor(graph.name)
      const inputs = analysis.inputNodes
      const outputs = analysis.outputNodes
      const args = inputs.map((node) => bases.get(node.id))
      const usedLocals = new Set(args)
      const freshLocal = (preferred) => {
        let candidate = preferred
        let suffix = 2
        while (usedLocals.has(candidate)) {
          candidate = preferred + '_' + suffix
          suffix += 1
        }
        usedLocals.add(candidate)
        return candidate
      }
      const init = []
      const body = []
      const vars = new Map()

      for (const id of analysis.order) {
        const node = analysis.byId.get(id)
        const base = bases.get(id)
        usedLocals.add(base)
        const inputsVars = (analysis.incoming.get(id) || []).map((edge) => vars.get(edge.from))
        const source = inputsVars[0]
        const shape = analysis.state.get(id).shape
        switch (node.type) {
          case 'input':
            vars.set(id, base)
            break
          case 'output':
            body.push(base + ' = ' + source)
            vars.set(id, base)
            break
          case 'dense': {
            const inFeatures = firstInputShape(analysis, node)[0]
            init.push(
              'self.' + base + ' = nn.Linear(' + inFeatures + ', ' + node.params.units + (node.params.bias === false ? ', bias=False' : '') + ')',
            )
            body.push(base + ' = self.' + base + '(' + source + ')')
            const act = pytorchActivation(node.params.activation)
            if (act) {
              init.push('self.' + base + '_act = ' + act)
              body.push(base + ' = self.' + base + '_act(' + base + ')')
            }
            vars.set(id, base)
            break
          }
          case 'conv2d': {
            const inChannels = firstInputShape(analysis, node)[0]
            const params = node.params
            init.push(
              'self.' + base + ' = nn.Conv2d(' +
                inChannels + ', ' + params.filters +
                ', kernel_size=' + params.kernel +
                ', stride=' + params.stride +
                ', padding=' + params.padding +
                ', dilation=' + params.dilation +
                ', groups=' + params.groups +
                (params.bias === false ? ', bias=False' : '') +
                ')',
            )
            body.push(base + ' = self.' + base + '(' + source + ')')
            const act = pytorchActivation(params.activation)
            if (act) {
              init.push('self.' + base + '_act = ' + act)
              body.push(base + ' = self.' + base + '_act(' + base + ')')
            }
            vars.set(id, base)
            break
          }
          case 'maxpool2d':
          case 'avgpool2d': {
            const kind = node.type === 'maxpool2d' ? 'MaxPool2d' : 'AvgPool2d'
            init.push(
              'self.' + base + ' = nn.' + kind +
                '(kernel_size=' + node.params.kernel +
                ', stride=' + node.params.stride +
                ', padding=' + node.params.padding + ')',
            )
            body.push(base + ' = self.' + base + '(' + source + ')')
            vars.set(id, base)
            break
          }
          case 'flatten':
            body.push(base + ' = torch.flatten(' + source + ', 1)')
            vars.set(id, base)
            break
          case 'dropout':
            init.push('self.' + base + ' = nn.Dropout(p=' + node.params.rate + ')')
            body.push(base + ' = self.' + base + '(' + source + ')')
            vars.set(id, base)
            break
          case 'batchnorm': {
            const channels = firstInputShape(analysis, node)[0]
            const kind = firstInputShape(analysis, node).length === 3 ? 'BatchNorm2d' : 'BatchNorm1d'
            init.push('self.' + base + ' = nn.' + kind + '(' + channels + ')')
            body.push(base + ' = self.' + base + '(' + source + ')')
            vars.set(id, base)
            break
          }
          case 'activation': {
            const act = pytorchActivation(node.params.activation)
            if (act) {
              init.push('self.' + base + ' = ' + act)
              body.push(base + ' = self.' + base + '(' + source + ')')
            } else {
              body.push(base + ' = ' + source)
            }
            vars.set(id, base)
            break
          }
          case 'embedding':
            init.push('self.' + base + ' = nn.Embedding(' + node.params.vocab + ', ' + node.params.dim + ')')
            body.push(base + ' = self.' + base + '(' + source + ')')
            vars.set(id, base)
            break
          case 'lstm': {
            const inFeatures = firstInputShape(analysis, node)[1]
            const params = node.params
            const extras = []
            if (params.layers > 1) extras.push('dropout=' + params.dropout)
            init.push(
              'self.' + base + ' = nn.LSTM(' +
                inFeatures + ', ' + params.hidden +
                ', num_layers=' + params.layers +
                ', batch_first=True' +
                ', bidirectional=' + (params.bidirectional ? 'True' : 'False') +
                (extras.length ? ', ' + extras.join(', ') : '') +
                ')',
            )
            if (params.returnSequences) {
              body.push(base + ', _ = self.' + base + '(' + source + ')')
            } else {
              const seqVar = freshLocal(base + '_out')
              const hiddenVar = freshLocal(base + '_hidden')
              body.push(seqVar + ', (' + hiddenVar + ', _) = self.' + base + '(' + source + ')')
              if (params.bidirectional) {
                body.push(base + ' = torch.cat((' + hiddenVar + '[-2], ' + hiddenVar + '[-1]), dim=1)')
              } else {
                body.push(base + ' = ' + hiddenVar + '[-1]')
              }
              usedLocals.add(base)
            }
            vars.set(id, base)
            break
          }
          case 'add': {
            if (inputsVars.length < 2) return null
            body.push(base + ' = ' + inputsVars.join(' + '))
            vars.set(id, base)
            break
          }
          case 'concat': {
            if (inputsVars.length < 2) return null
            const dim = node.params.axis === 'channels' ? '1' : '-1'
            body.push(base + ' = torch.cat([' + inputsVars.join(', ') + '], dim=' + dim + ')')
            vars.set(id, base)
            break
          }
          default:
            return null
        }
      }

      const outputVars = outputs.map((node) => vars.get(node.id)).filter(Boolean)
      if (!outputVars.length) return null
      const docLines = [
        'Generated by Neural Network Studio.',
        'Network: ' + pyDoc(graph.name),
        'Layers: ' + graph.nodes.length + ' | Parameters: ' + formatCount(analysis.totalParams),
        'Input: ' + inputs.map((node) => formatShape(analysis.state.get(node.id).shape)).join(', '),
        'Output: ' + analysis.outputShapes.map(formatShape).join(', '),
      ]
      const lines = []
      lines.push('"""' + docLines[0])
      for (const line of docLines.slice(1)) lines.push(line)
      lines.push('"""')
      lines.push('')
      lines.push('import torch')
      lines.push('import torch.nn as nn')
      lines.push('')
      lines.push('')
      lines.push('class ' + classBase + '(nn.Module):')
      lines.push('    def __init__(self):')
      lines.push('        super().__init__()')
      if (init.length) {
        for (const line of init) lines.push('        ' + line)
      } else {
        lines.push('        pass')
      }
      lines.push('')
      lines.push('    def forward(self, ' + args.join(', ') + '):')
      if (body.length) {
        for (const line of body) lines.push('        ' + line)
      }
      lines.push('        return ' + outputVars.join(', '))
      lines.push('')
      return lines.join('\n')
    }

    /**
     * Generate a Keras functional model for the graph.
     * @param graph - normalized graph.
     * @param analysis - analyze() result.
     * @returns Python source, or null when the graph is invalid.
     */
    function generateKerasModel(graph, analysis) {
      if (!analysis.valid) return null
      const bases = nodeBases(graph.nodes)
      const modelName = classNameFor(graph.name)
      const inputVars = []
      const lines = []
      const outputs = []
      const vars = new Map()
      const activationName = (value) => {
        switch (value) {
          case 'relu':
            return 'relu'
          case 'leaky_relu':
            return 'leaky_relu'
          case 'gelu':
            return 'gelu'
          case 'silu':
            return 'silu'
          case 'elu':
            return 'elu'
          case 'sigmoid':
            return 'sigmoid'
          case 'tanh':
            return 'tanh'
          case 'softmax':
            return 'softmax'
          default:
            return null
        }
      }
      for (const id of analysis.order) {
        const node = analysis.byId.get(id)
        const base = bases.get(id)
        const inputVarsOfNode = (analysis.incoming.get(id) || []).map((edge) => vars.get(edge.from)).filter(Boolean)
        const source = inputVarsOfNode[0]
        const shape = analysis.state.get(id).shape
        switch (node.type) {
          case 'input': {
            const name = String(node.params.name || base).slice(0, 48)
            const kerasShape = shape.length === 3 ? [shape[1], shape[2], shape[0]] : shape
            lines.push('    ' + base + ' = keras.Input(shape=(' + kerasShape.join(', ') + (kerasShape.length === 1 ? ',' : '') + '), name="' + pyEscape(name) + '")')
            inputVars.push(base)
            vars.set(id, base)
            break
          }
          case 'output':
            outputs.push(source)
            vars.set(id, source)
            break
          case 'dense': {
            lines.push(
              '    ' + base + ' = layers.Dense(' + node.params.units +
                (node.params.bias === false ? ', use_bias=False' : '') +
                ', name="' + base + '")(' + source + ')',
            )
            const act = activationName(node.params.activation)
            if (act) lines.push('    ' + base + ' = layers.Activation("' + act + '", name="' + base + '_act")(' + base + ')')
            vars.set(id, base)
            break
          }
          case 'conv2d': {
            if (node.params.padding > 0) {
              lines.push(
                '    ' + base + '_pad = layers.ZeroPadding2D(padding=' + node.params.padding +
                  ', name="' + base + '_pad")(' + source + ')',
              )
            }
            const convSource = node.params.padding > 0 ? base + '_pad' : source
            lines.push(
              '    ' + base + ' = layers.Conv2D(' + node.params.filters +
                ', kernel_size=' + node.params.kernel +
                ', strides=' + node.params.stride +
                ', padding="valid", dilation_rate=' + node.params.dilation +
                ', groups=' + node.params.groups +
                (node.params.bias === false ? ', use_bias=False' : '') +
                ', name="' + base + '")(' + convSource + ')',
            )
            const act = activationName(node.params.activation)
            if (act) lines.push('    ' + base + ' = layers.Activation("' + act + '", name="' + base + '_act")(' + base + ')')
            vars.set(id, base)
            break
          }
          case 'maxpool2d':
          case 'avgpool2d': {
            if (node.params.padding > 0) {
              lines.push(
                '    ' + base + '_pad = layers.ZeroPadding2D(padding=' + node.params.padding +
                  ', name="' + base + '_pad")(' + source + ')',
              )
            }
            const poolSource = node.params.padding > 0 ? base + '_pad' : source
            const kind = node.type === 'maxpool2d' ? 'MaxPooling2D' : 'AveragePooling2D'
            lines.push(
              '    ' + base + ' = layers.' + kind + '(pool_size=' + node.params.kernel +
                ', strides=' + node.params.stride +
                ', padding="valid"' +
                ', name="' + base + '")(' + poolSource + ')',
            )
            vars.set(id, base)
            break
          }
          case 'flatten': {
            const inShape = firstInputShape(analysis, node)
            if (inShape.length > 1) {
              let product = 1
              for (const dim of inShape) product *= dim
              lines.push(
                '    ' + base + ' = layers.Reshape((' + product + ',), name="' + base + '")(' + source + ')',
              )
            } else {
              lines.push('    ' + base + ' = ' + source)
            }
            vars.set(id, base)
            break
          }
          case 'dropout':
            lines.push('    ' + base + ' = layers.Dropout(' + node.params.rate + ', name="' + base + '")(' + source + ')')
            vars.set(id, base)
            break
          case 'batchnorm': {
            lines.push('    ' + base + ' = layers.BatchNormalization(axis=-1, name="' + base + '")(' + source + ')')
            vars.set(id, base)
            break
          }
          case 'activation': {
            const act = activationName(node.params.activation)
            lines.push('    ' + base + ' = layers.Activation("' + (act || 'linear') + '", name="' + base + '")(' + source + ')')
            vars.set(id, base)
            break
          }
          case 'embedding':
            lines.push(
              '    ' + base + ' = layers.Embedding(' + node.params.vocab + ', ' + node.params.dim +
                ', name="' + base + '")(' + source + ')',
            )
            vars.set(id, base)
            break
          case 'lstm': {
            let current = source
            for (let layer = 0; layer < node.params.layers; layer += 1) {
              const last = layer === node.params.layers - 1
              const returnSequences = last ? node.params.returnSequences : true
              const layerName = base + (node.params.layers > 1 ? '_' + (layer + 1) : '')
              const inner = 'layers.LSTM(' + node.params.hidden +
                ', return_sequences=' + (returnSequences ? 'True' : 'False') +
                (last && node.params.dropout > 0 ? ', dropout=' + node.params.dropout : '') +
                ', name="' + layerName + '_lstm")'
              const wrapped = node.params.bidirectional
                ? 'layers.Bidirectional(' + inner + ', name="' + layerName + '")'
                : inner
              lines.push('    ' + layerName + ' = ' + wrapped + '(' + current + ')')
              current = layerName
            }
            vars.set(id, current)
            break
          }
          case 'add':
            lines.push('    ' + base + ' = layers.Add(name="' + base + '")(' + '[' + inputVarsOfNode.join(', ') + '])')
            vars.set(id, base)
            break
          case 'concat': {
            const inShape = firstInputShape(analysis, node)
            let axis = '-1'
            if (node.params.axis !== 'channels' && inShape && inShape.length === 3) axis = '2'
            lines.push('    ' + base + ' = layers.Concatenate(axis=' + axis + ', name="' + base + '")(' + '[' + inputVarsOfNode.join(', ') + '])')
            vars.set(id, base)
            break
          }
          default:
            return null
        }
      }
      if (!outputs.length) return null
      const linesOut = []
      linesOut.push('"""')
      linesOut.push('Generated by Neural Network Studio.')
      linesOut.push('Network: ' + pyDoc(graph.name))
      linesOut.push('Layers: ' + graph.nodes.length + ' | Parameters: ' + formatCount(analysis.totalParams))
      linesOut.push('"""')
      linesOut.push('')
      linesOut.push('import keras')
      linesOut.push('from keras import layers')
      linesOut.push('')
      linesOut.push('')
      linesOut.push('def build_model():')
      for (const line of lines) linesOut.push(line)
      linesOut.push('')
      const inputArg = inputVars.length === 1 ? inputVars[0] : '[' + inputVars.join(', ') + ']'
      const outputArg = outputs.length === 1 ? outputs[0] : '[' + outputs.join(', ') + ']'
      linesOut.push('    return keras.Model(inputs=' + inputArg + ', outputs=' + outputArg + ', name="' + modelName + '")')
      linesOut.push('')
      return linesOut.join('\n')
    }

    /* ------------------------------------------------------------------ *
     * Training script generation
     * ------------------------------------------------------------------ */

    /**
     * Report whether the network maps every input shape back onto itself,
     * which makes the generated training script a reconstruction task.
     * @param graph - normalized graph.
     * @param analysis - analyze() result.
     * @returns true for a single-input, single-output same-shape network.
     */
    function isReconstruction(graph, analysis) {
      if (analysis.inputNodes.length !== 1 || analysis.outputNodes.length !== 1) return false
      const input = analysis.state.get(analysis.inputNodes[0].id)
      const output = analysis.state.get(analysis.outputNodes[0].id)
      if (!input || !output || !input.shape || !output.shape) return false
      if (input.shape.length !== output.shape.length) return false
      return input.shape.every((dim, index) => dim === output.shape[index])
    }

    /**
     * Resolve the effective loss kind for a graph.
     * @param graph - normalized graph.
     * @param analysis - analyze() result.
     * @returns `cross_entropy`, `probabilities`, or `mse`.
     */
    function effectiveLoss(graph, analysis) {
      if (isReconstruction(graph, analysis)) return 'mse'
      const choice = graph.training.loss
      if (choice === 'mse') return 'mse'
      if (analysis.softmaxTail) return 'probabilities'
      if (choice === 'nll') return 'probabilities'
      return 'cross_entropy'
    }

    /**
     * Resolve class count from the first resolved output shape.
     * @param analysis - analyze() result.
     * @returns the last output dimension, or 10.
     */
    function classCount(analysis) {
      const shape = analysis.outputShapes[0]
      if (shape && shape.length) return shape[shape.length - 1]
      return 10
    }

    /**
     * Generate a PyTorch training script matching the model.
     * @param graph - normalized graph.
     * @param analysis - analyze() result.
     * @returns Python source.
     */
    function generatePyTorchTraining(graph, analysis) {
      const config = graph.training
      const className = classNameFor(graph.name)
      const inputShape = analysis.state.get(analysis.inputNodes[0].id).shape
      const numClasses = classCount(analysis)
      const lossKind = effectiveLoss(graph, analysis)
      const reconstruction = isReconstruction(graph, analysis)
      const usesEmbedding = graph.nodes.some((node) => node.type === 'embedding')
      const embedding = graph.nodes.find((node) => node.type === 'embedding')
      const vocab = embedding ? embedding.params.vocab : 10000
      const dataset = usesEmbedding ? 'custom' : config.dataset
      const lines = []
      const push = (line) => lines.push(line == null ? '' : line)

      push('"""Train the network generated by Neural Network Studio.')
      push('')
      push('Save the generated model as model.py next to this script.')
      push('Dataset: ' + dataset + ' | Loss: ' + lossKind + ' | Parameters: ' + formatCount(analysis.totalParams))
      push('"""')
      push('')
      push('import torch')
      push('import torch.nn.functional as F')
      push('from torch.utils.data import DataLoader, TensorDataset')
      push('')
      push('from model import ' + className)
      push('')
      push('SEED = ' + config.seed)
      push('BATCH_SIZE = ' + config.batchSize)
      push('EPOCHS = ' + config.epochs)
      push('LEARNING_RATE = ' + config.lr)
      push('NUM_CLASSES = ' + numClasses)
      push('INPUT_SHAPE = (' + inputShape.join(', ') + (inputShape.length === 1 ? ',' : '') + ')')
      if (usesEmbedding) push('VOCAB_SIZE = ' + vocab)
      push('LOSS_MODE = "' + lossKind + '"')
      push('RECONSTRUCTION = ' + (reconstruction ? 'True' : 'False'))
      push('')
      push('torch.manual_seed(SEED)')
      if (config.device === 'cpu') {
        push('device = torch.device("cpu")')
      } else if (config.device === 'cuda') {
        push('device = torch.device("cuda" if torch.cuda.is_available() else "cpu")')
      } else if (config.device === 'mps') {
        push('device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")')
      } else {
        push('if torch.cuda.is_available():')
        push('    DEVICE = "cuda"')
        push('elif getattr(torch.backends, "mps", None) and torch.backends.mps.is_available():')
        push('    DEVICE = "mps"')
        push('else:')
        push('    DEVICE = "cpu"')
        push('device = torch.device(DEVICE)')
      }
      push('')
      push('')
      push('def build_loaders():')
      if (dataset === 'mnist') {
        push('    from torchvision import datasets, transforms')
        push('')
        push('    transform = transforms.Compose([')
        push('        transforms.ToTensor(),')
        push('        transforms.Normalize((0.1307,), (0.3081,)),')
        push('        transforms.Lambda(lambda tensor: tensor.reshape(INPUT_SHAPE)),')
        push('    ])')
        push('    train_set = datasets.MNIST("data", train=True, download=True, transform=transform)')
        push('    test_set = datasets.MNIST("data", train=False, download=True, transform=transform)')
        push('    return (')
        push('        DataLoader(train_set, batch_size=BATCH_SIZE, shuffle=True),')
        push('        DataLoader(test_set, batch_size=BATCH_SIZE),')
        push('    )')
      } else if (dataset === 'cifar10') {
        push('    from torchvision import datasets, transforms')
        push('')
        push('    transform = transforms.Compose([')
        push('        transforms.ToTensor(),')
        push('        transforms.Normalize((0.4914, 0.4822, 0.4465), (0.2023, 0.1994, 0.2010)),')
        push('        transforms.Lambda(lambda tensor: tensor.reshape(INPUT_SHAPE)),')
        push('    ])')
        push('    train_set = datasets.CIFAR10("data", train=True, download=True, transform=transform)')
        push('    test_set = datasets.CIFAR10("data", train=False, download=True, transform=transform)')
        push('    return (')
        push('        DataLoader(train_set, batch_size=BATCH_SIZE, shuffle=True),')
        push('        DataLoader(test_set, batch_size=BATCH_SIZE),')
        push('    )')
      } else {
        push('    # TODO: replace the synthetic tensors with your own dataset.')
        if (usesEmbedding) {
          push('    train_inputs = torch.randint(0, VOCAB_SIZE, (4096, *INPUT_SHAPE))')
          push('    test_inputs = torch.randint(0, VOCAB_SIZE, (1024, *INPUT_SHAPE))')
        } else {
          push('    train_inputs = torch.randn(4096, *INPUT_SHAPE)')
          push('    test_inputs = torch.randn(1024, *INPUT_SHAPE)')
        }
        push('    train_targets = torch.randint(0, NUM_CLASSES, (4096,))')
        push('    test_targets = torch.randint(0, NUM_CLASSES, (1024,))')
        push('    return (')
        push('        DataLoader(TensorDataset(train_inputs, train_targets), batch_size=BATCH_SIZE, shuffle=True),')
        push('        DataLoader(TensorDataset(test_inputs, test_targets), batch_size=BATCH_SIZE),')
        push('    )')
      }
      push('')
      push('')
      push('def compute_loss(logits, targets):')
      push('    if LOSS_MODE == "probabilities":')
      push('        # The model already applies Softmax; NLLLoss expects log-probabilities.')
      push('        return F.nll_loss(torch.log(logits.clamp_min(1e-12)), targets)')
      push('    if LOSS_MODE == "mse":')
      if (reconstruction) {
        push('        return F.mse_loss(logits, targets)')
      } else {
        push('        return F.mse_loss(logits, F.one_hot(targets, NUM_CLASSES).float())')
      }
      push('    return F.cross_entropy(logits, targets)')
      push('')
      push('')
      push('def evaluate(model, loader):')
      push('    model.eval()')
      push('    total_loss = 0.0')
      push('    correct = 0')
      push('    total = 0')
      push('    with torch.no_grad():')
      push('        for inputs, targets in loader:')
      push('            inputs, targets = inputs.to(device), targets.to(device)')
      push('            logits = model(inputs)')
      if (reconstruction) {
        push('            total_loss += compute_loss(logits, inputs).item() * targets.size(0)')
      } else {
        push('            total_loss += compute_loss(logits, targets).item() * targets.size(0)')
        push('            correct += (logits.argmax(dim=1) == targets).sum().item()')
      }
      push('            total += targets.size(0)')
      push('    if RECONSTRUCTION:')
      push('        return total_loss / max(total, 1), None')
      push('    return total_loss / max(total, 1), correct / max(total, 1)')
      push('')
      push('')
      push('def main():')
      push('    torch.manual_seed(SEED)')
      push('    train_loader, test_loader = build_loaders()')
      push('    model = ' + className + '().to(device)')
      push('    print(f"parameters: {sum(p.numel() for p in model.parameters()):,}")')
      push('')
      const optimizer = {
        adam: 'torch.optim.Adam',
        adamw: 'torch.optim.AdamW',
        sgd: 'torch.optim.SGD',
        rmsprop: 'torch.optim.RMSprop',
      }[config.optimizer] || 'torch.optim.Adam'
      push('    optimizer = ' + optimizer + '(model.parameters(), lr=LEARNING_RATE)')
      push('')
      push('    for epoch in range(1, EPOCHS + 1):')
      push('        model.train()')
      push('        running = 0.0')
      push('        seen = 0')
      push('        for inputs, targets in train_loader:')
      push('            inputs, targets = inputs.to(device), targets.to(device)')
      push('            optimizer.zero_grad()')
      push('            logits = model(inputs)')
      if (reconstruction) {
        push('            loss = compute_loss(logits, inputs)')
      } else {
        push('            loss = compute_loss(logits, targets)')
      }
      push('            loss.backward()')
      push('            optimizer.step()')
      push('            running += loss.item() * targets.size(0)')
      push('            seen += targets.size(0)')
      push('        val_loss, val_acc = evaluate(model, test_loader)')
      push('        if val_acc is None:')
      push('            print(f"epoch {epoch:02d}  train_loss {running / max(seen, 1):.4f}  val_loss {val_loss:.4f}")')
      push('        else:')
      push('            print(f"epoch {epoch:02d}  train_loss {running / max(seen, 1):.4f}  val_loss {val_loss:.4f}  val_acc {val_acc:.4f}")')
      push('')
      push('    torch.save(model.state_dict(), "model.pt")')
      push('    print("saved model.pt")')
      push('')
      push('')
      push('if __name__ == "__main__":')
      push('    main()')
      push('')
      return lines.join('\n')
    }

    /**
     * Generate a Keras training script matching the model.
     * @param graph - normalized graph.
     * @param analysis - analyze() result.
     * @returns Python source.
     */
    function generateKerasTraining(graph, analysis) {
      const config = graph.training
      const inputShape = analysis.state.get(analysis.inputNodes[0].id).shape
      const kerasInputShape = inputShape.length === 3 ? [inputShape[1], inputShape[2], inputShape[0]] : inputShape
      const numClasses = classCount(analysis)
      const lossKind = effectiveLoss(graph, analysis)
      const reconstruction = isReconstruction(graph, analysis)
      const usesEmbedding = graph.nodes.some((node) => node.type === 'embedding')
      const embedding = graph.nodes.find((node) => node.type === 'embedding')
      const vocab = embedding ? embedding.params.vocab : 10000
      const dataset = usesEmbedding ? 'custom' : config.dataset
      const lines = []
      const push = (line) => lines.push(line == null ? '' : line)

      push('"""Train the Keras model generated by Neural Network Studio.')
      push('')
      push('Save the generated model code as model.py next to this script.')
      push('Dataset: ' + dataset + ' | Loss: ' + lossKind + ' | Parameters: ' + formatCount(analysis.totalParams))
      push('"""')
      push('')
      push('import os')
      push('')
      push('os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "2")')
      if (config.device === 'cpu') {
        push('os.environ["CUDA_VISIBLE_DEVICES"] = "-1"')
      }
      push('')
      push('import keras')
      push('import numpy as np')
      push('')
      push('from model import build_model')
      push('')
      push('SEED = ' + config.seed)
      push('BATCH_SIZE = ' + config.batchSize)
      push('EPOCHS = ' + config.epochs)
      push('LEARNING_RATE = ' + config.lr)
      push('NUM_CLASSES = ' + numClasses)
      push('INPUT_SHAPE = (' + kerasInputShape.join(', ') + (kerasInputShape.length === 1 ? ',' : '') + ')')
      if (usesEmbedding) push('VOCAB_SIZE = ' + vocab)
      push('RECONSTRUCTION = ' + (reconstruction ? 'True' : 'False'))
      push('')
      push('keras.utils.set_random_seed(SEED)')
      push('')
      push('')
      push('def load_data():')
      if (dataset === 'mnist' || dataset === 'cifar10') {
        const loader = dataset === 'mnist' ? 'mnist' : 'cifar10'
        push('    (x_train, y_train), (x_test, y_test) = keras.datasets.' + loader + '.load_data()')
        push('    x_train = x_train.reshape(-1, *INPUT_SHAPE).astype("float32") / 255.0')
        push('    x_test = x_test.reshape(-1, *INPUT_SHAPE).astype("float32") / 255.0')
        if (reconstruction) {
          push('    y_train = x_train')
          push('    y_test = x_test')
        }
        push('    return (x_train, y_train), (x_test, y_test)')
      } else {
        push('    # TODO: replace with your tokenized or custom dataset.')
        if (usesEmbedding) {
          push('    x_train = np.random.randint(0, VOCAB_SIZE, (4096, *INPUT_SHAPE)).astype("int32")')
          push('    x_test = np.random.randint(0, VOCAB_SIZE, (1024, *INPUT_SHAPE)).astype("int32")')
        } else {
          push('    x_train = np.random.randn(4096, *INPUT_SHAPE).astype("float32")')
          push('    x_test = np.random.randn(1024, *INPUT_SHAPE).astype("float32")')
        }
        push('    y_train = np.random.randint(0, NUM_CLASSES, (4096,))')
        push('    y_test = np.random.randint(0, NUM_CLASSES, (1024,))')
        if (reconstruction) {
          push('    y_train = x_train')
          push('    y_test = x_test')
        }
        push('    return (x_train, y_train), (x_test, y_test)')
      }
      push('')
      push('')
      push('def main():')
      push('    (x_train, y_train), (x_test, y_test) = load_data()')
      if (lossKind === 'mse' && !reconstruction) {
        push('    y_train = keras.utils.to_categorical(y_train, NUM_CLASSES)')
        push('    y_test = keras.utils.to_categorical(y_test, NUM_CLASSES)')
      }
      push('    model = build_model()')
      const optimizer = {
        adam: 'keras.optimizers.Adam',
        adamw: 'keras.optimizers.AdamW',
        sgd: 'keras.optimizers.SGD',
        rmsprop: 'keras.optimizers.RMSprop',
      }[config.optimizer] || 'keras.optimizers.Adam'
      let lossExpr = 'keras.losses.SparseCategoricalCrossentropy(from_logits=True)'
      if (lossKind === 'probabilities') lossExpr = 'keras.losses.SparseCategoricalCrossentropy(from_logits=False)'
      if (lossKind === 'mse') lossExpr = 'keras.losses.MeanSquaredError()'
      push('    model.compile(')
      push('        optimizer=' + optimizer + '(learning_rate=LEARNING_RATE),')
      push('        loss=' + lossExpr + ',')
      push('        metrics=' + (reconstruction ? '["mae"]' : '["accuracy"]') + ',')
      push('    )')
      push('    model.summary()')
      push('    model.fit(')
      push('        x_train,')
      push('        y_train,')
      push('        batch_size=BATCH_SIZE,')
      push('        epochs=EPOCHS,')
      push('        validation_data=(x_test, y_test),')
      push('    )')
      push('    model.save("model.keras")')
      push('    print("saved model.keras")')
      push('')
      push('')
      push('if __name__ == "__main__":')
      push('    main()')
      push('')
      return lines.join('\n')
    }

    /**
     * Generate the dependency list for a framework.
     * @param framework - `pytorch` or `keras`.
     * @returns requirements text.
     */
    function generateRequirements(framework) {
      if (framework === 'keras') {
        return ['tensorflow>=2.16', '# or keras>=3.0 with a backend of your choice', 'numpy>=1.26', ''].join('\n')
      }
      return ['torch>=2.2', 'torchvision>=0.17', '# torchvision is used for the MNIST / CIFAR-10 loaders', ''].join('\n')
    }

    /**
     * Build the full code document for one framework and section.
     * @param graph - normalized graph.
     * @param analysis - analyze() result.
     * @param framework - `pytorch` or `keras`.
     * @param section - `model`, `train`, or `requirements`.
     * @returns source text, or null when unavailable.
     */
    function generateCode(graph, analysis, framework, section) {
      if (!analysis || !analysis.valid) return null
      try {
        if (section === 'requirements') return generateRequirements(framework)
        if (framework === 'keras') {
          return section === 'train' ? generateKerasTraining(graph, analysis) : generateKerasModel(graph, analysis)
        }
        return section === 'train' ? generatePyTorchTraining(graph, analysis) : generatePyTorchModel(graph, analysis)
      } catch (_generationFailed) {
        return null
      }
    }

    /* ------------------------------------------------------------------ *
     * Templates
     * ------------------------------------------------------------------ */

    /**
     * Build a laid-out graph from a compact layer description.
     * @param name - display name.
     * @param layers - `{ type, title, params, x, y, from }` entries.
     * @returns a normalized graph with stable ids.
     */
    function buildTemplate(name, layers) {
      const nodes = layers.map((layer, index) => ({
        id: 't' + index,
        type: layer.type,
        x: layer.x,
        y: layer.y,
        title: layer.title,
        params: defaultParams(layer.type, layer.params),
      }))
      const edges = []
      layers.forEach((layer, index) => {
        for (const from of layer.from || []) {
          edges.push({ id: 'e' + index + '_' + from, from: 't' + from, to: 't' + index })
        }
      })
      return { name, nodes, edges, training: Object.assign({}, DEFAULT_TRAINING) }
    }

    /**
     * Resolve the template catalog with localized copy.
     * @returns template descriptors and builders.
     */
    function templateCatalog() {
      const t = I18N.t
      const row = (index, y) => ({ x: 60 + index * 230, y: y || 220 })
      return [
        {
          id: 'blank',
          titleKey: 'templates.blank',
          descKey: 'templates.blankDesc',
          build: () => ({ name: t('graph.defaultName'), nodes: [], edges: [], training: Object.assign({}, DEFAULT_TRAINING) }),
        },
        {
          id: 'mlp',
          titleKey: 'templates.mlp.title',
          descKey: 'templates.mlp.desc',
          build: () =>
            buildTemplate(t('templates.mlp.title'), [
              { type: 'input', title: t('node.input') + ' 784', params: { name: 'input', shape: '784' }, ...row(0) },
              { type: 'dense', title: t('node.dense') + ' 256', params: { units: 256, activation: 'relu' }, from: [0], ...row(1) },
              { type: 'dropout', title: t('node.dropout') + ' 0.2', params: { rate: 0.2 }, from: [1], ...row(2) },
              { type: 'dense', title: t('node.dense') + ' 128', params: { units: 128, activation: 'relu' }, from: [2], ...row(3) },
              { type: 'dense', title: t('node.dense') + ' 10', params: { units: 10, activation: 'linear' }, from: [3], ...row(4) },
              { type: 'output', title: t('node.output'), params: { name: 'logits' }, from: [4], ...row(5) },
            ]),
        },
        {
          id: 'cnn',
          titleKey: 'templates.cnn.title',
          descKey: 'templates.cnn.desc',
          build: () =>
            buildTemplate(t('templates.cnn.title'), [
              { type: 'input', title: t('node.input') + ' 1×28×28', params: { name: 'image', shape: '1,28,28' }, ...row(0) },
              { type: 'conv2d', title: t('node.conv2d') + ' 32', params: { filters: 32, kernel: 3, padding: 1, activation: 'relu' }, from: [0], ...row(1) },
              { type: 'maxpool2d', title: t('node.maxpool2d') + ' 2×2', params: { kernel: 2, stride: 2 }, from: [1], ...row(2) },
              { type: 'conv2d', title: t('node.conv2d') + ' 64', params: { filters: 64, kernel: 3, padding: 1, activation: 'relu' }, from: [2], ...row(3) },
              { type: 'maxpool2d', title: t('node.maxpool2d') + ' 2×2', params: { kernel: 2, stride: 2 }, from: [3], ...row(4) },
              { type: 'flatten', title: t('node.flatten'), from: [4], ...row(5) },
              { type: 'dense', title: t('node.dense') + ' 128', params: { units: 128, activation: 'relu' }, from: [5], ...row(6) },
              { type: 'dropout', title: t('node.dropout') + ' 0.5', params: { rate: 0.5 }, from: [6], ...row(7) },
              { type: 'dense', title: t('node.dense') + ' 10', params: { units: 10, activation: 'linear' }, from: [7], ...row(8) },
              { type: 'output', title: t('node.output'), params: { name: 'logits' }, from: [8], ...row(9) },
            ]),
        },
        {
          id: 'resnet',
          titleKey: 'templates.resnet.title',
          descKey: 'templates.resnet.desc',
          build: () =>
            buildTemplate(t('templates.resnet.title'), [
              { type: 'input', title: t('node.input') + ' 1×28×28', params: { name: 'image', shape: '1,28,28' }, ...row(0) },
              { type: 'conv2d', title: t('node.conv2d') + ' 32', params: { filters: 32, kernel: 3, padding: 1, activation: 'linear' }, from: [0], ...row(1) },
              { type: 'batchnorm', title: t('node.batchnorm'), from: [1], ...row(2) },
              { type: 'activation', title: t('node.activation') + ' ' + t('act.relu'), params: { activation: 'relu' }, from: [2], ...row(3) },
              { type: 'conv2d', title: t('node.conv2d') + ' 32 · ' + t('summary.residual'), params: { filters: 32, kernel: 3, padding: 1, activation: 'linear' }, from: [3], ...row(4) },
              { type: 'batchnorm', title: t('node.batchnorm') + ' 2', from: [4], ...row(5) },
              { type: 'add', title: t('node.add') + ' · ' + t('summary.skip'), from: [3, 5], ...row(6) },
              { type: 'activation', title: t('node.activation') + ' ' + t('act.relu') + ' 2', params: { activation: 'relu' }, from: [6], ...row(7) },
              { type: 'maxpool2d', title: t('node.maxpool2d'), params: { kernel: 2, stride: 2 }, from: [7], ...row(8) },
              { type: 'flatten', title: t('node.flatten'), from: [8], ...row(9) },
              { type: 'dense', title: t('node.dense') + ' 10', params: { units: 10, activation: 'linear' }, from: [9], ...row(10) },
              { type: 'output', title: t('node.output'), params: { name: 'logits' }, from: [10], ...row(11) },
            ]),
        },
        {
          id: 'lstm',
          titleKey: 'templates.lstm.title',
          descKey: 'templates.lstm.desc',
          build: () =>
            buildTemplate(t('templates.lstm.title'), [
              { type: 'input', title: t('node.input') + ' tokens', params: { name: 'tokens', shape: '32' }, ...row(0) },
              { type: 'embedding', title: t('node.embedding') + ' 128', params: { vocab: 10000, dim: 128 }, from: [0], ...row(1) },
              { type: 'lstm', title: t('node.lstm') + ' 128', params: { hidden: 128, layers: 1, returnSequences: false }, from: [1], ...row(2) },
              { type: 'dense', title: t('node.dense') + ' 10', params: { units: 10, activation: 'linear' }, from: [2], ...row(3) },
              { type: 'output', title: t('node.output'), params: { name: 'logits' }, from: [3], ...row(4) },
            ]),
        },
        {
          id: 'autoencoder',
          titleKey: 'templates.autoencoder.title',
          descKey: 'templates.autoencoder.desc',
          build: () =>
            buildTemplate(t('templates.autoencoder.title'), [
              { type: 'input', title: t('node.input') + ' 784', params: { name: 'input', shape: '784' }, ...row(0) },
              { type: 'dense', title: t('node.dense') + ' 64', params: { units: 64, activation: 'relu' }, from: [0], ...row(1) },
              { type: 'dense', title: t('node.dense') + ' 16', params: { units: 16, activation: 'relu' }, from: [1], ...row(2) },
              { type: 'dense', title: t('node.dense') + ' 64', params: { units: 64, activation: 'relu' }, from: [2], ...row(3) },
              { type: 'dense', title: t('node.dense') + ' 784', params: { units: 784, activation: 'sigmoid' }, from: [3], ...row(4) },
              { type: 'output', title: t('node.output'), params: { name: 'reconstruction' }, from: [4], ...row(5) },
            ]),
        },
      ]
    }

    /* ------------------------------------------------------------------ *
     * Graph mutations
     * ------------------------------------------------------------------ */

    /**
     * Replace one node with a patched clone.
     * @param graph - current graph.
     * @param id - node id.
     * @param patch - shallow node fields to replace.
     * @returns a new graph.
     */
    function patchNode(graph, id, patch) {
      return Object.assign({}, graph, {
        nodes: graph.nodes.map((node) => (node.id === id ? Object.assign({}, node, patch) : node)),
      })
    }

    /**
     * Add a node and optionally connect it from an existing node.
     * @param graph - current graph.
     * @param node - new node.
     * @param fromId - optional source node id.
     * @returns a new graph.
     */
    function addNode(graph, node, fromId) {
      const next = Object.assign({}, graph, { nodes: graph.nodes.concat(node) })
      if (fromId && graph.nodes.some((entry) => entry.id === fromId)) {
        next.edges = graph.edges.concat({ id: makeId('e'), from: fromId, to: node.id })
      }
      return next
    }

    /**
     * Remove a node and every edge attached to it.
     * @param graph - current graph.
     * @param id - node id.
     * @returns a new graph.
     */
    function removeNode(graph, id) {
      return Object.assign({}, graph, {
        nodes: graph.nodes.filter((node) => node.id !== id),
        edges: graph.edges.filter((edge) => edge.from !== id && edge.to !== id),
      })
    }

    /**
     * Remove one edge.
     * @param graph - current graph.
     * @param id - edge id.
     * @returns a new graph.
     */
    function removeEdge(graph, id) {
      return Object.assign({}, graph, { edges: graph.edges.filter((edge) => edge.id !== id) })
    }

    /**
     * Duplicate a node next to itself, preserving parameters but not edges.
     * @param graph - current graph.
     * @param id - node id.
     * @returns a new graph.
     */
    function duplicateNode(graph, id) {
      const source = graph.nodes.find((node) => node.id === id)
      if (!source) return graph
      const copy = {
        id: makeId('n'),
        type: source.type,
        x: source.x + 32,
        y: source.y + 32,
        title: source.title + ' ' + I18N.t('inspector.duplicate'),
        params: Object.assign({}, source.params),
      }
      return Object.assign({}, graph, { nodes: graph.nodes.concat(copy) })
    }

    /**
     * Report whether `from` already reaches `to`, which makes a new edge cyclic.
     * @param graph - current graph.
     * @param from - candidate source id.
     * @param to - candidate target id.
     * @returns true when the target already feeds the source.
     */
    function wouldCycle(graph, from, to) {
      if (from === to) return true
      const adjacency = new Map()
      for (const node of graph.nodes) adjacency.set(node.id, [])
      for (const edge of graph.edges) {
        if (!adjacency.has(edge.from)) continue
        adjacency.get(edge.from).push(edge.to)
      }
      const stack = [to]
      const seen = new Set()
      while (stack.length) {
        const id = stack.pop()
        if (id === from) return true
        if (seen.has(id)) continue
        seen.add(id)
        for (const next of adjacency.get(id) || []) stack.push(next)
      }
      return false
    }

    /**
     * Append an edge when the pair is legal.
     * @param graph - current graph.
     * @param from - source node id.
     * @param to - target node id.
     * @returns `{ graph, reason }` where reason is null on success.
     */
    function connectNodes(graph, from, to) {
      if (from === to) return { graph, reason: 'toast.selfEdge' }
      if (graph.edges.some((edge) => edge.from === from && edge.to === to)) return { graph, reason: 'toast.duplicateEdge' }
      const target = graph.nodes.find((node) => node.id === to)
      if (!target) return { graph, reason: null }
      if (target.type !== 'add' && target.type !== 'concat' && graph.edges.some((edge) => edge.to === to)) {
        return { graph, reason: 'toast.inputBusy' }
      }
      if (wouldCycle(graph, from, to)) return { graph, reason: 'toast.cycle' }
      return { graph: Object.assign({}, graph, { edges: graph.edges.concat({ id: makeId('e'), from, to }) }), reason: null }
    }

    /**
     * Restore a graph snapshot through normalization.
     * @param snapshot - graph or untrusted payload.
     * @returns a normalized graph or null.
     */
    function restoreGraph(snapshot) {
      const normalized = normalizeGraph(snapshot)
      if (!normalized) return null
      return normalized
    }

    /* ------------------------------------------------------------------ *
     * Styles
     * ------------------------------------------------------------------ */

    const CSS = `
.nn-studio { position: relative; display: flex; flex-direction: column; height: 100%; min-height: 460px;
  background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); font-size: 13px; line-height: 1.45;
  overflow: hidden; }
.nn-studio *, .nn-studio *::before, .nn-studio *::after { box-sizing: border-box; }
.nn-header { display: flex; align-items: center; gap: 8px; padding: 8px 12px; flex: 0 0 auto; flex-wrap: wrap;
  border-bottom: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1); }
.nn-brand { display: flex; align-items: center; gap: 9px; flex: 1 1 260px; min-width: 0; }
.nn-brand-mark { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; flex: 0 0 30px;
  border-radius: 9px; color: #3b82f6; background: rgba(59, 130, 246, 0.14); }
.nn-brand-text { display: flex; flex-direction: column; min-width: 0; flex: 1 1 auto; }
.nn-name { width: 100%; max-width: 300px; height: 24px; padding: 0 5px; margin-left: -5px; border-radius: 6px;
  border: 1px solid transparent; background: transparent; color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 14px; font-weight: 600; }
.nn-name:hover { border-color: var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base); }
.nn-name:focus { outline: none; border-color: var(--dsw-alias-brand-primary); background: var(--dsw-alias-bg-base); }
.nn-brand-meta { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--dsw-alias-label-secondary);
  white-space: nowrap; overflow: hidden; }
.nn-toolbar { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
.nn-btn { display: inline-flex; align-items: center; justify-content: center; gap: 5px; height: 28px; padding: 0 9px;
  border-radius: 7px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px; white-space: nowrap; cursor: pointer; }
.nn-btn:hover:not([disabled]) { border-color: var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); }
.nn-btn[disabled] { opacity: 0.42; cursor: default; }
.nn-btn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.nn-btn.is-icon { width: 28px; padding: 0; flex: 0 0 28px; }
.nn-btn.is-ghost { border-color: transparent; background: transparent; color: var(--dsw-alias-label-secondary); }
.nn-btn.is-ghost:hover:not([disabled]) { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); }
.nn-btn.is-active { color: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); }
.nn-btn.is-primary { border-color: transparent; background: var(--dsw-alias-brand-primary); color: #fff; }
.nn-btn.is-primary:hover:not([disabled]) { background: var(--dsw-alias-brand-primary); filter: brightness(1.07); }
.nn-badge { display: inline-flex; align-items: center; gap: 5px; padding: 1px 7px; border-radius: 999px;
  border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary); font-size: 10.5px; white-space: nowrap; }
.nn-badge.is-ok { color: var(--dsw-alias-state-success-primary); border-color: currentColor; }
.nn-badge.is-warn { color: var(--dsw-alias-state-warn-primary); border-color: currentColor; }
.nn-badge.is-error { color: var(--dsw-alias-state-error-primary); border-color: currentColor; }
.nn-badge.is-button { cursor: pointer; font: inherit; font-size: 10.5px; }
.nn-body { display: flex; flex: 1 1 auto; min-height: 0; }
.nn-palette { display: flex; flex-direction: column; flex: 0 0 214px; width: 214px; min-height: 0;
  border-right: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-specific-sidebar-fill); }
.nn-palette-head { display: flex; align-items: center; gap: 6px; padding: 10px 10px 6px 12px; flex: 0 0 auto; }
.nn-palette-title { flex: 1 1 auto; font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em;
  color: var(--dsw-alias-label-secondary); }
.nn-search { margin: 0 10px 8px; height: 28px; }
.nn-palette-scroll { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 0 7px 14px; }
.nn-group { margin-top: 9px; }
.nn-group-title { padding: 0 6px 4px; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.07em;
  color: var(--dsw-alias-label-secondary); }
.nn-pal-btn { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border-radius: 7px;
  border: 1px solid transparent; background: transparent; color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 12.5px; text-align: left; cursor: pointer; }
.nn-pal-btn:hover { border-color: var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); }
.nn-pal-btn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: -1px; }
.nn-pal-glyph { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px;
  flex: 0 0 24px; border-radius: 6px; color: var(--nn-accent); background: var(--dsw-alias-bg-layer-2); }
.nn-pal-empty { padding: 18px 12px; font-size: 12px; color: var(--dsw-alias-label-secondary); text-align: center; }
.nn-pal-hint { padding: 9px 12px; border-top: 1px solid var(--dsw-alias-border-l1); font-size: 10.5px;
  line-height: 1.5; color: var(--dsw-alias-label-secondary); flex: 0 0 auto; }
.nn-canvas { position: relative; flex: 1 1 auto; min-width: 0; min-height: 0; overflow: hidden; cursor: grab;
  background-color: var(--dsw-alias-bg-base); background-image: radial-gradient(circle, var(--dsw-alias-border-l1) 1px, transparent 1px);
  touch-action: none; }
.nn-canvas.is-panning { cursor: grabbing; }
.nn-canvas.is-connecting { cursor: crosshair; }
.nn-world { position: absolute; left: 0; top: 0; transform-origin: 0 0; }
.nn-edges { position: absolute; overflow: visible; pointer-events: none; }
.nn-edge { fill: none; stroke-width: 1.8; vector-effect: non-scaling-stroke; opacity: 0.85; pointer-events: none; }
.nn-edge.is-selected { stroke-width: 2.8; opacity: 1; }
.nn-edge-hit { fill: none; stroke: transparent; stroke-width: 14; vector-effect: non-scaling-stroke;
  pointer-events: stroke; cursor: pointer; }
.nn-connect-layer { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 4; }
.nn-node { position: absolute; height: ${NODE_H}px; border-radius: 10px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); cursor: grab;
  user-select: none; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.10); z-index: 2; overflow: visible; }
.nn-node::before { content: ''; position: absolute; left: 0; top: 10px; bottom: 10px; width: 3px;
  border-radius: 3px; background: var(--nn-accent); opacity: 0.9; }
.nn-node:hover { border-color: var(--dsw-alias-border-l2); }
.nn-node.is-selected { border-color: var(--dsw-alias-brand-primary); box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary), 0 4px 14px rgba(0, 0, 0, 0.14); }
.nn-node.is-error { border-color: var(--dsw-alias-state-error-primary); }
.nn-node.is-dragging { cursor: grabbing; box-shadow: 0 10px 26px rgba(0, 0, 0, 0.22); z-index: 3; }
.nn-node-head { display: flex; align-items: center; gap: 6px; padding: 6px 9px 4px 11px; min-width: 0; }
.nn-node-glyph { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px;
  flex: 0 0 20px; border-radius: 5px; color: var(--nn-accent); background: var(--dsw-alias-bg-layer-2); }
.nn-node-title { flex: 1 1 auto; min-width: 0; font-size: 12px; font-weight: 600; overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap; }
.nn-node-type { flex: 0 0 auto; font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.04em;
  color: var(--dsw-alias-label-secondary); }
.nn-node-body { padding: 0 11px; font-size: 11px; color: var(--dsw-alias-label-secondary); overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap; }
.nn-node-foot { display: flex; align-items: center; gap: 6px; padding: 5px 11px 0; font-size: 10.5px; min-width: 0; }
.nn-node-shape { font-family: ${MONO}; padding: 0 5px; border-radius: 4px; background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary); max-width: 118px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.nn-node-shape.is-bad { color: var(--dsw-alias-state-error-primary); }
.nn-node-params { margin-left: auto; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
.nn-node-alert { position: absolute; top: -8px; right: -8px; width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; background: var(--dsw-alias-state-error-primary);
  color: #fff; font-size: 11px; font-weight: 700; border: 2px solid var(--dsw-alias-bg-base); }
.nn-port { position: absolute; top: calc(50% - 11px); width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; cursor: crosshair; z-index: 3; }
.nn-port::after { content: ''; width: 9px; height: 9px; border-radius: 50%; border: 2px solid var(--nn-accent);
  background: var(--dsw-alias-bg-base); transition: transform 0.1s ease, background 0.1s ease; }
.nn-port:hover::after { transform: scale(1.32); background: var(--nn-accent); }
.nn-port.is-in { left: -12px; }
.nn-port.is-out { right: -12px; }
.nn-port.is-disabled { display: none; }
.nn-canvas-empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  padding: 24px; pointer-events: none; }
.nn-empty-card { display: flex; flex-direction: column; align-items: center; gap: 9px; max-width: 380px;
  padding: 26px 28px; border-radius: 14px; border: 1px dashed var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-layer-1); text-align: center; pointer-events: auto; }
.nn-empty-card svg { color: var(--dsw-alias-border-l2); }
.nn-empty-card strong { font-size: 14px; font-weight: 600; }
.nn-empty-card p { margin: 0; font-size: 12px; line-height: 1.6; color: var(--dsw-alias-label-secondary); }
.nn-canvas-chrome { position: absolute; right: 12px; bottom: 12px; display: flex; align-items: center; gap: 2px;
  padding: 3px; border-radius: 9px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-overlay); box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12); z-index: 5; }
.nn-zoom-label { min-width: 42px; text-align: center; font-size: 11px; color: var(--dsw-alias-label-secondary);
  font-variant-numeric: tabular-nums; }
.nn-connecting-chip { position: absolute; left: 12px; top: 12px; z-index: 5; display: flex; align-items: center; gap: 6px;
  padding: 5px 10px; border-radius: 999px; font-size: 11px; color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-overlay); border: 1px solid var(--dsw-alias-border-l1); box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1); }
.nn-inspector { display: flex; flex-direction: column; flex: 0 0 330px; width: 330px; min-height: 0;
  border-left: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1); }
.nn-inspector.is-wide { flex-basis: 452px; width: 452px; }
.nn-tabs { display: flex; flex: 0 0 auto; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.nn-tab { flex: 1 1 auto; height: 34px; border: 0; border-bottom: 2px solid transparent; background: transparent;
  color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11.5px; cursor: pointer; white-space: nowrap; }
.nn-tab:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); }
.nn-tab.is-active { color: var(--dsw-alias-label-primary); border-bottom-color: var(--dsw-alias-brand-primary); }
.nn-tab-count { display: inline-flex; align-items: center; justify-content: center; min-width: 15px; height: 15px;
  margin-left: 4px; padding: 0 4px; border-radius: 999px; background: var(--dsw-alias-state-error-primary);
  color: #fff; font-size: 9.5px; }
.nn-side-body { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 12px; }
.nn-eyebrow { display: flex; align-items: center; gap: 6px; font-size: 10.5px; text-transform: uppercase;
  letter-spacing: 0.07em; color: var(--dsw-alias-label-secondary); }
.nn-node-preview { display: flex; align-items: center; gap: 9px; padding-bottom: 10px; margin-bottom: 12px;
  border-bottom: 1px solid var(--dsw-alias-border-l1); }
.nn-node-preview-glyph { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px;
  border-radius: 9px; color: var(--nn-accent); background: var(--dsw-alias-bg-layer-2); flex: 0 0 34px; }
.nn-node-preview-text { min-width: 0; flex: 1 1 auto; }
.nn-node-preview-name { font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.nn-field { margin-bottom: 11px; }
.nn-field:last-child { margin-bottom: 0; }
.nn-field-label { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;
  font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
.nn-field-hint { margin-top: 4px; font-size: 10.5px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }
.nn-input, .nn-select { width: 100%; height: 30px; padding: 0 8px; border-radius: 7px;
  border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary); font: inherit; font-size: 12.5px; }
.nn-input:hover, .nn-select:hover { border-color: var(--dsw-alias-border-l2); }
.nn-input:focus, .nn-select:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
.nn-input.is-mono { font-family: ${MONO}; font-size: 12px; }
.nn-toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 8px;
  min-height: 30px; }
.nn-toggle-label { font-size: 12px; color: var(--dsw-alias-label-primary); }
.nn-switch { position: relative; width: 34px; height: 20px; flex: 0 0 34px; padding: 0; border-radius: 999px;
  border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); cursor: pointer; }
.nn-switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px;
  border-radius: 50%; background: var(--dsw-alias-label-secondary); transition: left 0.12s ease, background 0.12s ease; }
.nn-switch[aria-checked='true'] { background: var(--dsw-alias-brand-primary); border-color: transparent; }
.nn-switch[aria-checked='true']::after { left: 16px; background: #fff; }
.nn-switch:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.nn-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0; }
.nn-meta-item { padding: 7px 9px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base); min-width: 0; }
.nn-meta-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dsw-alias-label-secondary); }
.nn-meta-value { margin-top: 2px; font-size: 12.5px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.nn-meta-value.is-mono { font-family: ${MONO}; font-size: 11.5px; font-weight: 500; }
.nn-note { display: flex; align-items: flex-start; gap: 7px; padding: 8px 10px; margin: 10px 0; border-radius: 8px;
  font-size: 11.5px; line-height: 1.55; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-secondary); }
.nn-note.is-error { border-color: var(--dsw-alias-state-error-primary); color: var(--dsw-alias-state-error-primary); }
.nn-note.is-ok { border-color: var(--dsw-alias-state-success-primary); color: var(--dsw-alias-state-success-primary); }
.nn-note.is-warn { border-color: var(--dsw-alias-state-warn-primary); color: var(--dsw-alias-state-warn-primary); }
.nn-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 14px; }
.nn-actions .nn-btn { flex: 1 1 auto; }
.nn-danger { color: var(--dsw-alias-state-error-primary); border-color: var(--dsw-alias-state-error-primary); }
.nn-danger:hover:not([disabled]) { background: var(--dsw-alias-state-error-primary); color: #fff; border-color: transparent; }
.nn-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  padding: 34px 18px; text-align: center; color: var(--dsw-alias-label-secondary); }
.nn-empty svg { color: var(--dsw-alias-border-l2); }
.nn-empty strong { color: var(--dsw-alias-label-primary); font-size: 13.5px; font-weight: 600; }
.nn-empty p { margin: 0; font-size: 11.5px; line-height: 1.6; }
.nn-shortcuts { margin-top: 16px; border-top: 1px solid var(--dsw-alias-border-l1); padding-top: 12px; }
.nn-shortcuts-title { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em;
  color: var(--dsw-alias-label-secondary); margin-bottom: 6px; }
.nn-shortcut { display: flex; justify-content: space-between; gap: 8px; padding: 3px 0; font-size: 11px;
  color: var(--dsw-alias-label-secondary); }
.nn-shortcut kbd { font-family: ${MONO}; font-size: 10px; padding: 0 4px; border-radius: 4px;
  border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); }
.nn-issue-group { margin-top: 14px; }
.nn-issue-group-title { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; font-size: 11px;
  font-weight: 600; color: var(--dsw-alias-label-secondary); }
.nn-issue { display: flex; align-items: flex-start; gap: 7px; width: 100%; padding: 7px 8px; margin-bottom: 4px;
  border-radius: 7px; border: 1px solid transparent; background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary); font: inherit; font-size: 11.5px; line-height: 1.5; text-align: left; cursor: pointer; }
.nn-issue:hover { border-color: var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); }
.nn-issue-dot { width: 7px; height: 7px; margin-top: 5px; border-radius: 50%; flex: 0 0 7px;
  background: var(--dsw-alias-state-error-primary); }
.nn-issue.is-warn .nn-issue-dot { background: var(--dsw-alias-state-warn-primary); }
.nn-issue-text { flex: 1 1 auto; min-width: 0; }
.nn-issue-node { display: block; margin-top: 2px; font-size: 10px; color: var(--dsw-alias-label-secondary); }
.nn-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
.nn-stat { padding: 8px 10px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base); min-width: 0; }
.nn-stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dsw-alias-label-secondary); }
.nn-stat-value { margin-top: 2px; font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.nn-section { margin-top: 16px; }
.nn-section-title { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 7px;
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--dsw-alias-label-secondary); }
.nn-table-wrap { border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; overflow: auto; background: var(--dsw-alias-bg-base); }
.nn-table { width: 100%; border-collapse: collapse; font-size: 11px; }
.nn-table th { position: sticky; top: 0; z-index: 1; padding: 5px 7px; text-align: left; font-weight: 500;
  color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1);
  border-bottom: 1px solid var(--dsw-alias-border-l1); white-space: nowrap; }
.nn-table td { padding: 5px 7px; border-bottom: 1px solid var(--dsw-alias-border-l1); white-space: nowrap; }
.nn-table tbody tr:last-child td { border-bottom: 0; }
.nn-table tbody tr { cursor: pointer; }
.nn-table tbody tr:hover { background: var(--dsw-alias-bg-layer-2); }
.nn-table td.is-mono { font-family: ${MONO}; font-size: 10.5px; }
.nn-table td.is-num { text-align: right; font-variant-numeric: tabular-nums; }
.nn-table td.is-error { color: var(--dsw-alias-state-error-primary); }
.nn-code-wrap { display: flex; flex-direction: column; gap: 8px; min-height: 0; }
.nn-code-controls { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
.nn-segment { display: inline-flex; padding: 2px; border-radius: 7px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base); }
.nn-segment button { height: 24px; padding: 0 8px; border: 0; border-radius: 5px; background: transparent;
  color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11px; cursor: pointer; }
.nn-segment button.is-active { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.nn-code-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 10.5px;
  color: var(--dsw-alias-label-secondary); }
.nn-code { margin: 0; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base); font-family: ${MONO}; font-size: 11px; line-height: 1.6;
  white-space: pre; overflow: auto; max-height: 62vh; }
.nn-footer { display: flex; align-items: center; gap: 10px; flex: 0 0 auto; height: 26px; padding: 0 12px;
  border-top: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1);
  font-size: 10.5px; color: var(--dsw-alias-label-secondary); overflow: hidden; }
.nn-footer .nn-grow { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.nn-footer-item { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
.nn-status-btn { display: inline-flex; align-items: center; gap: 5px; height: 18px; padding: 0 6px;
  border-radius: 999px; border: 1px solid transparent; background: transparent; font: inherit; font-size: 10.5px;
  color: inherit; cursor: pointer; }
.nn-status-btn:hover { background: var(--dsw-alias-bg-layer-2); }
.nn-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--dsw-alias-state-success-primary); }
.nn-status-dot.is-error { background: var(--dsw-alias-state-error-primary); }
.nn-status-dot.is-warn { background: var(--dsw-alias-state-warn-primary); }
.nn-modal-backdrop { position: absolute; inset: 0; z-index: 20; display: flex; align-items: center;
  justify-content: center; padding: 24px; background: rgba(0, 0, 0, 0.42); }
.nn-modal { width: min(780px, 100%); max-height: 84%; overflow: auto; padding: 20px;
  border-radius: 14px; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-1);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35); }
.nn-modal-head { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; }
.nn-modal-title { font-size: 15px; font-weight: 600; }
.nn-modal-sub { margin-top: 3px; font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
.nn-modal-close { margin-left: auto; }
.nn-template-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(214px, 1fr)); gap: 10px; }
.nn-template { display: flex; flex-direction: column; align-items: flex-start; gap: 5px; padding: 12px;
  border-radius: 10px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary); font: inherit; text-align: left; cursor: pointer; }
.nn-template:hover { border-color: var(--dsw-alias-brand-primary); background: var(--dsw-alias-bg-layer-2); }
.nn-template:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.nn-template-icon { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px;
  border-radius: 8px; color: #3b82f6; background: rgba(59, 130, 246, 0.13); }
.nn-template-title { font-size: 12.5px; font-weight: 600; }
.nn-template-desc { font-size: 11px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }
.nn-template-meta { margin-top: 2px; font-size: 10px; color: var(--dsw-alias-label-secondary); }
.nn-toast { position: absolute; left: 50%; bottom: 42px; z-index: 30; transform: translateX(-50%);
  display: flex; align-items: center; gap: 8px; max-width: 76%; padding: 8px 14px; border-radius: 9px;
  border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-overlay);
  color: var(--dsw-alias-label-primary); box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
  font-size: 12px; animation: nn-toast-in 0.14s ease-out; }
.nn-toast.is-error { border-color: var(--dsw-alias-state-error-primary); }
.nn-toast.is-success { border-color: var(--dsw-alias-state-success-primary); }
@keyframes nn-toast-in { from { opacity: 0; transform: translate(-50%, 6px); } to { opacity: 1; transform: translate(-50%, 0); } }
.nn-boundary { display: flex; align-items: center; justify-content: center; height: 100%; min-height: 300px;
  padding: 30px; text-align: center; color: var(--dsw-alias-state-error-primary); background: var(--dsw-alias-bg-base); }
@media (max-width: 1180px) {
  .nn-palette { flex-basis: 190px; width: 190px; }
  .nn-inspector { flex-basis: 300px; width: 300px; }
  .nn-inspector.is-wide { flex-basis: 380px; width: 380px; }
}
@media (max-width: 860px) {
  .nn-inspector { flex-basis: 276px; width: 276px; }
  .nn-inspector.is-wide { flex-basis: 320px; width: 320px; }
  .nn-palette { flex-basis: 176px; width: 176px; }
  .nn-brand { flex-basis: 180px; }
}
`
    /* ------------------------------------------------------------------ *
     * Icons and controls
     * ------------------------------------------------------------------ */

    /**
     * Render a small layer-type glyph.
     * @param props - `type` and optional `size`.
     * @returns an SVG glyph in currentColor.
     */
    function TypeGlyph(props) {
      const type = props.type
      const size = props.size || 18
      const common = {
        viewBox: '0 0 24 24',
        width: size,
        height: size,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        focusable: 'false',
        style: { display: 'block' },
      }
      switch (type) {
        case 'input':
          return h('svg', common, h('rect', { x: 3, y: 4, width: 11, height: 16, rx: 2 }), h('path', { d: 'M14 12h7m-3-3 3 3-3 3' }))
        case 'output':
          return h('svg', common, h('path', { d: 'M3 12h7m-3-3 3 3-3 3' }), h('rect', { x: 11, y: 4, width: 10, height: 16, rx: 2 }))
        case 'dense':
          return h(
            'svg',
            common,
            h('circle', { cx: 5, cy: 6, r: 1.5 }),
            h('circle', { cx: 5, cy: 12, r: 1.5 }),
            h('circle', { cx: 5, cy: 18, r: 1.5 }),
            h('circle', { cx: 19, cy: 8, r: 1.5 }),
            h('circle', { cx: 19, cy: 16, r: 1.5 }),
            h('path', { d: 'M6.5 6 17.5 8M6.5 12l11-4M6.5 12l11 4M6.5 18l11-2M6.5 6l11 10M6.5 18l11-10', opacity: 0.55 }),
          )
        case 'conv2d':
          return h(
            'svg',
            common,
            h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
            h('path', { d: 'M9 3v18M15 3v18M3 9h18M3 15h18', opacity: 0.6 }),
            h('rect', { x: 9, y: 9, width: 6, height: 6, rx: 1 }),
          )
        case 'maxpool2d':
          return h(
            'svg',
            common,
            h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
            h('path', { d: 'M9 3v18M15 3v18M3 9h18M3 15h18', opacity: 0.45 }),
            h('path', { d: 'M6 6l4 4M10 10V6.5M10 10H6.5', strokeWidth: 2 }),
          )
        case 'avgpool2d':
          return h(
            'svg',
            common,
            h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
            h('path', { d: 'M3 9h18M3 15h18M9 3v18M15 3v18', opacity: 0.45 }),
            h('path', { d: 'M6 8c2-2 4-2 6 0s4 2 6 0', strokeWidth: 1.8 }),
          )
        case 'flatten':
          return h(
            'svg',
            common,
            h('path', { d: 'M4 5h16M5 9h14M7 13h10M9 17h6M11 21h2' }),
          )
        case 'dropout':
          return h(
            'svg',
            common,
            h('circle', { cx: 6, cy: 6, r: 1.4 }),
            h('circle', { cx: 12, cy: 6, r: 1.4, opacity: 0.3 }),
            h('circle', { cx: 18, cy: 6, r: 1.4 }),
            h('circle', { cx: 6, cy: 12, r: 1.4, opacity: 0.3 }),
            h('circle', { cx: 12, cy: 12, r: 1.4 }),
            h('circle', { cx: 18, cy: 12, r: 1.4, opacity: 0.3 }),
            h('circle', { cx: 6, cy: 18, r: 1.4 }),
            h('circle', { cx: 12, cy: 18, r: 1.4, opacity: 0.3 }),
            h('circle', { cx: 18, cy: 18, r: 1.4 }),
          )
        case 'batchnorm':
          return h(
            'svg',
            common,
            h('path', { d: 'M4 6h16M4 12h16M4 18h16', opacity: 0.5 }),
            h('path', { d: 'M8 3v18M16 3v18', strokeDasharray: '2 2' }),
            h('circle', { cx: 12, cy: 12, r: 2.2 }),
          )
        case 'activation':
          return h('svg', common, h('path', { d: 'M3 19h4c2 0 2-14 4-14s2 8 4 8h6' }))
        case 'embedding':
          return h(
            'svg',
            common,
            h('rect', { x: 3, y: 4, width: 18, height: 16, rx: 2 }),
            h('path', { d: 'M7 8h2M12 8h2M17 8h1M7 12h2M12 12h2M17 12h1M7 16h2M12 16h2M17 16h1', opacity: 0.75 }),
          )
        case 'lstm':
          return h(
            'svg',
            common,
            h('path', { d: 'M4 12h5M15 12h5' }),
            h('path', { d: 'M9 7h6v10H9z' }),
            h('path', { d: 'M12 7V4m0 13v3M7 4h10M7 20h10', opacity: 0.55 }),
          )
        case 'add':
          return h('svg', common, h('circle', { cx: 12, cy: 12, r: 8 }), h('path', { d: 'M12 8v8M8 12h8' }))
        case 'concat':
          return h('svg', common, h('path', { d: 'M3 7h7l3 5 3-5h5M3 17h7l3-5 3 5h5' }))
        default:
          return h('svg', common, h('rect', { x: 4, y: 4, width: 16, height: 16, rx: 3 }))
      }
    }

    /**
     * Render the sidebar panel icon.
     * @param props - owner-supplied size and active state.
     * @returns the icon SVG.
     */
    function SidebarIcon(props) {
      const size = Math.max(14, Math.min(26, (props && props.size) || 18))
      const active = Boolean(props && props.active)
      return h(
        'svg',
        {
          viewBox: '0 0 64 64',
          width: size,
          height: size,
          'aria-hidden': true,
          focusable: 'false',
          style: { display: 'block', opacity: active ? 1 : 0.72 },
        },
        h('path', {
          d: 'M15 17l18 15M15 32h18M15 47l18-15M33 17l13 15M33 32h13M33 47l13-15',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 3,
          strokeLinecap: 'round',
          opacity: 0.55,
        }),
        h('circle', { cx: 15, cy: 17, r: 3.4, fill: 'currentColor' }),
        h('circle', { cx: 15, cy: 32, r: 3.4, fill: 'currentColor' }),
        h('circle', { cx: 15, cy: 47, r: 3.4, fill: 'currentColor' }),
        h('circle', { cx: 33, cy: 17, r: 3.4, fill: 'currentColor' }),
        h('circle', { cx: 33, cy: 32, r: 3.4, fill: 'currentColor' }),
        h('circle', { cx: 33, cy: 47, r: 3.4, fill: 'currentColor' }),
        h('circle', { cx: 49, cy: 26, r: 3.6, fill: 'currentColor' }),
        h('circle', { cx: 49, cy: 38, r: 3.6, fill: 'currentColor' }),
      )
    }

    /**
     * Render one inline icon.
     * @param props - `name`, optional `size`.
     * @returns the SVG icon.
     */
    function Icon(props) {
      const size = props.size || 15
      const common = {
        viewBox: '0 0 24 24',
        width: size,
        height: size,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        focusable: 'false',
        style: { display: 'block', flex: '0 0 auto' },
      }
      switch (props.name) {
        case 'undo':
          return h('svg', common, h('path', { d: 'M9 7 4 12l5 5' }), h('path', { d: 'M4 12h9a6 6 0 0 1 6 6' }))
        case 'redo':
          return h('svg', common, h('path', { d: 'M15 7l5 5-5 5' }), h('path', { d: 'M20 12h-9a6 6 0 0 0-6 6' }))
        case 'plus':
          return h('svg', common, h('path', { d: 'M12 5v14M5 12h14' }))
        case 'minus':
          return h('svg', common, h('path', { d: 'M5 12h14' }))
        case 'fit':
          return h('svg', common, h('path', { d: 'M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4' }))
        case 'template':
          return h('svg', common, h('rect', { x: 3, y: 4, width: 18, height: 16, rx: 2 }), h('path', { d: 'M3 9h18M9 9v11' }))
        case 'import':
          return h('svg', common, h('path', { d: 'M12 3v12m-4-4 4 4 4-4M4 17v3h16v-3' }))
        case 'export':
          return h('svg', common, h('path', { d: 'M12 16V4m-4 4 4-4 4 4M4 17v3h16v-3' }))
        case 'trash':
          return h('svg', common, h('path', { d: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13' }))
        case 'copy':
          return h('svg', common, h('rect', { x: 8, y: 8, width: 12, height: 12, rx: 2 }), h('path', { d: 'M16 8V4H4v12h4' }))
        case 'close':
          return h('svg', common, h('path', { d: 'M6 6l12 12M18 6 6 18' }))
        case 'check':
          return h('svg', common, h('path', { d: 'M4 12l5 5L20 6' }))
        case 'warn':
          return h('svg', common, h('path', { d: 'M12 4 2.5 20h19z' }), h('path', { d: 'M12 9v5M12 17v.5' }))
        case 'search':
          return h('svg', common, h('circle', { cx: 10.5, cy: 10.5, r: 6.5 }), h('path', { d: 'M15.5 15.5 21 21' }))
        case 'panelLeft':
          return h('svg', common, h('rect', { x: 3, y: 4, width: 18, height: 16, rx: 2 }), h('path', { d: 'M9 4v16' }))
        case 'panelRight':
          return h('svg', common, h('rect', { x: 3, y: 4, width: 18, height: 16, rx: 2 }), h('path', { d: 'M15 4v16' }))
        case 'download':
          return h('svg', common, h('path', { d: 'M12 3v12m-4-4 4 4 4-4M4 20h16' }))
        case 'spark':
          return h('svg', common, h('path', { d: 'M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8' }))
        default:
          return h('svg', common, h('circle', { cx: 12, cy: 12, r: 8 }))
      }
    }

    /**
     * Render a compact button with optional icon.
     * @param props - `icon`, `label`, `title`, `onClick`, `disabled`, `variant`, `active`.
     * @returns the button element.
     */
    function Button(props) {
      const classes = ['nn-btn']
      if (props.variant === 'icon') classes.push('is-icon')
      if (props.variant === 'ghost') classes.push('is-ghost')
      if (props.variant === 'primary') classes.push('is-primary')
      if (props.active) classes.push('is-active')
      if (props.danger) classes.push('nn-danger')
      if (props.className) classes.push(props.className)
      return h(
        'button',
        {
          type: 'button',
          className: classes.join(' '),
          title: props.title || props.label || undefined,
          'aria-label': props.title || props.label || undefined,
          disabled: Boolean(props.disabled),
          onClick: props.onClick,
          'aria-pressed': props.pressed === undefined ? undefined : Boolean(props.pressed),
        },
        props.icon ? h(Icon, { name: props.icon, size: props.iconSize || 15 }) : null,
        props.label && props.variant !== 'icon' ? h('span', null, props.label) : null,
      )
    }

    /**
     * Render a text input that commits on blur or Enter.
     * @param props - `value`, `placeholder`, `onCommit`, `className`, `label`.
     * @returns the input element.
     */
    function NameField(props) {
      const [draft, setDraft] = useState(props.value)
      useEffect(() => {
        setDraft(props.value)
      }, [props.value])
      return h('input', {
        type: 'text',
        className: props.className || 'nn-name',
        value: draft,
        placeholder: props.placeholder,
        spellCheck: false,
        'aria-label': props.label || props.placeholder,
        onChange: (event) => setDraft(event.target.value),
        onBlur: () => {
          const next = draft.trim()
          if (next && next !== props.value) props.onCommit(next)
          else if (!next) setDraft(props.value)
        },
        onKeyDown: (event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            event.currentTarget.blur()
          }
        },
        onPointerDown: (event) => event.stopPropagation(),
      })
    }

    /**
     * Render a numeric input that validates and commits on blur or Enter.
     * @param props - `value`, `min`, `max`, `step`, `integer`, `onCommit`, `className`.
     * @returns the input element.
     */
    function NumberField(props) {
      const [draft, setDraft] = useState(String(props.value))
      useEffect(() => {
        setDraft(String(props.value))
      }, [props.value])
      const commit = () => {
        let next = Number(draft)
        if (!Number.isFinite(next)) {
          setDraft(String(props.value))
          return
        }
        if (props.integer) next = Math.round(next)
        if (typeof props.min === 'number') next = Math.max(props.min, next)
        if (typeof props.max === 'number') next = Math.min(props.max, next)
        setDraft(String(next))
        if (next !== props.value) props.onCommit(next)
      }
      return h('input', {
        type: 'number',
        className: props.className || 'nn-input',
        value: draft,
        min: props.min,
        max: props.max,
        step: props.step || (props.integer ? 1 : 'any'),
        inputMode: props.integer ? 'numeric' : 'decimal',
        'aria-label': props.label,
        onChange: (event) => setDraft(event.target.value),
        onBlur: commit,
        onKeyDown: (event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            event.currentTarget.blur()
          }
        },
        onPointerDown: (event) => event.stopPropagation(),
      })
    }

    /**
     * Render a labeled row with a switch control.
     * @param props - `label`, `checked`, `onChange`.
     * @returns the row.
     */
    function BoolField(props) {
      return h(
        'div',
        { className: 'nn-toggle-row' },
        h('span', { className: 'nn-toggle-label' }, props.label),
        h('button', {
          type: 'button',
          role: 'switch',
          className: 'nn-switch',
          'aria-checked': props.checked ? 'true' : 'false',
          'aria-label': props.label,
          onClick: () => props.onChange(!props.checked),
        }),
      )
    }

    /**
     * Render one inspector field row.
     * @param props - field descriptor and handlers.
     * @returns the field element.
     */
    function Field(props) {
      const t = I18N.t
      const field = props.field
      const value = props.value
      if (field.kind === 'bool') {
        return h(BoolField, {
          label: t(field.labelKey),
          checked: Boolean(value),
          onChange: (next) => props.onBinary(field.key, next),
        })
      }
      let control = null
      if (field.kind === 'select') {
        control = h(
          'select',
          {
            className: 'nn-select',
            value: String(value),
            'aria-label': t(field.labelKey),
            onChange: (event) => props.onBinary(field.key, event.target.value),
          },
          field.options.map((option) =>
            h('option', { key: option.value, value: option.value }, t(option.labelKey)),
          ),
        )
      } else if (field.kind === 'int' || field.kind === 'number') {
        control = h(NumberField, {
          value: Number(value),
          min: field.min,
          max: field.max,
          step: field.step,
          integer: field.kind === 'int',
          label: t(field.labelKey),
          onCommit: (next) => props.onBinary(field.key, next),
        })
      } else {
        control = h(NameField, {
          value: String(value == null ? '' : value),
          className: 'nn-input' + (field.key === 'shape' ? ' is-mono' : ''),
          label: t(field.labelKey),
          placeholder: t(field.labelKey),
          onCommit: (next) => props.onBinary(field.key, next),
        })
      }
      return h(
        'div',
        { className: 'nn-field' },
        h('div', { className: 'nn-field-label' }, h('span', null, t(field.labelKey))),
        control,
        field.hintKey ? h('div', { className: 'nn-field-hint' }, t(field.hintKey)) : null,
      )
    }

    /**
     * Build the one-line parameter summary shown on a node card.
     * @param node - graph node.
     * @param inputCount - number of incoming edges.
     * @returns a short summary.
     */
    function nodeSummary(node, inputCount) {
      const t = I18N.t
      const p = node.params || {}
      switch (node.type) {
        case 'input':
          return (p.name ? p.name + ' · ' : '') + (p.shape || '')
        case 'output':
          return p.name || ''
        case 'dense':
          return p.units + ' ' + t('unit.units') + ' · ' + t('act.' + (p.activation || 'linear'))
        case 'conv2d':
          return p.filters + ' ' + t('unit.filters') + ' · ' + p.kernel + '×' + p.kernel + ' · s' + p.stride
        case 'maxpool2d':
        case 'avgpool2d':
          return p.kernel + '×' + p.kernel + ' · s' + p.stride
        case 'flatten':
          return t('summary.flatten')
        case 'dropout':
          return 'p = ' + p.rate
        case 'batchnorm':
          return t('summary.batchnorm')
        case 'activation':
          return t('act.' + p.activation)
        case 'embedding':
          return p.vocab + ' → ' + p.dim
        case 'lstm':
          return (
            p.hidden + ' ' + t('unit.hidden') + ' · ' + p.layers + ' × LSTM' +
            (p.bidirectional ? ' · ' + t('summary.bidirectional') : '')
          )
        case 'add':
          return inputCount + ' → 1'
        case 'concat':
          return inputCount + ' → 1 · ' + t('axis.' + p.axis)
        default:
          return ''
      }
    }

    /* ------------------------------------------------------------------ *
     * Node card
     * ------------------------------------------------------------------ */

    /**
     * Render one draggable layer card with its ports.
     * @param props - node, inference state, selection, and interaction callbacks.
     * @returns the node element.
     */
    function NodeCard(props) {
      const t = I18N.t
      const node = props.node
      const spec = NODE_SPECS[node.type]
      const info = props.analysis.state.get(node.id)
      const shape = info ? info.shape : null
      const error = info ? info.error : null
      const inputCount = (props.analysis.incoming.get(node.id) || []).length
      const drag = useRef(null)
      const [dragging, setDragging] = useState(false)
      const classes = ['nn-node']
      if (props.selected) classes.push('is-selected')
      if (error) classes.push('is-error')
      if (dragging) classes.push('is-dragging')

      const onPointerDown = (event) => {
        if (event.button !== 0) return
        if (event.target && event.target.closest && event.target.closest('.nn-port')) return
        event.stopPropagation()
        event.preventDefault()
        props.onSelect(node.id)
        drag.current = {
          pointerId: event.pointerId,
          clientX: event.clientX,
          clientY: event.clientY,
          x: node.x,
          y: node.y,
          moved: false,
        }
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch (_captureFailed) {
          /* pointer capture is best effort */
        }
        setDragging(true)
        props.onDragStart()
      }

      const onPointerMove = (event) => {
        const current = drag.current
        if (!current || current.pointerId !== event.pointerId) return
        const dx = (event.clientX - current.clientX) / props.zoom
        const dy = (event.clientY - current.clientY) / props.zoom
        if (!current.moved && Math.abs(dx) + Math.abs(dy) < 2) return
        current.moved = true
        props.onMove(node.id, Math.round((current.x + dx) / 8) * 8, Math.round((current.y + dy) / 8) * 8)
      }

      const onPointerUp = (event) => {
        const current = drag.current
        if (!current || current.pointerId !== event.pointerId) return
        drag.current = null
        setDragging(false)
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch (_releaseFailed) {
          /* pointer capture is best effort */
        }
        props.onDragEnd(current.moved)
      }

      return h(
        'div',
        {
          className: classes.join(' '),
          style: { left: node.x, top: node.y, width: NODE_W, '--nn-accent': spec.color },
          'data-node-id': node.id,
          role: 'group',
          'aria-label': node.title + ' · ' + t('node.' + node.type),
          onPointerDown,
          onPointerMove,
          onPointerUp,
          onPointerCancel: onPointerUp,
        },
        h(
          'div',
          { className: 'nn-node-head' },
          h('span', { className: 'nn-node-glyph' }, h(TypeGlyph, { type: node.type, size: 14 })),
          h('span', { className: 'nn-node-title', title: node.title }, node.title),
          h('span', { className: 'nn-node-type' }, t('node.' + node.type)),
        ),
        h('div', { className: 'nn-node-body' }, nodeSummary(node, inputCount)),
        h(
          'div',
          { className: 'nn-node-foot' },
          h(
            'span',
            {
              className: 'nn-node-shape' + (error ? ' is-bad' : ''),
              title: error ? t(error.code, error.params) : t('inspector.output'),
            },
            error ? t('shape.invalid') : shape ? formatShape(shape) : t('shape.pending'),
          ),
          info && info.params > 0
            ? h('span', { className: 'nn-node-params' }, compactCount(info.params) + ' ' + t('param.count'))
            : null,
        ),
        error ? h('span', { className: 'nn-node-alert', title: t(error.code, error.params) }, '!') : null,
        node.type !== 'input'
          ? h('span', {
              className: 'nn-port is-in',
              'data-in-port': '1',
              'data-node-id': node.id,
              title: t('port.input'),
              'aria-hidden': true,
            })
          : null,
        node.type !== 'output'
          ? h('span', {
              className: 'nn-port is-out',
              'data-out-port': '1',
              'data-node-id': node.id,
              title: t('port.output'),
              'aria-hidden': true,
              onPointerDown: (event) => {
                if (event.button !== 0) return
                event.stopPropagation()
                event.preventDefault()
                props.onStartConnect(node.id)
              },
            })
          : null,
      )
    }

    /* ------------------------------------------------------------------ *
     * Studio state
     * ------------------------------------------------------------------ */

    /**
     * Copy a list and keep the most recent history entries.
     * @param list - existing history.
     * @param entry - entry to append.
     * @returns a capped new list.
     */
    function capHistory(list, entry) {
      const next = list.concat(entry)
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next
    }

    /**
     * Apply one graph reducer action.
     * @param state - current studio state.
     * @param action - mutate, commit, replace, undo, or redo.
     * @returns the next studio state.
     */
    function studioReducer(state, action) {
      switch (action.type) {
        case 'mutate': {
          const next = action.update(state.graph)
          if (!next || next === state.graph) return state
          if (action.transient) return { graph: next, past: state.past, future: state.future }
          return { graph: next, past: capHistory(state.past, state.graph), future: [] }
        }
        case 'commit':
          return { graph: state.graph, past: capHistory(state.past, action.snapshot), future: [] }
        case 'replace':
          return {
            graph: action.graph,
            past: action.history ? capHistory(state.past, state.graph) : state.past,
            future: action.history ? [] : state.future,
          }
        case 'undo': {
          if (!state.past.length) return state
          return {
            graph: state.past[state.past.length - 1],
            past: state.past.slice(0, -1),
            future: [state.graph].concat(state.future),
          }
        }
        case 'redo': {
          if (!state.future.length) return state
          return {
            graph: state.future[0],
            past: capHistory(state.past, state.graph),
            future: state.future.slice(1),
          }
        }
        default:
          return state
      }
    }

    /**
     * Restore the saved network, or start from the MLP template.
     * @returns the initial studio state.
     */
    function initialStudioState() {
      try {
        const stored = localStorage.getItem(STORE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          const graph = normalizeGraph(parsed)
          if (graph) return { graph, past: [], future: [] }
        }
      } catch (_restoreFailed) {
        /* a broken snapshot should never block the studio */
      }
      const template = templateCatalog().find((entry) => entry.id === 'mlp')
      return { graph: template.build(), past: [], future: [] }
    }

    /**
     * Apply a parameter edit to one node.
     * @param graph - current graph.
     * @param id - node id.
     * @param key - parameter key.
     * @param value - next value.
     * @returns a new graph.
     */
    function withNodeParam(graph, id, key, value) {
      return Object.assign({}, graph, {
        nodes: graph.nodes.map((node) =>
          node.id === id
            ? Object.assign({}, node, { params: Object.assign({}, node.params, { [key]: value }) })
            : node,
        ),
      })
    }

    /**
     * Copy text with a DOM fallback for hosts without the async clipboard.
     * @param text - text to copy.
     * @returns whether the copy succeeded.
     */
    async function copyToClipboard(text) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text)
          return true
        }
      } catch (_clipboardDenied) {
        /* fall through to execCommand */
      }
      try {
        const area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', 'readonly')
        area.style.position = 'fixed'
        area.style.opacity = '0'
        document.body.appendChild(area)
        area.select()
        const copied = document.execCommand('copy')
        area.remove()
        return copied
      } catch (_fallbackFailed) {
        return false
      }
    }

    /**
     * Download text through a temporary anchor.
     * @param text - file contents.
     * @param filename - suggested file name.
     * @param mime - MIME type.
     * @returns whether the download started.
     */
    function downloadText(text, filename, mime) {
      try {
        const blob = new Blob([text], { type: mime || 'text/plain' })
        const url = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = filename
        anchor.style.display = 'none'
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
        setTimeout(() => URL.revokeObjectURL(url), 1500)
        return true
      } catch (_downloadFailed) {
        return false
      }
    }

    /**
     * Derive a safe file stem from a network name.
     * @param name - display name.
     * @returns an ASCII file stem.
     */
    function fileSlug(name) {
      const base = String(name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
      return base || 'network'
    }

    /* ------------------------------------------------------------------ *
     * Palette
     * ------------------------------------------------------------------ */

    /**
     * Render the layer library.
     * @param props - `onAdd(type)`.
     * @returns the palette column.
     */
    function Palette(props) {
      const t = I18N.t
      const [query, setQuery] = useState('')
      const needle = query.trim().toLowerCase()
      const groups = []
      for (const category of CATEGORIES) {
        const types = category.types.filter((type) => {
          if (!needle) return true
          return (t('node.' + type) + ' ' + type).toLowerCase().includes(needle)
        })
        if (types.length) groups.push({ category, types })
      }
      return h(
        'aside',
        { className: 'nn-palette', 'aria-label': t('palette.title') },
        h('div', { className: 'nn-palette-head' }, h('span', { className: 'nn-palette-title' }, t('palette.title'))),
        h('input', {
          type: 'search',
          className: 'nn-input nn-search',
          value: query,
          placeholder: t('palette.search'),
          'aria-label': t('palette.search'),
          onChange: (event) => setQuery(event.target.value),
        }),
        h(
          'div',
          { className: 'nn-palette-scroll' },
          groups.map((group) =>
            h(
              'div',
              { className: 'nn-group', key: group.category.id },
              h('div', { className: 'nn-group-title' }, t('cat.' + group.category.id)),
              group.types.map((type) =>
                h(
                  'button',
                  {
                    key: type,
                    type: 'button',
                    className: 'nn-pal-btn',
                    style: { '--nn-accent': NODE_SPECS[type].color },
                    title: t('node.' + type),
                    onClick: () => props.onAdd(type),
                  },
                  h('span', { className: 'nn-pal-glyph' }, h(TypeGlyph, { type, size: 15 })),
                  h('span', null, t('node.' + type)),
                ),
              ),
            ),
          ),
          groups.length ? null : h('div', { className: 'nn-pal-empty' }, t('palette.empty')),
        ),
        h('div', { className: 'nn-pal-hint' }, t('palette.hint')),
      )
    }

    /* ------------------------------------------------------------------ *
     * Inspector panels
     * ------------------------------------------------------------------ */

    /**
     * Render the no-selection inspector.
     * @param props - graph and inference results.
     * @returns the empty state with quick stats.
     */
    function EmptyInspector(props) {
      const t = I18N.t
      const analysis = props.analysis
      const graph = props.graph
      return h(
        'div',
        null,
        h(
          'div',
          { className: 'nn-empty' },
          h(Icon, { name: 'panelRight', size: 26 }),
          h('strong', null, t('inspector.emptyTitle')),
          h('p', null, t('inspector.emptyBody')),
        ),
        h(
          'div',
          { className: 'nn-stat-grid' },
          h('div', { className: 'nn-stat' }, h('div', { className: 'nn-stat-label' }, t('model.layers')), h('div', { className: 'nn-stat-value' }, String(graph.nodes.length))),
          h('div', { className: 'nn-stat' }, h('div', { className: 'nn-stat-label' }, t('model.params')), h('div', { className: 'nn-stat-value' }, compactCount(analysis.totalParams))),
        ),
        h(
          'div',
          { className: 'nn-shortcuts' },
          h('div', { className: 'nn-shortcuts-title' }, t('inspector.shortcuts')),
          [
            'sc.undo',
            'sc.redo',
            'sc.delete',
            'sc.duplicate',
            'sc.fit',
          ].map((key) =>
            h('div', { className: 'nn-shortcut', key }, h('span', null, t(key))),
          ),
        ),
      )
    }

    /**
     * Render the selected node or edge properties.
     * @param props - studio selection and edit callbacks.
     * @returns the properties form.
     */
    function PropsPanel(props) {
      const t = I18N.t
      const graph = props.graph
      const analysis = props.analysis
      const selection = props.selection
      if (selection && selection.kind === 'node') {
        const node = graph.nodes.find((entry) => entry.id === selection.id)
        if (!node) return h(EmptyInspector, props)
        const info = analysis.state.get(node.id)
        const spec = NODE_SPECS[node.type]
        const fields = FIELDS[node.type] || []
        return h(
          'div',
          null,
          h(
            'div',
            { className: 'nn-node-preview' },
            h(
              'span',
              { className: 'nn-node-preview-glyph', style: { '--nn-accent': spec.color } },
              h(TypeGlyph, { type: node.type, size: 18 }),
            ),
            h(
              'div',
              { className: 'nn-node-preview-text' },
              h('div', { className: 'nn-eyebrow' }, t('node.' + node.type)),
              h(NameField, {
                value: node.title,
                className: 'nn-input',
                label: t('inspector.nodeTitle'),
                placeholder: t('node.' + node.type),
                onCommit: (value) => props.onUpdateTitle(node.id, value),
              }),
            ),
          ),
          fields.map((field) =>
            h(Field, {
              key: field.key,
              field,
              value: node.params[field.key],
              onBinary: (key, value) => props.onUpdateParam(node.id, key, value),
            }),
          ),
          h(
            'div',
            { className: 'nn-meta' },
            h(
              'div',
              { className: 'nn-meta-item' },
              h('div', { className: 'nn-meta-label' }, t('inspector.output')),
              h('div', { className: 'nn-meta-value is-mono' }, formatShape(info ? info.shape : null)),
            ),
            h(
              'div',
              { className: 'nn-meta-item' },
              h('div', { className: 'nn-meta-label' }, t('inspector.params')),
              h('div', { className: 'nn-meta-value' }, formatCount(info ? info.params : 0)),
            ),
          ),
          info && info.error
            ? h(
                'div',
                { className: 'nn-note is-error' },
                h(Icon, { name: 'warn', size: 14 }),
                h('span', null, t(info.error.code, info.error.params)),
              )
            : null,
          h(
            'div',
            { className: 'nn-actions' },
            h(Button, { icon: 'copy', label: t('inspector.duplicate'), onClick: props.onDuplicate }),
            h(Button, { icon: 'trash', label: t('inspector.delete'), danger: true, onClick: props.onDelete }),
          ),
          (analysis.incoming.get(node.id) || []).length
            ? h(
                'div',
                { className: 'nn-actions' },
                h(Button, { label: t('inspector.disconnect'), onClick: () => props.onDisconnect(node.id) }),
              )
            : null,
        )
      }
      if (selection && selection.kind === 'edge') {
        const edge = graph.edges.find((entry) => entry.id === selection.id)
        if (!edge) return h(EmptyInspector, props)
        const from = graph.nodes.find((entry) => entry.id === edge.from)
        const to = graph.nodes.find((entry) => entry.id === edge.to)
        return h(
          'div',
          null,
          h('div', { className: 'nn-eyebrow' }, t('inspector.deleteEdge')),
          h('div', { className: 'nn-note' }, h('span', null, (from ? from.title : '?') + ' → ' + (to ? to.title : '?'))),
          h(
            'div',
            { className: 'nn-actions' },
            h(Button, {
              icon: 'trash',
              label: t('inspector.deleteEdge'),
              danger: true,
              onClick: () => props.onDeleteEdge(edge.id),
            }),
          ),
        )
      }
      return h(EmptyInspector, props)
    }

    /**
     * Render validation errors and warnings.
     * @param props - graph, inference, and locate callback.
     * @returns the checks list.
     */
    function ChecksPanel(props) {
      const t = I18N.t
      const issues = props.analysis.issues
      const errors = issues.filter((issue) => issue.severity === 'error')
      const warnings = issues.filter((issue) => issue.severity === 'warning')
      const titleOf = (nodeId) => {
        const node = props.graph.nodes.find((entry) => entry.id === nodeId)
        return node ? node.title : ''
      }
      const renderGroup = (title, items) => {
        if (!items.length) return null
        return h(
          'div',
          { className: 'nn-issue-group' },
          h(
            'div',
            { className: 'nn-issue-group-title' },
            h('span', null, title),
            h('span', { className: 'nn-badge' }, String(items.length)),
          ),
          items.map((issue) =>
            h(
              'button',
              {
                key: issue.id,
                type: 'button',
                className: 'nn-issue' + (issue.severity === 'warning' ? ' is-warn' : ''),
                onClick: issue.nodeId ? () => props.onLocate(issue.nodeId) : undefined,
                title: issue.nodeId ? t('inspector.center') : undefined,
              },
              h('span', { className: 'nn-issue-dot' }),
              h(
                'span',
                { className: 'nn-issue-text' },
                t(issue.code, issue.params),
                issue.nodeId ? h('span', { className: 'nn-issue-node' }, titleOf(issue.nodeId)) : null,
              ),
            ),
          ),
        )
      }
      if (!errors.length && !warnings.length) {
        return h(
          'div',
          { className: 'nn-note is-ok' },
          h(Icon, { name: 'check', size: 15 }),
          h('span', null, t('checks.okTitle') + ' · ' + t('checks.okBody')),
        )
      }
      return h(
        'div',
        null,
        renderGroup(t('checks.errors'), errors),
        renderGroup(t('checks.warnings'), warnings),
      )
    }

    /**
     * Render a labeled select row.
     * @param label - localized label.
     * @param value - current value.
     * @param options - `{ value, label }` entries.
     * @param onChange - value callback.
     * @returns the field row.
     */
    function selectRow(label, value, options, onChange) {
      return h(
        'div',
        { className: 'nn-field' },
        h('div', { className: 'nn-field-label' }, h('span', null, label)),
        h(
          'select',
          { className: 'nn-select', value, 'aria-label': label, onChange: (event) => onChange(event.target.value) },
          options.map((option) => h('option', { key: option.value, value: option.value }, option.label)),
        ),
      )
    }

    /**
     * Render a labeled numeric row.
     * @param label - localized label.
     * @param value - current value.
     * @param options - min/max/step/integer.
     * @param onCommit - value callback.
     * @returns the field row.
     */
    function numberRow(label, value, options, onCommit) {
      return h(
        'div',
        { className: 'nn-field' },
        h('div', { className: 'nn-field-label' }, h('span', null, label)),
        h(NumberField, {
          value,
          min: options.min,
          max: options.max,
          step: options.step,
          integer: options.integer,
          label,
          onCommit,
        }),
      )
    }

    /**
     * Render model summary and training configuration.
     * @param props - graph, inference, training callback, and locate callback.
     * @returns the model panel.
     */
    function ModelPanel(props) {
      const t = I18N.t
      const graph = props.graph
      const analysis = props.analysis
      const training = graph.training
      const reconstruction = isReconstruction(graph, analysis)
      const autoLoss = reconstruction ? 'mse' : analysis.softmaxTail ? 'nll' : 'ce'
      const datasetOptions = ['mnist', 'cifar10', 'custom'].map((value) => ({ value, label: t('dataset.' + value) }))
      const optimizerOptions = ['adam', 'adamw', 'sgd', 'rmsprop'].map((value) => ({ value, label: t('optimizer.' + value) }))
      const deviceOptions = ['auto', 'cpu', 'cuda', 'mps'].map((value) => ({ value, label: t('device.' + value) }))
      const lossOptions = [
        { value: 'auto', label: t('loss.autoValue', { loss: t('loss.' + autoLoss) }) },
        { value: 'ce', label: t('loss.ce') },
        { value: 'nll', label: t('loss.nll') },
        { value: 'mse', label: t('loss.mse') },
      ]
      const inputShape = analysis.inputNodes.length
        ? formatShape(analysis.state.get(analysis.inputNodes[0].id).shape)
        : '—'
      return h(
        'div',
        null,
        h(
          'div',
          { className: 'nn-stat-grid' },
          h('div', { className: 'nn-stat' }, h('div', { className: 'nn-stat-label' }, t('model.layers')), h('div', { className: 'nn-stat-value' }, String(graph.nodes.length))),
          h('div', { className: 'nn-stat' }, h('div', { className: 'nn-stat-label' }, t('model.params')), h('div', { className: 'nn-stat-value' }, compactCount(analysis.totalParams))),
          h('div', { className: 'nn-stat' }, h('div', { className: 'nn-stat-label' }, t('model.size')), h('div', { className: 'nn-stat-value' }, formatBytes(analysis.sizeBytes))),
          h('div', { className: 'nn-stat' }, h('div', { className: 'nn-stat-label' }, t('model.output')), h('div', { className: 'nn-stat-value is-mono' }, analysis.outputShapes.map(formatShape).join(' / ') || '—')),
          h('div', { className: 'nn-stat' }, h('div', { className: 'nn-stat-label' }, t('model.input')), h('div', { className: 'nn-stat-value is-mono' }, inputShape)),
          h('div', { className: 'nn-stat' }, h('div', { className: 'nn-stat-label' }, t('inspector.params')), h('div', { className: 'nn-stat-value' }, formatCount(analysis.totalParams))),
        ),
        reconstruction
          ? h(
              'div',
              { className: 'nn-note' },
              h(Icon, { name: 'spark', size: 14 }),
              h('span', null, t('note.reconstruction')),
            )
          : null,
        h(
          'div',
          { className: 'nn-section' },
          h('div', { className: 'nn-section-title' }, h('span', null, t('model.training')), h('span', null, t('field.loss') + ': ' + t('loss.' + autoLoss))),
          h('div', { className: 'nn-field-hint', style: { marginBottom: '8px' } }, t('model.trainingHint')),
          selectRow(t('field.dataset'), training.dataset, datasetOptions, (value) => props.onTraining('dataset', value)),
          selectRow(t('field.optimizer'), training.optimizer, optimizerOptions, (value) => props.onTraining('optimizer', value)),
          numberRow(t('field.lr'), training.lr, { min: 0.000001, max: 1, step: 0.0001, integer: false }, (value) => props.onTraining('lr', value)),
          numberRow(t('field.batch'), training.batchSize, { min: 1, max: 8192, step: 1, integer: true }, (value) => props.onTraining('batchSize', value)),
          numberRow(t('field.epochs'), training.epochs, { min: 1, max: 1000, step: 1, integer: true }, (value) => props.onTraining('epochs', value)),
          numberRow(t('field.seed'), training.seed, { min: 0, max: 2147483647, step: 1, integer: true }, (value) => props.onTraining('seed', value)),
          selectRow(t('field.device'), training.device, deviceOptions, (value) => props.onTraining('device', value)),
          selectRow(t('field.loss'), training.loss, lossOptions, (value) => props.onTraining('loss', value)),
        ),
        h(
          'div',
          { className: 'nn-section' },
          h('div', { className: 'nn-section-title' }, h('span', null, t('model.layers')), h('span', { className: 'nn-badge' }, String(graph.nodes.length))),
          h(
            'div',
            { className: 'nn-table-wrap' },
            h(
              'table',
              { className: 'nn-table' },
              h(
                'thead',
                null,
                h(
                  'tr',
                  null,
                  h('th', null, t('model.tableLayer')),
                  h('th', null, t('model.tableType')),
                  h('th', null, t('model.tableShape')),
                  h('th', null, t('model.tableParams')),
                ),
              ),
              h(
                'tbody',
                null,
                graph.nodes.map((node) => {
                  const info = analysis.state.get(node.id)
                  return h(
                    'tr',
                    { key: node.id, onClick: () => props.onLocate(node.id) },
                    h('td', null, node.title),
                    h('td', null, t('node.' + node.type)),
                    h('td', { className: 'is-mono' + (info && info.error ? ' is-error' : '') }, info && info.shape ? formatShape(info.shape) : '—'),
                    h('td', { className: 'is-num' }, info ? compactCount(info.params) : '0'),
                  )
                }),
              ),
            ),
          ),
        ),
      )
    }

    /**
     * Render generated source for one framework and section.
     * @param props - graph, inference, framework state, and notify callback.
     * @returns the code panel.
     */
    function CodePanel(props) {
      const t = I18N.t
      const [copied, setCopied] = useState(false)
      useEffect(() => {
        if (!copied) return undefined
        const timer = setTimeout(() => setCopied(false), 1800)
        return () => clearTimeout(timer)
      }, [copied])
      const code = useMemo(
        () => generateCode(props.graph, props.analysis, props.framework, props.codeSection),
        [props.graph, props.analysis, props.framework, props.codeSection],
      )
      const sections = [
        { id: 'model', label: t('code.model') },
        { id: 'train', label: t('code.train') },
        { id: 'requirements', label: t('code.requirements') },
      ]
      const frameworks = [
        { id: 'pytorch', label: t('frameworks.pytorch') },
        { id: 'keras', label: t('frameworks.keras') },
      ]
      const copy = async () => {
        if (!code) return
        const ok = await copyToClipboard(code)
        if (ok) {
          setCopied(true)
          props.notify(t('toast.copied'), 'success')
        } else {
          props.notify(t('toast.copyFailed'), 'error')
        }
      }
      const download = () => {
        if (!code) {
          props.notify(t('toast.noCode'), 'error')
          return
        }
        const stem = fileSlug(props.graph.name)
        let filename = stem + '_model.py'
        let mime = 'text/x-python'
        if (props.codeSection === 'train') filename = stem + '_train.py'
        if (props.codeSection === 'requirements') {
          filename = 'requirements.txt'
          mime = 'text/plain'
        }
        if (!downloadText(code, filename, mime)) {
          props.notify(t('toast.downloadFailed'), 'error')
          return
        }
        props.notify(t('toast.exported', { file: filename }), 'success')
      }
      return h(
        'div',
        { className: 'nn-code-wrap' },
        h(
          'div',
          { className: 'nn-code-controls' },
          h(
            'div',
            { className: 'nn-segment', role: 'tablist', 'aria-label': t('code.framework') },
            frameworks.map((entry) =>
              h(
                'button',
                {
                  key: entry.id,
                  type: 'button',
                  role: 'tab',
                  'aria-selected': props.framework === entry.id,
                  className: props.framework === entry.id ? 'is-active' : undefined,
                  onClick: () => props.onFramework(entry.id),
                },
                entry.label,
              ),
            ),
          ),
          h(Button, { icon: 'copy', label: copied ? t('code.copied') : t('code.copy'), variant: 'ghost', onClick: copy, disabled: !code }),
          h(Button, { icon: 'download', label: t('code.download'), variant: 'ghost', onClick: download, disabled: !code }),
        ),
        h(
          'div',
          { className: 'nn-code-controls' },
          h(
            'div',
            { className: 'nn-segment' },
            sections.map((entry) =>
              h(
                'button',
                {
                  key: entry.id,
                  type: 'button',
                  className: props.codeSection === entry.id ? 'is-active' : undefined,
                  onClick: () => props.onCodeSection(entry.id),
                },
                entry.label,
              ),
            ),
          ),
        ),
        code
          ? h(
              'div',
              { className: 'nn-code-meta' },
              h('span', null, t('code.lines', { lines: code.split('\n').length })),
              h('span', null, t('code.hint')),
            )
          : h('div', { className: 'nn-note is-warn' }, h(Icon, { name: 'warn', size: 14 }), h('span', null, t('code.invalid'))),
        code
          ? h('pre', { className: 'nn-code', tabIndex: 0 }, code)
          : null,
      )
    }

    /**
     * Render the inspector tabs and the active panel.
     * @param props - studio state and edit callbacks.
     * @returns the inspector column.
     */
    function Inspector(props) {
      const t = I18N.t
      const tabs = [
        { id: 'props', label: t('inspector.tab.props') },
        { id: 'checks', label: t('inspector.tab.checks'), count: props.analysis.errorCount },
        { id: 'model', label: t('inspector.tab.model') },
        { id: 'code', label: t('inspector.tab.code') },
      ]
      return h(
        'aside',
        {
          className: 'nn-inspector' + (props.tab === 'code' ? ' is-wide' : ''),
          'aria-label': t('header.inspector'),
        },
        h(
          'div',
          { className: 'nn-tabs', role: 'tablist' },
          tabs.map((entry) =>
            h(
              'button',
              {
                key: entry.id,
                type: 'button',
                role: 'tab',
                'aria-selected': props.tab === entry.id,
                className: 'nn-tab' + (props.tab === entry.id ? ' is-active' : ''),
                onClick: () => props.onTab(entry.id),
              },
              entry.label,
              entry.count ? h('span', { className: 'nn-tab-count' }, String(entry.count)) : null,
            ),
          ),
        ),
        h(
          'div',
          { className: 'nn-side-body', role: 'tabpanel' },
          props.tab === 'props' ? h(PropsPanel, props) : null,
          props.tab === 'checks' ? h(ChecksPanel, props) : null,
          props.tab === 'model' ? h(ModelPanel, props) : null,
          props.tab === 'code' ? h(CodePanel, props) : null,
        ),
      )
    }

    /* ------------------------------------------------------------------ *
     * Templates
     * ------------------------------------------------------------------ */

    /**
     * Render the template picker.
     * @param props - `onUse(template)` and `onClose()`.
     * @returns the dialog.
     */
    function TemplatesDialog(props) {
      const t = I18N.t
      const entries = useMemo(() => {
        return templateCatalog().map((template) => {
          const graph = template.build()
          const analysis = analyze(graph)
          return { template, layers: graph.nodes.length, params: analysis.totalParams }
        })
      }, [])
      return h(
        'div',
        {
          className: 'nn-modal-backdrop',
          onPointerDown: (event) => {
            if (event.target === event.currentTarget) props.onClose()
          },
        },
        h(
          'div',
          { className: 'nn-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('templates.title') },
          h(
            'div',
            { className: 'nn-modal-head' },
            h(
              'div',
              null,
              h('div', { className: 'nn-modal-title' }, t('templates.title')),
              h('div', { className: 'nn-modal-sub' }, t('templates.subtitle')),
            ),
            h(Button, {
              icon: 'close',
              variant: 'icon',
              title: t('common.close'),
              className: 'nn-modal-close',
              onClick: props.onClose,
            }),
          ),
          h(
            'div',
            { className: 'nn-template-grid' },
            entries.map((entry) =>
              h(
                'button',
                {
                  key: entry.template.id,
                  type: 'button',
                  className: 'nn-template',
                  onClick: () => props.onUse(entry.template),
                },
                h('span', { className: 'nn-template-icon' }, h(TypeGlyph, { type: entry.template.id === 'blank' ? 'input' : 'dense', size: 17 })),
                h('span', { className: 'nn-template-title' }, t(entry.template.titleKey)),
                h('span', { className: 'nn-template-desc' }, t(entry.template.descKey)),
                h(
                  'span',
                  { className: 'nn-template-meta' },
                  entry.layers + ' ' + t('model.layers') + ' · ' + compactCount(entry.params) + ' ' + t('param.count'),
                ),
              ),
            ),
          ),
        ),
      )
    }

    /* ------------------------------------------------------------------ *
     * Studio
     * ------------------------------------------------------------------ */

    /**
     * Render the full node-graph workbench.
     * @returns the studio root.
     */
    function Studio() {
      const t = I18N.t
      const [state, dispatch] = React.useReducer(studioReducer, undefined, initialStudioState)
      const graph = state.graph
      const analysis = useMemo(() => analyze(graph), [graph])
      const [selection, setSelection] = useState(null)
      const [tab, setTab] = useState('props')
      const [view, setView] = useState({ x: 60, y: 40, zoom: 1 })
      const [paletteOpen, setPaletteOpen] = useState(true)
      const [inspectorOpen, setInspectorOpen] = useState(true)
      const [connect, setConnect] = useState(null)
      const [toast, setToast] = useState(null)
      const [templatesOpen, setTemplatesOpen] = useState(false)
      const [framework, setFramework] = useState('pytorch')
      const [codeSection, setCodeSection] = useState('model')
      const [panning, setPanning] = useState(false)

      const canvasRef = useRef(null)
      const fileRef = useRef(null)
      const panRef = useRef(null)
      const dragSnapshotRef = useRef(null)
      const toastTimerRef = useRef(null)
      const didFitRef = useRef(false)
      const graphRef = useRef(graph)
      const viewRef = useRef(view)
      const selectionRef = useRef(selection)
      graphRef.current = graph
      viewRef.current = view
      selectionRef.current = selection

      const notify = useCallback((text, tone) => {
        setToast({ text, tone: tone || 'info', id: Date.now() })
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
        toastTimerRef.current = setTimeout(() => setToast(null), 3000)
      }, [])
      useEffect(() => {
        return () => {
          if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
        }
      }, [])

      useEffect(() => {
        const timer = setTimeout(() => {
          try {
            const snapshot = graphRef.current
            localStorage.setItem(
              STORE_KEY,
              JSON.stringify({
                format: 'nn-studio',
                version: 1,
                name: snapshot.name,
                nodes: snapshot.nodes,
                edges: snapshot.edges,
                training: snapshot.training,
              }),
            )
          } catch (_persistFailed) {
            /* persistence is best effort */
          }
        }, 300)
        return () => clearTimeout(timer)
      }, [graph])
      useEffect(() => {
        return () => {
          try {
            const snapshot = graphRef.current
            localStorage.setItem(
              STORE_KEY,
              JSON.stringify({
                format: 'nn-studio',
                version: 1,
                name: snapshot.name,
                nodes: snapshot.nodes,
                edges: snapshot.edges,
                training: snapshot.training,
              }),
            )
          } catch (_persistFailed) {
            /* persistence is best effort */
          }
        }
      }, [])

      const mutate = useCallback((update, transient) => {
        dispatch({ type: 'mutate', update, transient })
      }, [])

      const clientToWorld = useCallback((clientX, clientY) => {
        const element = canvasRef.current
        if (!element) return { x: 0, y: 0 }
        const rect = element.getBoundingClientRect()
        const current = viewRef.current
        return {
          x: (clientX - rect.left - current.x) / current.zoom,
          y: (clientY - rect.top - current.y) / current.zoom,
        }
      }, [])

      const viewportCenterWorld = useCallback(() => {
        const element = canvasRef.current
        if (!element) return { x: 240, y: 200 }
        const rect = element.getBoundingClientRect()
        const current = viewRef.current
        return {
          x: (rect.width / 2 - current.x) / current.zoom,
          y: (rect.height / 2 - current.y) / current.zoom,
        }
      }, [])

      const fitView = useCallback(() => {
        const element = canvasRef.current
        if (!element) return
        const rect = element.getBoundingClientRect()
        const nodes = graphRef.current.nodes
        if (!nodes.length) {
          setView({ x: 60, y: 60, zoom: 1 })
          return
        }
        let minX = Infinity
        let minY = Infinity
        let maxX = -Infinity
        let maxY = -Infinity
        for (const node of nodes) {
          minX = Math.min(minX, node.x)
          minY = Math.min(minY, node.y)
          maxX = Math.max(maxX, node.x + NODE_W)
          maxY = Math.max(maxY, node.y + NODE_H)
        }
        const pad = 80
        const width = Math.max(1, maxX - minX)
        const height = Math.max(1, maxY - minY)
        const zoom = Math.max(
          0.3,
          Math.min(1.15, Math.min((rect.width - pad * 2) / width, (rect.height - pad * 2) / height)),
        )
        setView({
          zoom,
          x: (rect.width - width * zoom) / 2 - minX * zoom,
          y: (rect.height - height * zoom) / 2 - minY * zoom,
        })
      }, [])

      const focusNode = useCallback((id) => {
        const node = graphRef.current.nodes.find((entry) => entry.id === id)
        const element = canvasRef.current
        if (!node || !element) return
        const rect = element.getBoundingClientRect()
        const zoom = Math.max(0.6, Math.min(1.2, viewRef.current.zoom))
        setView({
          zoom,
          x: rect.width / 2 - (node.x + NODE_W / 2) * zoom,
          y: rect.height / 2 - (node.y + NODE_H / 2) * zoom,
        })
        setSelection({ kind: 'node', id })
      }, [])

      useEffect(() => {
        if (didFitRef.current) return undefined
        const element = canvasRef.current
        if (!element) return undefined
        let raf = 0
        let attempts = 0
        const attempt = () => {
          if (didFitRef.current) return
          const rect = element.getBoundingClientRect()
          if (rect.width > 80 && rect.height > 80) {
            didFitRef.current = true
            fitView()
          } else if (attempts < 90) {
            attempts += 1
            raf = requestAnimationFrame(attempt)
          }
        }
        attempt()
        return () => cancelAnimationFrame(raf)
      }, [fitView])

      useEffect(() => {
        const element = canvasRef.current
        if (!element) return undefined
        const onWheel = (event) => {
          event.preventDefault()
          const rect = element.getBoundingClientRect()
          const px = event.clientX - rect.left
          const py = event.clientY - rect.top
          const current = viewRef.current
          const factor = Math.exp(-event.deltaY * 0.0015)
          const zoom = Math.max(0.3, Math.min(2.4, current.zoom * factor))
          const worldX = (px - current.x) / current.zoom
          const worldY = (py - current.y) / current.zoom
          setView({ zoom, x: px - worldX * zoom, y: py - worldY * zoom })
        }
        element.addEventListener('wheel', onWheel, { passive: false })
        return () => element.removeEventListener('wheel', onWheel)
      }, [])

      const zoomBy = useCallback((factor) => {
        const element = canvasRef.current
        if (!element) return
        const rect = element.getBoundingClientRect()
        setView((current) => {
          const zoom = Math.max(0.3, Math.min(2.4, current.zoom * factor))
          const worldX = (rect.width / 2 - current.x) / current.zoom
          const worldY = (rect.height / 2 - current.y) / current.zoom
          return { zoom, x: rect.width / 2 - worldX * zoom, y: rect.height / 2 - worldY * zoom }
        })
      }, [])

      const handleSelectNode = useCallback((id) => {
        setSelection({ kind: 'node', id })
        setTab('props')
      }, [])

      const beginNodeDrag = useCallback(() => {
        dragSnapshotRef.current = graphRef.current
      }, [])

      const moveNodeCard = useCallback(
        (id, x, y) => {
          mutate((current) => patchNode(current, id, { x, y }), true)
        },
        [mutate],
      )

      const endNodeDrag = useCallback((moved) => {
        const snapshot = dragSnapshotRef.current
        dragSnapshotRef.current = null
        if (moved && snapshot) dispatch({ type: 'commit', snapshot })
      }, [])

      const handleStartConnect = useCallback((fromId) => {
        const node = graphRef.current.nodes.find((entry) => entry.id === fromId)
        if (!node) return
        setConnect({
          fromId,
          source: { x: node.x + NODE_W, y: node.y + NODE_H / 2 },
          pointer: { x: node.x + NODE_W + 40, y: node.y + NODE_H / 2 },
        })
      }, [])

      const finishConnection = useCallback(
        (fromId, toId) => {
          const current = graphRef.current
          const result = connectNodes(current, fromId, toId)
          if (result.reason) {
            notify(t(result.reason), 'error')
            return
          }
          if (result.graph !== current) {
            dispatch({
              type: 'mutate',
              update: (latest) => {
                const next = connectNodes(latest, fromId, toId)
                return next.reason ? latest : next.graph
              },
            })
            notify(t('toast.connected'), 'success')
          }
        },
        [notify, t],
      )

      useEffect(() => {
        if (!connect) return undefined
        const fromId = connect.fromId
        const onMove = (event) => {
          const point = clientToWorld(event.clientX, event.clientY)
          setConnect((current) =>
            current ? { fromId: current.fromId, source: current.source, pointer: point } : current,
          )
        }
        const onUp = (event) => {
          const element = document.elementFromPoint(event.clientX, event.clientY)
          const target = element && element.closest ? element.closest('[data-in-port]') : null
          if (target) {
            const toId = target.getAttribute('data-node-id')
            if (toId) finishConnection(fromId, toId)
          }
          setConnect(null)
        }
        const onCancel = () => setConnect(null)
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        window.addEventListener('pointercancel', onCancel)
        return () => {
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup', onUp)
          window.removeEventListener('pointercancel', onCancel)
        }
      }, [connect ? connect.fromId : null, clientToWorld, finishConnection])

      const updateNodeParam = useCallback(
        (id, key, value) => {
          mutate((current) => withNodeParam(current, id, key, value))
        },
        [mutate],
      )

      const updateNodeTitle = useCallback(
        (id, value) => {
          mutate((current) => patchNode(current, id, { title: value }))
        },
        [mutate],
      )

      const updateTraining = useCallback(
        (key, value) => {
          mutate((current) =>
            Object.assign({}, current, {
              training: Object.assign({}, current.training, { [key]: value }),
            }),
          )
        },
        [mutate],
      )

      const deleteSelected = useCallback(() => {
        const current = selectionRef.current
        if (!current) return
        dispatch({
          type: 'mutate',
          update: (latest) =>
            current.kind === 'node' ? removeNode(latest, current.id) : removeEdge(latest, current.id),
        })
        setSelection(null)
        notify(t(current.kind === 'node' ? 'toast.nodeDeleted' : 'toast.edgeDeleted'), 'success')
      }, [notify, t])

      const duplicateSelected = useCallback(() => {
        const current = selectionRef.current
        if (!current || current.kind !== 'node') return
        const source = graphRef.current.nodes.find((entry) => entry.id === current.id)
        if (!source) return
        const copy = {
          id: makeId('n'),
          type: source.type,
          x: source.x + 32,
          y: source.y + 32,
          title: source.title + ' ' + t('inspector.duplicate'),
          params: Object.assign({}, source.params),
        }
        dispatch({ type: 'mutate', update: (latest) => Object.assign({}, latest, { nodes: latest.nodes.concat(copy) }) })
        setSelection({ kind: 'node', id: copy.id })
        setTab('props')
        notify(t('toast.nodeAdded', { name: copy.title }), 'success')
      }, [notify, t])

      const removeEdgeById = useCallback(
        (id) => {
          dispatch({ type: 'mutate', update: (latest) => removeEdge(latest, id) })
          setSelection(null)
          notify(t('toast.edgeDeleted'), 'success')
        },
        [notify, t],
      )

      const disconnectInputs = useCallback(
        (id) => {
          dispatch({
            type: 'mutate',
            update: (latest) => Object.assign({}, latest, { edges: latest.edges.filter((edge) => edge.to !== id) }),
          })
        },
        [],
      )

      const addFromPalette = useCallback(
        (type) => {
          const current = graphRef.current
          const selected =
            selectionRef.current && selectionRef.current.kind === 'node'
              ? current.nodes.find((entry) => entry.id === selectionRef.current.id)
              : null
          let x
          let y
          if (selected) {
            x = type === 'input' || selected.type === 'output' ? selected.x - 232 : selected.x + 232
            y = selected.y
          } else {
            const center = viewportCenterWorld()
            x = center.x - NODE_W / 2
            y = center.y - NODE_H / 2
          }
          const count = current.nodes.filter((entry) => entry.type === type).length + 1
          const node = createNode(type, Math.round(x / 8) * 8, Math.round(y / 8) * 8, {
            title: t('node.' + type) + ' ' + count,
          })
          let fromId = null
          if (
            selected &&
            type !== 'input' &&
            selected.type !== 'output' &&
            !current.edges.some((edge) => edge.from === selected.id)
          ) {
            fromId = selected.id
          }
          dispatch({ type: 'mutate', update: (latest) => addNode(latest, node, fromId) })
          setSelection({ kind: 'node', id: node.id })
          setTab('props')
          notify(t('toast.nodeAdded', { name: node.title }), 'success')
        },
        [notify, t, viewportCenterWorld],
      )

      const onCanvasPointerDown = (event) => {
        if (event.button !== 0 && event.button !== 1) return
        const target = event.target
        if (target && target.closest && target.closest('.nn-canvas-chrome, .nn-empty-card')) return
        if (target && target.closest && target.closest('.nn-node')) return
        setSelection(null)
        panRef.current = {
          pointerId: event.pointerId,
          clientX: event.clientX,
          clientY: event.clientY,
          x: viewRef.current.x,
          y: viewRef.current.y,
        }
        setPanning(true)
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch (_captureFailed) {
          /* pointer capture is best effort */
        }
        event.preventDefault()
      }

      const onCanvasPointerMove = (event) => {
        const pan = panRef.current
        if (!pan || pan.pointerId !== event.pointerId) return
        setView({
          zoom: viewRef.current.zoom,
          x: pan.x + (event.clientX - pan.clientX),
          y: pan.y + (event.clientY - pan.clientY),
        })
      }

      const onCanvasPointerUp = (event) => {
        if (!panRef.current) return
        panRef.current = null
        setPanning(false)
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch (_releaseFailed) {
          /* pointer capture is best effort */
        }
      }

      const loadTemplate = useCallback(
        (template) => {
          const nextGraph = template.build()
          dispatch({ type: 'replace', graph: nextGraph, history: true })
          setTemplatesOpen(false)
          setSelection(null)
          setConnect(null)
          notify(t('toast.templateLoaded', { name: t(template.titleKey) }), 'success')
          requestAnimationFrame(() => {
            requestAnimationFrame(fitView)
          })
        },
        [fitView, notify, t],
      )

      const clearGraph = useCallback(() => {
        dispatch({
          type: 'replace',
          graph: { name: t('graph.defaultName'), nodes: [], edges: [], training: Object.assign({}, DEFAULT_TRAINING) },
          history: true,
        })
        setSelection(null)
        setTemplatesOpen(false)
        notify(t('toast.cleared'), 'success')
      }, [notify, t])

      const exportJson = useCallback(() => {
        const current = graphRef.current
        const filename = fileSlug(current.name) + '.json'
        const payload = JSON.stringify(
          {
            format: 'nn-studio',
            version: 1,
            name: current.name,
            nodes: current.nodes,
            edges: current.edges,
            training: current.training,
          },
          null,
          2,
        )
        if (!downloadText(payload, filename, 'application/json')) {
          notify(t('toast.downloadFailed'), 'error')
          return
        }
        notify(t('toast.exported', { file: filename }), 'success')
      }, [notify, t])

      const importFile = async (event) => {
        const file = event.target.files && event.target.files[0]
        event.target.value = ''
        if (!file) return
        try {
          const text = await file.text()
          const parsed = JSON.parse(text)
          const nextGraph = normalizeGraph(parsed)
          if (!nextGraph) {
            notify(t('toast.invalidGraph'), 'error')
            return
          }
          dispatch({ type: 'replace', graph: nextGraph, history: true })
          setSelection(null)
          notify(t('toast.imported'), 'success')
          requestAnimationFrame(fitView)
        } catch (error) {
          notify(t('toast.importFailed', { reason: error && error.message ? error.message : 'JSON' }), 'error')
        }
      }

      const locateNode = useCallback(
        (id) => {
          setInspectorOpen(true)
          if (!id) {
            setTab('checks')
            return
          }
          focusNode(id)
          setTab('props')
        },
        [focusNode],
      )

      const showChecks = useCallback(() => {
        setInspectorOpen(true)
        setTab('checks')
      }, [])

      useEffect(() => {
        const onKeyDown = (event) => {
          const target = event.target
          const editable =
            target &&
            (target.tagName === 'INPUT' ||
              target.tagName === 'TEXTAREA' ||
              target.tagName === 'SELECT' ||
              target.isContentEditable)
          const mod = event.ctrlKey || event.metaKey
          const key = String(event.key || '').toLowerCase()
          if (mod && key === 'z') {
            if (editable) return
            event.preventDefault()
            dispatch({ type: event.shiftKey ? 'redo' : 'undo' })
            return
          }
          if (mod && key === 'y') {
            if (editable) return
            event.preventDefault()
            dispatch({ type: 'redo' })
            return
          }
          if (mod && key === 'd') {
            if (editable) return
            event.preventDefault()
            duplicateSelected()
            return
          }
          if (editable) return
          if (event.key === 'Delete' || event.key === 'Backspace') {
            if (selectionRef.current) {
              event.preventDefault()
              deleteSelected()
            }
            return
          }
          if (event.key === 'Escape') {
            setSelection(null)
            setConnect(null)
            setTemplatesOpen(false)
            return
          }
          if (key === 'f') {
            event.preventDefault()
            fitView()
          }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
      }, [deleteSelected, duplicateSelected, fitView])

      useEffect(() => {
        if (!selection) return
        if (selection.kind === 'node' && !graph.nodes.some((node) => node.id === selection.id)) setSelection(null)
        if (selection.kind === 'edge' && !graph.edges.some((edge) => edge.id === selection.id)) setSelection(null)
      }, [graph, selection])

      const nodes = graph.nodes
      const nodeById = new Map(nodes.map((node) => [node.id, node]))
      let minX = -600
      let minY = -600
      let maxX = 1200
      let maxY = 900
      if (nodes.length) {
        minX = Infinity
        minY = Infinity
        maxX = -Infinity
        maxY = -Infinity
        for (const node of nodes) {
          minX = Math.min(minX, node.x)
          minY = Math.min(minY, node.y)
          maxX = Math.max(maxX, node.x + NODE_W)
          maxY = Math.max(maxY, node.y + NODE_H)
        }
        minX -= 360
        minY -= 300
        maxX += 360
        maxY += 300
      }
      const edgeWidth = Math.max(1, maxX - minX)
      const edgeHeight = Math.max(1, maxY - minY)

      const renderEdge = (edge) => {
        const source = nodeById.get(edge.from)
        const target = nodeById.get(edge.to)
        if (!source || !target) return null
        const sx = source.x + NODE_W - minX
        const sy = source.y + NODE_H / 2 - minY
        const tx = target.x - minX
        const ty = target.y + NODE_H / 2 - minY
        const dx = Math.max(60, Math.abs(tx - sx) * 0.45)
        const path = `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`
        const selected = selection && selection.kind === 'edge' && selection.id === edge.id
        const color = selected ? 'var(--dsw-alias-brand-primary)' : NODE_SPECS[source.type].color
        return h(
          'g',
          { key: edge.id },
          h('path', {
            className: 'nn-edge' + (selected ? ' is-selected' : ''),
            d: path,
            stroke: color,
            markerEnd: 'url(#nn-arrow)',
          }),
          h('path', {
            className: 'nn-edge-hit',
            d: path,
            onPointerDown: (event) => event.stopPropagation(),
            onClick: (event) => {
              event.stopPropagation()
              setSelection({ kind: 'edge', id: edge.id })
            },
            onDoubleClick: (event) => {
              event.stopPropagation()
              removeEdgeById(edge.id)
            },
          }),
        )
      }

      const connectPath = connect
        ? (() => {
            const sx = connect.source.x * view.zoom + view.x
            const sy = connect.source.y * view.zoom + view.y
            const tx = connect.pointer.x * view.zoom + view.x
            const ty = connect.pointer.y * view.zoom + view.y
            const dx = Math.max(50, Math.abs(tx - sx) * 0.45)
            return `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`
          })()
        : null

      const statusTone = analysis.errorCount ? 'is-error' : analysis.warningCount ? 'is-warn' : ''
      const statusText = analysis.errorCount
        ? analysis.errorCount + ' ' + t('checks.errors')
        : analysis.warningCount
          ? analysis.warningCount + ' ' + t('checks.warnings')
          : t('checks.okTitle')

      return h(
        'div',
        { className: 'nn-studio' },
        h('style', null, CSS),
        h(
          'header',
          { className: 'nn-header' },
          h(
            'div',
            { className: 'nn-brand' },
            h('span', { className: 'nn-brand-mark' }, h(SidebarIcon, { size: 20, active: true })),
            h(
              'div',
              { className: 'nn-brand-text' },
              h(NameField, {
                value: graph.name,
                className: 'nn-name',
                placeholder: t('header.namePlaceholder'),
                label: t('header.namePlaceholder'),
                onCommit: (value) => dispatch({ type: 'mutate', update: (current) => Object.assign({}, current, { name: value }) }),
              }),
              h(
                'div',
                { className: 'nn-brand-meta' },
                h('span', null, graph.nodes.length + ' ' + t('model.layers')),
                h('span', null, '·'),
                h('span', null, formatCount(analysis.totalParams) + ' ' + t('param.count')),
                analysis.errorCount
                  ? h(
                      'button',
                      { type: 'button', className: 'nn-badge is-error is-button', onClick: showChecks },
                      analysis.errorCount + ' ' + t('checks.errors'),
                    )
                  : h('span', { className: 'nn-badge is-ok' }, t('checks.okTitle')),
              ),
            ),
          ),
          h(
            'div',
            { className: 'nn-toolbar' },
            h(Button, {
              icon: 'undo',
              variant: 'icon',
              title: t('header.undo'),
              disabled: !state.past.length,
              onClick: () => dispatch({ type: 'undo' }),
            }),
            h(Button, {
              icon: 'redo',
              variant: 'icon',
              title: t('header.redo'),
              disabled: !state.future.length,
              onClick: () => dispatch({ type: 'redo' }),
            }),
            h(Button, {
              icon: 'template',
              label: t('header.templates'),
              onClick: () => setTemplatesOpen(true),
            }),
            h(Button, {
              icon: 'import',
              label: t('header.import'),
              onClick: () => fileRef.current && fileRef.current.click(),
            }),
            h(Button, { icon: 'export', label: t('header.export'), title: t('header.exportJson'), onClick: exportJson }),
            h(Button, {
              icon: 'panelLeft',
              variant: 'icon',
              title: t('header.palette'),
              active: paletteOpen,
              pressed: paletteOpen,
              onClick: () => setPaletteOpen((value) => !value),
            }),
            h(Button, {
              icon: 'panelRight',
              variant: 'icon',
              title: t('header.inspector'),
              active: inspectorOpen,
              pressed: inspectorOpen,
              onClick: () => setInspectorOpen((value) => !value),
            }),
          ),
          h('input', {
            ref: fileRef,
            type: 'file',
            accept: '.json,application/json',
            style: { display: 'none' },
            onChange: importFile,
          }),
        ),
        h(
          'div',
          { className: 'nn-body' },
          paletteOpen ? h(Palette, { onAdd: addFromPalette }) : null,
          h(
            'div',
            {
              className: 'nn-canvas' + (panning ? ' is-panning' : '') + (connect ? ' is-connecting' : ''),
              ref: canvasRef,
              style: {
                backgroundSize: 22 * view.zoom + 'px ' + 22 * view.zoom + 'px',
                backgroundPosition: view.x + 'px ' + view.y + 'px',
              },
              onPointerDown: onCanvasPointerDown,
              onPointerMove: onCanvasPointerMove,
              onPointerUp: onCanvasPointerUp,
              onPointerCancel: onCanvasPointerUp,
            },
            h(
              'div',
              {
                className: 'nn-world',
                style: { transform: 'translate(' + view.x + 'px, ' + view.y + 'px) scale(' + view.zoom + ')' },
              },
              graph.edges.length
                ? h(
                    'svg',
                    {
                      className: 'nn-edges',
                      width: edgeWidth,
                      height: edgeHeight,
                      style: { left: minX, top: minY },
                      'aria-hidden': true,
                    },
                    h(
                      'defs',
                      null,
                      h(
                        'marker',
                        {
                          id: 'nn-arrow',
                          viewBox: '0 0 10 10',
                          refX: 8,
                          refY: 5,
                          markerWidth: 7,
                          markerHeight: 7,
                          orient: 'auto-start-reverse',
                        },
                        h('path', { d: 'M 0 0 L 10 5 L 0 10 z', fill: 'context-stroke' }),
                      ),
                    ),
                    graph.edges.map(renderEdge),
                  )
                : null,
              nodes.map((node) =>
                h(NodeCard, {
                  key: node.id,
                  node,
                  analysis,
                  zoom: view.zoom,
                  selected: Boolean(selection && selection.kind === 'node' && selection.id === node.id),
                  onSelect: handleSelectNode,
                  onDragStart: beginNodeDrag,
                  onMove: moveNodeCard,
                  onDragEnd: endNodeDrag,
                  onStartConnect: handleStartConnect,
                }),
              ),
            ),
            nodes.length
              ? null
              : h(
                  'div',
                  { className: 'nn-canvas-empty' },
                  h(
                    'div',
                    { className: 'nn-empty-card' },
                    h(Icon, { name: 'spark', size: 28 }),
                    h('strong', null, t('canvas.empty')),
                    h('p', null, t('canvas.emptyHint')),
                    h(Button, { variant: 'primary', label: t('canvas.loadTemplate'), onClick: () => setTemplatesOpen(true) }),
                  ),
                ),
            connect
              ? h(
                  'svg',
                  { className: 'nn-connect-layer', 'aria-hidden': true },
                  h('path', {
                    d: connectPath,
                    fill: 'none',
                    stroke: 'var(--dsw-alias-brand-primary)',
                    strokeWidth: 2,
                    strokeDasharray: '5 4',
                  }),
                )
              : null,
            connect ? h('div', { className: 'nn-connecting-chip' }, h(Icon, { name: 'spark', size: 12 }), t('canvas.connecting')) : null,
            h(
              'div',
              { className: 'nn-canvas-chrome' },
              h(Button, {
                icon: 'minus',
                variant: 'icon',
                title: t('header.zoomOut'),
                onClick: () => zoomBy(1 / 1.2),
              }),
              h('span', { className: 'nn-zoom-label' }, Math.round(view.zoom * 100) + '%'),
              h(Button, {
                icon: 'plus',
                variant: 'icon',
                title: t('header.zoomIn'),
                onClick: () => zoomBy(1.2),
              }),
              h(Button, { icon: 'fit', variant: 'icon', title: t('header.fit'), onClick: fitView }),
            ),
          ),
          inspectorOpen
            ? h(Inspector, {
                graph,
                analysis,
                selection,
                tab,
                onTab: setTab,
                onUpdateParam: updateNodeParam,
                onUpdateTitle: updateNodeTitle,
                onDuplicate: duplicateSelected,
                onDelete: deleteSelected,
                onDeleteEdge: removeEdgeById,
                onDisconnect: disconnectInputs,
                onLocate: locateNode,
                onTraining: updateTraining,
                framework,
                onFramework: setFramework,
                codeSection,
                onCodeSection: setCodeSection,
                notify,
              })
            : null,
        ),
        h(
          'footer',
          { className: 'nn-footer' },
          h(
            'button',
            { type: 'button', className: 'nn-status-btn', onClick: showChecks },
            h('span', { className: 'nn-status-dot' + (statusTone ? ' ' + statusTone : '') }),
            statusText,
          ),
          h('span', { className: 'nn-grow' }, t('canvas.hint')),
          h('span', { className: 'nn-footer-item' }, graph.nodes.length + ' ' + t('model.layers')),
          h('span', { className: 'nn-footer-item' }, compactCount(analysis.totalParams) + ' ' + t('param.count')),
          h('span', { className: 'nn-footer-item' }, Math.round(view.zoom * 100) + '%'),
        ),
        templatesOpen ? h(TemplatesDialog, { onUse: loadTemplate, onClose: () => setTemplatesOpen(false) }) : null,
        toast
          ? h(
              'div',
              {
                className: 'nn-toast is-' + (toast.tone || 'info'),
                role: 'status',
                'aria-live': 'polite',
                key: toast.id,
              },
              toast.text,
            )
          : null,
      )
    }

    /* ------------------------------------------------------------------ *
     * Boundary and plugin
     * ------------------------------------------------------------------ */

    /**
     * Contain a render failure so the slot stays alive.
     */
    class Boundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = { error: null }
      }

      static getDerivedStateFromError(error) {
        return { error }
      }

      render() {
        if (this.state.error) {
          const message = (this.state.error && this.state.error.message) || String(this.state.error)
          return h('div', { className: 'nn-boundary' }, 'Neural Network Studio failed to render: ' + message)
        }
        return this.props.children
      }
    }

    /**
     * Render the studio behind an error boundary.
     * @returns the guarded studio.
     */
    function StudioBoundary() {
      return h(Boundary, null, h(Studio))
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        I18N = { t: makeTranslator(ctx) }
        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: PANEL_ID,
              order: 23,
              label: () => I18N.t('nav.title'),
            },
            SidebarIcon,
          ),
        )
        ctx.slots.inject('main', () =>
          ctx.slots.register({ name: 'main', key: PANEL_ID }, StudioBoundary),
        )
      },
    }
  },
})
