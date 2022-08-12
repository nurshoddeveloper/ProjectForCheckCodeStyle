import React from 'react'
import { usePutRequest } from '../hooks/request'
import { INCOME_DETAIL } from '../urls'
import IncomeForm from './IncomeForm'


export default function IncomeUpdate({ item, onUpdate }) {
    const update = usePutRequest({ url: INCOME_DETAIL.replace('{id}', item.id) })

    async function handleUpdate(data) {
        await update.request({ data })
        onUpdate()
    }

    return (
        <IncomeForm item={item} onSubmit={handleUpdate} initialValues={item} />
    )
}
