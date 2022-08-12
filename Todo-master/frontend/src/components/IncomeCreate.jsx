import React from 'react'
import { usePostRequest } from '../hooks/request'
import { EXPENS_LIST, INCOME_LIST } from '../urls'
import { auth } from '../utils/auth'
import IncomeForm from './IncomeForm'


export default function IncomeCreate({ onSuccess, todo }) {
    const create = usePostRequest({ url: INCOME_LIST, params: { todo }, ...auth() })

    async function onCreate(data) {
        await create.request({ data: { ...data, todo } })
        onSuccess()
    }

    return (
        <IncomeForm onSubmit={onCreate} loading={create.loading} />
    )
}
