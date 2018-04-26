// const config = require('./config').default
// const axios = require('axios')
// import {getKey, getPoolInfo} from "./local";

export async function API_testToken(data) {
  const ip = await config.getIp(2)
  const url = `${ip}api/TestToken`
  const headers = config.createHeaders(url)

  return axios.post(url, data, {
    headers
  })
}

// 获取盘口下注标签
export async function API_tags() {
  const ip = await config.getIp(2)
  const url = `${ip}api/BaseInfo/Tags`
  const headers = config.createHeaders(url)

  return axios.get(url, {
    headers
  })
}

// 获取活动彩池
// 拿到 odd 字段
export async function API_getActivePools() {
  const ip = await config.getIp(2)
  const url = `${ip}api/Pool/Actives`
  const headers = config.createHeaders(url)

  return axios.get(url, {
    headers
  })
}

// 向后台发送用户下注信息
export async function API_postBetByUser(data) {
  const ip = await config.getIp(2)
  const u_id = getKey().uid
  const pool_id = getPoolInfo()
  const url = `${ip}api/Bet/Pool/${pool_id}/ByUser/${u_id}`
  const headers = config.createHeaders(url)

  return axios.post(url, data, {
    headers
  })
}

// 获取用户的下注记录
// 参数： 起始 结束时间、起始位置和展示数目
export async function API_getBetRecords(startTime, endTime, startIndex, count) {
  const ip = await config.getIp(2)
  const u_id = getKey().uid
  const url = `${ip}api/Bet/ByUser/${u_id}?startdate=${startTime}&enddate=${endTime}&startindex=${startIndex}&count=${count}`
  const headers = config.createHeaders(url)

  return axios.get(url, {
    headers
  })
}
