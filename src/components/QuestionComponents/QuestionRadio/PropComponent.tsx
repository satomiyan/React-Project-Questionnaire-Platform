import React, { FC, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { QuestionRadioPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])

  function handleValuesChange() {
    if (!onChange) return

    const newValues = form.getFieldsValue() as QuestionRadioPropsType

    if (newValues.options) {
      // remove options with undefined text
      newValues.options = newValues.options.filter(opt => !(opt.text == null))
    }

    const { options = [] } = newValues
    options.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5)
    })

    onChange(newValues)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter a title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Options">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: 'Please enter option text' },
                      {
                        validator: (_, text) => {
                          const { options = [] } = form.getFieldsValue()
                          let num = 0
                          options.forEach((opt: OptionType) => {
                            if (opt.text === text) num++
                          })
                          if (num === 1) return Promise.resolve()
                          return Promise.reject(new Error('Duplicate option text'))
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Enter option text..." />
                  </Form.Item>

                  {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="Default Selected" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({
            value,
            label: text || '',
          }))}
        />
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Vertical Layout</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
