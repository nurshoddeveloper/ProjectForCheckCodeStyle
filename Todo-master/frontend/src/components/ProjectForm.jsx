import { Form, Formik } from 'formik'
import React from 'react'
import { required } from '../utils/validators'
import Input from './common/Input'
import Button from './common/Button'
import Select from './common/Select'
import { useLoad } from '../hooks/request'
import { TODO_LIST } from '../urls'

export default function ProjectForm({ onSubmit, loading, initialValues }) {
    const todos = useLoad({ url: TODO_LIST })
    const options = todos.response ? todos.response : []

    return (
        <Formik initialValues={{
            directorName: '',
            incomeMonth: '',
            clientNumber: '',
            salary: '',
            bannerNumber: '',
            projectName: '',
            ...initialValues,
        }}
            onSubmit={onSubmit}>
            <Form>
                <div className="columns">
                    <div className="column">
                        <Input
                            label="Direktor Nomi"
                            name="directorName"
                            placeholder="Direktor Nomi"
                            validate={required} /> &nbsp;
                    </div>

                    <div className="column">
                        <Select
                            label="Loyiha Nomi"
                            options={options}
                            name="projectName"
                            placeholder="Loyiha Nomi"
                            validate={required} /> &nbsp;
                    </div>


                </div>
                <div className="columns">
                    <div className="column">
                        <Input
                            label="Joriy Oydgi Daromad"
                            name="incomeMonth"
                            placeholder="Joriy Oydgi Daromad"
                            validate={required} /> &nbsp;
                    </div>
                    <div className="column">
                        <Input
                            label="Joriy oydagi mijozlar soni"
                            name="clientNumber"
                            placeholder="Joriy oydagi mijozlar soni"
                            validate={required} /> &nbsp;
                    </div>


                    <div className="column">
                        <Input
                            label="Ish haqi"
                            name="salary"
                            placeholder="Ish haqi"
                            validate={required} /> &nbsp;
                    </div>
                    <div className="column">
                        <Input
                            label="Marketing reklama"
                            name="bannerNumber"
                            placeholder="Marketing reklama"
                            validate={required} /> &nbsp;
                    </div>

                </div>

                <div className="column is-narrow">
                    <Button
                        text="Qo'shish"
                        loading={loading}
                        type="submit"
                        icon="checkmark"
                        className="is-success" /> &nbsp;
                </div>
            </Form>
        </Formik>
    )
}
