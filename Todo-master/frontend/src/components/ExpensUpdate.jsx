import React from 'react'
import { usePutRequest } from '../hooks/request'
import { EXPENS_DETAIL } from '../urls'
import ExpensForm from './ExpensForm'


export default function ExpensUpdate({ item, onUpdate }) {
    const update = usePutRequest({ url: EXPENS_DETAIL.replace('{id}', item.id) })

    async function handleUpdate(data) {
        await update.request({ data })
        onUpdate()
    }

    return (
        <ExpensForm item={item} onSubmit={handleUpdate} initialValues={item} />
    )
}
