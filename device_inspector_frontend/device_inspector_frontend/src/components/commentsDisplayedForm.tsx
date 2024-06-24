import { Button, Card, Empty, Form, Input, List, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { TComment } from '../types/commentType'
// eslint-disable-next-line @stylistic/max-len
import useCommentsHandler from '../features/inspectionsHistory/hooks/useCommentsHandler'

type CommentDisplayedFormProps = {
  inspectionId: number
}

export const CommentsDisplayedForm: React.FC<CommentDisplayedFormProps> = (
  {inspectionId}
) => {
  const {
    comments,
    commentsStatus,
    addComment,
    commentsRefetch,
  } = useCommentsHandler(inspectionId)

  useEffect(() => {
    commentsRefetch()
    return () => {}
  }, [commentsStatus, commentsRefetch])

  return (<>
    <CommentDisplay 
      status={commentsStatus} 
      comments={comments}/>
    <InspectionCommentForm handlePost={addComment}/>
  </>
  )
}

type CommentDisplayProps = {
  comments?: TComment[]
  status: 'idle' | 'success' | 'error' | 'loading'
}

const CommentDisplay: React.FC<CommentDisplayProps> = (
  {comments, status}
) => {
  if (status === 'loading' || comments === undefined) return <Spin/>
  if (comments.length === 0 ) return <Empty/>

  return <>
    <Card title='Комментарии'
    >
      <div 
        style={{maxHeight: '250px', overflow: 'scroll'}}>
        <List
          dataSource={comments.reverse()}
          renderItem={item => <List.Item>
            <Card style={{width: '100%'}}>{item.text}</Card>
          </List.Item>}
        />
      </div>
    </Card>
  </>
}

type InspectionCommentFormProps = {
  handlePost: (val: TComment) => void
}

const InspectionCommentForm: React.FC<InspectionCommentFormProps> = (
  {handlePost}
) => {
  const [message, setMessage] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState(true)

  const handleSubmit = () => {
    handlePost({text: message})
    setMessage('')
  }

  useEffect(() => {
    if  (message === '') setIsDisabled(true)
    if (message !== '') 
      setIsDisabled(false)
    return () => {}
  }, [message])
  

  return <Card style={{margin: '16px'}} size='small' title='Коментарий'>
    <Form labelAlign={'left'} layout="vertical">
      <Input.TextArea 
        allowClear 
        showCount 
        value={message} 
        onChange={val => setMessage(val.target.value)}>
      </Input.TextArea>
      <Button type='primary'
        disabled={isDisabled}
        onClick={handleSubmit}>
        Отправить
      </Button>
    </Form>
  </Card>
}