/**
 *  @description emit实现入口
 */
export function emit(
  // 组件实例
  instance: ComponentInternalInstance,
  // 触发事件
  event: string,
  // 剩余参数
  ...rawArgs: any[]
) {
  if (instance.isUnmounted) return;
  // 获取实例上的props
  const props = instance.vnode.props || EMPTY_OBJ;

  let args = rawArgs;
  // 开始是update: 是v-model的绑定事件
  const isModelListener = event.startsWith('update:');

  // for v-model update:xxx events, apply modifiers on args
  // 通过slice 截取正常事件名称
  const modelArg = isModelListener && event.slice(7);
  // 属性存在 && 属性在props中
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === 'modelValue' ? 'model' : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map(a => a.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }

  if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
    devtoolsComponentEmit(instance, event, args);
  }

  let handlerName;
  // 通过emit触发的事件
  let handler =
    props[(handlerName = toHandlerKey(event))] ||
    // also try camelCase event handler (#2249)
    props[(handlerName = toHandlerKey(camelize(event)))];
  // for v-model update:xxx events, also trigger kebab-case equivalent
  // for props passed via kebab-case
  if (!handler && isModelListener) {
    handler = props[(handlerName = toHandlerKey(hyphenate(event)))];
  }

  // 进行事件执行
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, ErrorCodes.COMPONENT_EVENT_HANDLER, args);
  }

  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {} as Record<any, boolean>;
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, ErrorCodes.COMPONENT_EVENT_HANDLER, args);
  }

  if (__COMPAT__) {
    compatModelEmit(instance, event, args);
    return compatInstanceEmit(instance, event, args);
  }
}
