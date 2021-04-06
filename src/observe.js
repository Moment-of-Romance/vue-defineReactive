import Observer from './observer.js'

export default function observe(data) {
    //如果 data 不是对象则 return
    if(typeof data !== 'object' || data === null) return
    //判断 data 属性上是否存在Observer 实例
    let ob
    if(typeof data.__ob__ !== 'undefined') {
        ob = data.__ob__
    } else {
        ob = new Observer(data)
    }
    return ob
}