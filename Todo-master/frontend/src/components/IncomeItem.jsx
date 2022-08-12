import React, { useState } from 'react'
import cn from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import { getDateTime } from '../utils/date'
import { useDeleteRequest, usePutRequest } from '../hooks/request'
import { INCOME_DETAIL } from '../urls'
import Dropdown, { DropdownItem } from './common/Dropdown'
import Loader from './common/Loader'
import IncomeUpdate from './IncomeUpdate'


export default function IncomeItem({ item, onUpdate, onDelete, index }) {
    const update = usePutRequest({ url: INCOME_DETAIL.replace('{id}', item.id) })
    const remove = useDeleteRequest({ url: INCOME_DETAIL.replace('{id}', item.id) })
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
                    <IncomeUpdate item={item} todoId={item.id} onUpdate={onUpdate} />
                ) : (
                    <div style={{ display: 'flex' }} className={cn({ [css(styles.del)]: item.isActive })}>
                        <div className="is-left mr-6 mt-3">
                            <p className="title is-6">{index + 1}</p>
                        </div>
                        <div className="is-center mr-6 mt-3">
                            <p className="title is-6">{item.title}</p>
                        </div>
                        <div className="is-center mr-6 mt-3">
                            <p className="title is-6">{item.isNumber}</p>
                        </div>
                        <div className="mr-6 mt-3">
                            <p className="subtitle is-7">{getDateTime(item.createdAt)}</p>
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

const styles = StyleSheet.create({
    del: {
        textDecoration: 'line-through',
        display: 'flex',
    },
})
