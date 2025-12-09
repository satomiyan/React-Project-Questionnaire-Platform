import React, { FC } from 'react'
import { Form, Input, Checkbox, Space, Button } from 'antd'
import { nanoid } from 'nanoid'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { QuestionCheckboxPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], onChange, disabled } = props
  const [form] = Form.useForm()

  function handleValuesChange() {
    if (onChange == null) return

    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType

    if (newValues.list) {
      newValues.list = newValues.list.filter(opt => !(opt.text == null))
    }

    const { list = [] } = newValues
    list.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5)
    })

    onChange(newValues)
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      {/* Title */}
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter a title' }]}
      >
        <Input />
      </Form.Item>

      {/* Options */}
      <Form.Item label="Options">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* Loop through options */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* Checkbox */}
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>

                    {/* Text input for option */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: 'Please enter option text' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((opt: OptionType) => {
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

                    {/* Remove option button */}
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}

              {/* Add option */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '', checked: false })}
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

      {/* Vertical arrangement */}
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Arrange vertically</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
