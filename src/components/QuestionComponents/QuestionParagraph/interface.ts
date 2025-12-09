export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean

  // 用于 PropComponent
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: 'one line paragraph',
  isCenter: false,
}
