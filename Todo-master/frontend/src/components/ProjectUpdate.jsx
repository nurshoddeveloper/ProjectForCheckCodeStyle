import React from 'react'
import { usePutRequest } from '../hooks/request'
import { PROJECT_DETAIL } from '../urls'
import ProjectForm from './ProjectForm'


export default function ProjectUpdate({ item, onUpdate }) {
    const update = usePutRequest({ url: PROJECT_DETAIL.replace('{id}', item.id) })

    async function handleUpdate(data) {
        await update.request({ data })
        onUpdate()
    }

    return (
        <ProjectForm item={item} onSubmit={handleUpdate} initialValues={item} />
    )
}
