//导入observe
import Dep from './dep.js'
import observe from './observe.js'

export default function defineReactive(data, key, value) {
    console.log(data)
    // 初始化一个Dep
    let dep = new Dep()
    //如果参数是两个
    if(arguments.length == 2) value = data[key]
    //利用Object.defineProperty
    let childOb = observe(value)
    Object.defineProperty(data, key, {
        //可枚举
        enumerable: true,
        //可删除
        configurable: true,
        //get
        get() {
            console.log('你试图获取属性：' + key)
            //收集依赖
            if(Dep.target) {
                console.log('*******收集到依赖了')
                dep.depend()
                if(childOb) {
                    childOb.dep.depend()
                }
            }
            return value
        },
        //set
        set(newValue) {
            console.log('你试图修改属性：' + key)
            if(value !== newValue) value = newValue
            //将新的属性转为响应式数据
            childOb = observe(newValue)
            //触发更新函数
            dep.notify()
        }
    })
}