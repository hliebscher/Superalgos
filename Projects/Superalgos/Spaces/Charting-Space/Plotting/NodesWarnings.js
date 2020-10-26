function newNodesWarnings() {
    const MODULE_NAME = 'Nodes Warnings'
    const logger = newWebDebugLog()
    logger.fileName = MODULE_NAME

    let thisObject = {
        onRecordChange: onRecordChange,
        initialize: initialize,
        finalize: finalize
    }
    let hiriarchyMap
    return thisObject

    function finalize() {
        hiriarchyMap = undefined
    }

    function initialize(pRootNode) {
        let rootNode = UI.projects.superalgos.spaces.designSpace.workspace.getHierarchyHeadsById(pRootNode.id)
        hiriarchyMap = UI.projects.superalgos.utilities.hierarchy.getHiriarchyMap(rootNode)
    }

    function onRecordChange(currentRecord) {
        if (currentRecord === undefined) { return }
        let array = currentRecord.warnings
        if (array === undefined) { return }
        for (let i = 0; i < array.length; i++) {
            let arrayItem = array[i]
            let nodeId = arrayItem[0]
            let value = arrayItem[1]
            applyValue(nodeId, value)
        }
    }

    function applyValue(nodeId, value) {
        if (UI.projects.superalgos.spaces.chartingSpace.visible !== true) { return }
        let node = hiriarchyMap.get(nodeId)
        if (node === undefined) { return }
        if (node.payload === undefined) { return }
        if (node.payload.uiObject === undefined) { return }
        if (value === '') {
            node.payload.uiObject.resetWarningMessage()
        } else {
            node.payload.uiObject.setWarningMessage(value, 10)
        }
    }
}
