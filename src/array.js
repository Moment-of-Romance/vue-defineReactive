const { def } = require("./util")

const arrayProto = Array.prototype

export const arrayMethods = Object.create(arrayProto)

//改写数组原型上的 7个方法
const METHODS_TO_CHANGE = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

//遍历 需要改写数组
METHODS_TO_CHANGE.forEach(method => {
    //缓存原来的方法
    let original = arrayProto[method]
    //重写 arrayMethods
    def(arrayMethods, method, function mutator() {
        console.log('***数组的'+ method +'方法被侦听到了***')
        //先调用 原来的方法
        let result = original.apply(this, arguments)
        //将参数对象转成数组 方便后面 判断参数
        let args = [].slice.call(arguments)
        //存储 数组方法中的参数
        let insert
        //获取这个数组的 __ob__属性
        let ob = this.__ob__

        //判断方法
        switch(method) {
            case 'push':
            case 'unshift':
                insert = args
                break
            //splice 的方法 接受的 第一个参数为 下标，第二个参数为 删除几个，之后的参数为需要替换的选项
            case 'splice':
                insert = args.slice(2)
                break
        }

        // 若insert 有值则转为响应式数据,使用数组的 arrayObserve
        if(insert) ob.arrayObserve(insert)


        //将原方法的结果返回
        return result

    })
})