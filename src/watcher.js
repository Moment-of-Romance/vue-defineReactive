import Dep from "./dep"

/**
 * Watcher
 */
let $uid = 0
let targetStack = []
export default class Watcher {
    constructor(vm, expOrFn, cb) {
        console.log('Watcher 构造器@@@')
        this.id = $uid++
        // 将观察者加进来
        this.deps = []
        this.depIds = new Set()
        this.vm = vm
        this.cb = cb
        this.getter = typeof expOrFn === 'function'
                      ? expOrFn
                      : parsePath(expOrFn)
        this.value = this.get()
    }
    //获取属性
    get() {
        //将 watcher 自身实例挂载到 Dep.target 上
        pushTargetStack(this)
        let vm = this.vm
        //获取 值
        let value = this.getter.call(vm, vm)
        //深度依赖
        traverse(value)
        //将Dep.target清空
        popTargetStack()
        return value
    }
    // 添加观察者
    addDep(dep) {
        let id = dep.id
        //如果没有该 id
        if(!this.depIds.has(id)) {
            this.depIds.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
    //更新函数
    update() {
        this.run()
    }
    //run
    run() {
        //获取更新后的值
        let value = this.get()
        //取 旧值
        let oldValue = this.value
        //将value 赋值为新的值
        this.value = value
        this.cb.call(this.vm, value, oldValue)
    }
}

/**
 * 
 * @param {String} path 
 * 将a.b.c.d 形式的字符换 转换成 a[b][c][d] 
 */
function parsePath(path) {
    let splitStr = path.split('.')
    console.log(splitStr)
    //返回一个 方法， 方法接受一个对象 为参数
    return function(obj) {
        if(!obj) return
        //遍历 splitStr
        for(let i = 0; i < splitStr.length; i++) {
            obj = obj[splitStr[i]]
        }
        return obj
    }
}

function traverse(value) {
    console.log(value)
}

function pushTargetStack(_target) {
    if(Dep.target) targetStack.push(Dep.target)
    Dep.target = _target
}

function popTargetStack() {
    Dep.target = targetStack.pop()
}