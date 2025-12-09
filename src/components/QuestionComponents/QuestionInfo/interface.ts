export type QuestionInfoPropsType = {
  title?: string
  desc?: string

  // For PropComponent
  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: 'Survey Title',
  desc: 'Survey Description',
}
