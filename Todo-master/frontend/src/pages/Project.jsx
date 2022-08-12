import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLoad } from '../hooks/request'
import { PROJECT_LIST } from '../urls'
import Loader from '../components/common/Loader'
import ProjectItem from '../components/ProjectItem'
import ProjectCreate from '../components/ProjectCreate'
import Button from '../components/common/Button'

export default function Project() {
    const projects = useLoad({ url: PROJECT_LIST }, [])

    return (
        <div className="has-background-grey-lighter is-fullheight">
            <div className="container mb-1">
                <div className="level">
                    <h1 className="has-text-centered is-size-3">Hisobotlar</h1>

                    <NavLink to="/todo">
                        <Button
                            className="has-text-right is-size-6 is-link mt-1"
                            text="Loyiha qo'shish" />
                    </NavLink>
                </div>
                <div className="box">
                    {!projects.loading ? (
                        <div>
                            <ProjectCreate onSuccess={projects.request} />
                            {projects.response ? projects.response.map((item, index) => (
                                <ProjectItem
                                    index={index}
                                    item={item}
                                    key={item.id}
                                    onUpdate={projects.request}
                                    onDelete={projects.request} />
                            )) : <div className="has-text-centered is-size-2">Пусто</div>}
                        </div>
                    ) : <Loader large center />}
                </div>
            </div>
        </div>
    )
}
