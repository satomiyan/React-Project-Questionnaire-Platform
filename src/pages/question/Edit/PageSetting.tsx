import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const { TextArea } = Input

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="Survey Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the survey title' }]}
      >
        <Input placeholder="Enter the title" />
      </Form.Item>

      <Form.Item label="Survey Description" name="desc">
        <TextArea placeholder="Description..." />
      </Form.Item>

      <Form.Item label="Custom CSS" name="css">
        <TextArea placeholder="Enter custom CSS..." />
      </Form.Item>

      <Form.Item label="Custom JavaScript" name="js">
        <TextArea placeholder="Enter custom JavaScript..." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
