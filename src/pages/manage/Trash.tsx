import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { updateQuestionService, deleteQuestionsService } from '../../services/question'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('Sedona Questionnaire - Trash')

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  // Selected IDs
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Recover
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('Recovered successfully')
        refresh()
        setSelectedIds([])
      },
    }
  )

  // Delete permanently
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success('Deleted permanently')
        refresh()
        setSelectedIds([])
      },
    }
  )

  function del() {
    confirm({
      title: 'Are you sure you want to permanently delete these surveys?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone once deleted.',
      onOk: deleteQuestion,
    })
  }

  const tableColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">Published</Tag>
        ) : (
          <Tag>Unpublished</Tag>
        )
      },
    },
    {
      title: 'Responses',
      dataIndex: 'answerCount',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
  ]

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            Recover
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            Delete Permanently
          </Button>
        </Space>
      </div>

      <div style={{ border: '1px solid #e8e8e8' }}>
        <Table
          dataSource={list}
          columns={tableColumns}
          pagination={false}
          rowKey={q => q._id}
          rowSelection={{
            type: 'checkbox',
            onChange: selectedRowKeys => {
              setSelectedIds(selectedRowKeys as string[])
            },
          }}
        />
      </div>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>Trash</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}

        {!loading && list.length === 0 && <Empty description="No data available" />}

        {list.length > 0 && TableElem}
      </div>

      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
