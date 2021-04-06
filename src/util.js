export function def(data, key, value, enumerable) {
    Object.defineProperty(data, key, {
        enumerable: !!enumerable,
        value: value,
        //可写
        writable: true,
        //可删除
        configurable: true
    })
}