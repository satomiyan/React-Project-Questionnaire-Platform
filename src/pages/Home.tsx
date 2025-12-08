import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'

import axios from 'axios'
// import '../_mock/index.ts'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>Questionnaire Survey | Online Voting</Title>
        <Paragraph>
          A total of 100 questionnaires created, 90 published, and 980 responses collected.
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
