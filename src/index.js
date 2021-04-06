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
    },
    //添加测试数组
    loveMovies: [
        '这个杀手不太冷',
        '大话西游'
    ]
}

observe(obj)
obj.dreams.sport.football = 'A++'
console.log(obj)

//测试 数组侦听
obj.loveMovies.push('英雄本色')

//测试下map 的遍历方式
// let map = new Map()
// map.set('name', 'jjj')
// map.set('age', 20)
// console.log(map)
// for(let key of map) {
//     console.log(key)
// }

