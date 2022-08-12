import React from 'react'
import { usePostRequest } from '../hooks/request'
import { PROJECT_LIST } from '../urls'
import { auth } from '../utils/auth'
import ProjectForm from './ProjectForm'


export default function ProjectCreate({ onSuccess }) {
    const create = usePostRequest({ url: PROJECT_LIST, ...auth() })

    async function onCreate(data) {
        await create.request({ data })
        onSuccess()
    }

    return (
        <ProjectForm onSubmit={onCreate} loading={create.loading} />
    )
}
