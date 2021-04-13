/**
 * 将一个 对象 obj 转换成响应式数据
 */
import defineReactive from './defineReactive.js'
import observe from './observe.js'
//导入 Watcher
import Watcher from './watcher.js'
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
// obj.dreams.sport.football = 'A++'
// console.log(obj)

/**
 * 测试 watcher
 */
new Watcher(obj, 'dreams.sport.football', function(newValue, oldValue) {
    console.log('&&&&&&&&&&&&&&&')
    console.log('football 的值由' + oldValue + '变成了' + newValue)
    console.log('&&&&&&&&&&&&&&&&&&&&')
})
obj.dreams.sport.football = 'A0000'

//测试 数组侦听
// obj.loveMovies.push('英雄本色')

//测试下map 的遍历方式
// let map = new Map()
// map.set('name', 'jjj')
// map.set('age', 20)
// console.log(map)
// for(let key of map) {
//     console.log(key)
// }

/**
 * 测试下 window.postMessage()
 * otherWindow.postMessage(message, targetOrigin, [transfer]);
 */

//获取button
let btn = document.querySelector('.openOtherWindow')
console.log(btn)
//绑定点击事件
btn.addEventListener('click', function() {
    let otherWindow = window.open('http://localhost:8080/')
    console.log(otherWindow)
    otherWindow.postMessage('Hi wo shi 8081 端口发过来的信息,请查收~', 'http://localhost:8081/')
}, false)

window.addEventListener('message', function(e) {
    console.log('我在8081端口接受到了了信息:', e.data)
}, false)
