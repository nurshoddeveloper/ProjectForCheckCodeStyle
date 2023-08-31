import React, { useState } from 'react'
import { useDeleteRequest, usePutRequest } from '../hooks/request'
import { TODO_DETAIL } from '../urls'
import Dropdown, { DropdownItem } from './common/Dropdown'
import Loader from './common/Loader'
import TodoUpdate from './TodoUpdate'


export default function TodoItem({ item, onUpdate, onDelete, index }) {
    const update = usePutRequest({ url: TODO_DETAIL.replace('{id}', item.id) })
    const remove = useDeleteRequest({ url: TODO_DETAIL.replace('{id}', item.id) })
    const [showUpdate, setShowUpdate] = useState(false)


    async function handleDelete() {
        if (global.confirm('Вы действительно хотите удалить?')) {
            await remove.request()
            onDelete()
        }
    }

    if (update.loading) return <div className="media"><Loader className="is-size-3" center /></div>

    return (
        <div className="media mx-0 my-0 pt-2">

            <div className="media-content">
                {showUpdate ? (
                    <TodoUpdate item={item} onUpdate={onUpdate} />
                ) : (
                    <div style={{ display: 'flex' }}>
                        <div className="is-left mr-6 mt-3">
                            <p className="title is-6">{index + 1}</p>
                        </div>
                        <div className="mr-2">
                            <img src={item.imageUrl} width={100} height={50} alt=""/>
                        </div>
                        <div className="is-center mr-6 mt-3">
                            <p className="title is-6">Name: {item.name}</p>
                        </div>
                        <div className="is-center mr-6 mt-3">
                            <p className="title is-6"> Category: {item.category}</p>
                        </div>
                        <div className="is-center mr-6 mt-3">
                            <p className="title is-6">Attributes: {item.attributes.map((elem) =>
                                <div>
                                    <span>Name: {elem.name}- {elem.value}</span>
                                </div>)}
                            </p>
                        </div>
                        <div className="is-center mr-6 mt-3">
                            <p className="title is-6">Brand: {item.brand}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="media-right">
                <Dropdown right trigger={(
                    <span className="pointer">
                        <ion-icon name="ellipsis-vertical-outline" />
                    </span>
                )}>
                    <DropdownItem text="Изменить" onClick={() => setShowUpdate(!showUpdate)} />
                    <DropdownItem text="Удалить" onClick={handleDelete} />
                </Dropdown>
            </div>
        </div>
    )
}
