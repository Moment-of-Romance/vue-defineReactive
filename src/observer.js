//导入defineReactive
import defineReactive from './defineReactive.js'
import {def} from './util.js'
//导入数组的方法
import {arrayMethods} from './array.js'
import observe from './observe.js'

//导入 Dep
import Dep from './dep.js'

export default class Observer {
    constructor(data) {
        console.log('Observer 构造器：', data)
        //初始化 dep
        this.dep = new Dep()
        //将 Observer实例挂在到 data 上 且__ob__属性不可枚举
        def(data, '__ob__', this, false)
        if(Array.isArray(data)) {
            //改写数组的 原型
            Object.setPrototypeOf(data, arrayMethods)
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
    arrayObserve(data) {
        //遍历数组 将数组的每一项设置为 响应式
        for(let i = 0, l = data.length; i < l; i++) {
            observe(data[i])
        }
    }
}