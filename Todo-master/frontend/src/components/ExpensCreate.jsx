import React from 'react'
import { usePostRequest } from '../hooks/request'
import { EXPENS_LIST } from '../urls'
import { auth } from '../utils/auth'
import ExpensForm from './ExpensForm'


export default function ExpensCreate({ onSuccess, todo }) {
    const create = usePostRequest({ url: EXPENS_LIST, params: { todo }, ...auth() })

    async function onCreate(data) {
        await create.request({ data: { ...data, todo } })
        onSuccess()
    }

    return (
        <ExpensForm onSubmit={onCreate} loading={create.loading} />
    )
}
