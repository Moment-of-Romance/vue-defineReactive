/**
 * Dep 收集依赖
 */
let uid = 0
export default class Dep {
    constructor() {
        console.log('Dep 构造器~~')
        this.subs = []
        this.id = uid++
    }
    //添加依赖
    addSub(sub) {
        this.subs.push(sub)
    }
    //收集依赖
    depend() {
        //如果全局的Dep.target 上有 watcher 就收集
        if(Dep.target) {
            Dep.target.addDep(this)
        }
    }
    //触发所有 watcher 的update 方法
    notify() {
        //拷贝一份
        let subs = this.subs.slice()
        subs.forEach(watcher => {
            watcher.update()
        })
    }
    //删除 依赖
    remove(sub) {
        for(let i = 0, l = this.subs.length; i < l; i++) {
            if(this.subs[i] == sub) {
                this.subs.splice(i, 1)
            }
        }
    }
}

Dep.target = null