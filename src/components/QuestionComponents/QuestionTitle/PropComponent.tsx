import React, { FC, useEffect } from 'react'
import { Form, Input, Select, Checkbox } from 'antd'
import { QuestionTitlePropsType } from './interface'

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter,
    })
  }, [text, level, isCenter])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{ text, level, isCenter }}
      disabled={disabled}
    >
      <Form.Item
        label="Title Text"
        name="text"
        rules={[{ required: true, message: 'Please enter title text' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Heading Level" name="level">
        <Select
          options={[
            { value: 1, text: 'H1' },
            { value: 2, text: 'H2' },
            { value: 3, text: 'H3' },
          ]}
        />
      </Form.Item>

      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>Center Align</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
