//导入observe
import observe from './observe.js'

export default function defineReactive(data, key, value) {
    console.log(data)
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
            return value
        },
        //set
        set(newValue) {
            console.log('你试图修改属性：' + key)
            if(value !== newValue) value = newValue
            //将新的属性转为响应式数据
            childOb = observe(newValue)
        }
    })
}