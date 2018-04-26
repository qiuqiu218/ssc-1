import {API_getActivePools} from '../api/ssc'
import moment from 'moment'

// 从接口获取倒计时
// 本地使用 mock 数据
// export const getCountDown = async () => {
//   try {
//     let getLeftTime = await API_getActivePools()
//     getLeftTime = getLeftTime.data
//
//     if (!getLeftTime.actionResult) {
//       return {
//         code: 500,
//         message: getLeftTime.message
//       }
//     } else {
//       //  1. 这里需要继续调用房间列表接口，不过这里没有实现，所以暂时写死
//       localStorage.setItem('pool_id', '24f039b0-4220-11e8-9a06-0585bf5b0416')
//
//       // 2. 这里 data[0] 只是模拟，后改成房间列表索引值
//       let pool_update_interval = getLeftTime.data[0].pool_update_interval / 1000
//       localStorage.setItem('pool_update_interval', pool_update_interval)
//
//       let now = new Date().getTime()
//       let nextUpdate = getLeftTime.data[0].pool_next_update
//       let nextTime = moment(nextUpdate).format('X') * 1000
//
//       // 3. momentjs获取的时间戳是秒， getTime方法获取的是毫秒
//       this.leftTime = (nextTime - now) / 1000
//
//       this._getInterval()
//     }
//   } catch (err) {
//     return {
//       code: 500,
//       message: JSON.stringify(err)
//     }
//   }
// }
