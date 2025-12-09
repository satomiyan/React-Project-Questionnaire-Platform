export type OptionType = {
  value: string
  text: string
  checked: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]

  // For PropComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: 'Checkbox Title',
  isVertical: false,
  list: [
    { value: 'item1', text: 'Option 1', checked: false },
    { value: 'item2', text: 'Option 2', checked: false },
    { value: 'item3', text: 'Option 3', checked: false },
  ],
}

// Property type for the statistics component
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
