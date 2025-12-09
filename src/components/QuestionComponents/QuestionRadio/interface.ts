export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string

  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: 'Radio Title',
  isVertical: false,
  options: [
    { value: 'item1', text: 'Option 1' },
    { value: 'item2', text: 'Option 2' },
    { value: 'item3', text: 'Option 3' },
  ],
  value: '',
}

// Stat component props
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
