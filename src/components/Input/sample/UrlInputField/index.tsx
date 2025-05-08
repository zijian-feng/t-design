import Input from '../..'
import UrlInputFieldWrapper from './wrapper'

const UrlInputField = () => {
  return (
    <UrlInputFieldWrapper align="center">
      <Input
        placeholder="请输入内容"
        before="https://"
        after=".com"
        fillAfter
      />
    </UrlInputFieldWrapper>
  )
}

export default UrlInputField
