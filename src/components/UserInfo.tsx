import React, { FC } from 'react'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
// import { useRequest } from 'ahooks'
import { LOGIN_PATHNAME } from '../router'
// import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  // const { data } = useRequest(getUserInfoService) // ajax
  // const { username, nickname } = data || {}
  const { username, nickname } = useGetUserInfo() // 从 redux 中获取用户信息

  function logout() {
    dispatch(logoutReducer()) // 清空了 redux user 数据
    removeToken() // 清除 token 的存储
    message.success('logout successfully')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        logout
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>login</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
