module.exports = function (): import('@babel/core').PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const forbiddenAttrs = state.opts.props || []

                path.traverse({
                    JSXIdentifier(current) {
                        const nodeName = current.node.name

                        if (forbiddenAttrs.includes(nodeName)) {
                            current.parentPath.remove()
                        }
                    },
                })
            },
        },
    }
}
