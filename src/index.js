/**
 * 将一个 对象 obj 转换成响应式数据
 */
import defineReactive from './defineReactive.js'
import observe from './observe.js'

const obj = {
    name: 'dyc',
    age: 20,
    dreams: {
        sport: {
            football: 'A',
            basketball: 'B'
        }
    }
}

observe(obj)
obj.dreams.sport.football = 'A++'
console.log(obj)

//测试下map 的遍历方式
// let map = new Map()
// map.set('name', 'jjj')
// map.set('age', 20)
// console.log(map)
// for(let key of map) {
//     console.log(key)
// }

