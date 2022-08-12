import React from 'react'
import { useParams } from 'react-router-dom'
import { useLoad } from '../hooks/request'
import { EXPENS_LIST, INCOME_LIST, TODO_DETAIL } from '../urls'
import IncomeCreate from '../components/IncomeCreate'
import ExpensCreate from '../components/ExpensCreate'
import IncomeItem from '../components/IncomeItem'
import Loader from '../components/common/Loader'
import ExpensItem from '../components/ExpensItem'

export default function TodoDetail() {
    const { id } = useParams()
    const todoDetail = useLoad({ url: TODO_DETAIL.replace('{id}', id) }, [id])
    const incomes = useLoad({ url: INCOME_LIST, params: { todo: id } })

    const expens = useLoad({ url: EXPENS_LIST, params: { todo: id } })
    return (
        <div className="has-background-grey-lighter is-fullheight">
            <div className="container mb-1">
                <h1 className="has-text-centered is-size-3">Daromad</h1>
                <div className="box">
                    {!incomes.loading ? (
                        <div>
                            <IncomeCreate todo={todoDetail.response ? todoDetail.response.id : ''}
                                onSuccess={incomes.request} />
                            {incomes.response ? incomes.response.map((item, index) => (
                                <IncomeItem
                                    index={index}
                                    item={item}
                                    key={item.id}
                                    onUpdate={incomes.request}
                                    onDelete={incomes.request} />
                            )) : <div className="has-text-centered is-size-2">Пусто</div>}
                        </div>
                    ) : <Loader large center />}
                </div>
            </div>
            <div className="container mb-1">
                <h1 className="has-text-centered is-size-3">Xarajatlar</h1>
                <div className="box">
                    {!expens.loading ? (
                        <div>
                            <ExpensCreate
                                todo={todoDetail.response ? todoDetail.response.id : ''}
                                onSuccess={expens.request} />
                            {expens.response ? expens.response.map((item, index) => (
                                <ExpensItem
                                    index={index}
                                    item={item}
                                    key={item.id}
                                    onUpdate={expens.request}
                                    onDelete={expens.request} />
                            )) : <div className="has-text-centered is-size-2">Пусто</div>}
                        </div>
                    ) : <Loader large center />}
                </div>
            </div>
        </div>
    )
}
