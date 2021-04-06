//导入defineReactive
import defineReactive from './defineReactive.js'
import {def} from './util.js'

export default class Observer {
    constructor(data) {
        console.log('Observer 构造器：', data)
        //将 Observer实例挂在到 data 上 且__ob__属性不可枚举
        def(data, '__ob__', this, false)
        if(Array.isArray(data)) {
            this.arrayObserve(data)
        } else {
            //将对象转换成响应式数据
            this.walk(data)
        }
    }
    //处理对象的方法
    walk(data) {
        //遍历
        for(let key in data) {
            defineReactive(data, key)
        }
    }
    //处理数组的方法
    arrayObserve() {

    }
}