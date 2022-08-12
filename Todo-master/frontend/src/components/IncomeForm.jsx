import { Form, Formik } from 'formik'
import React from 'react'
import { required } from '../utils/validators'
import Input from './common/Input'
import Button from './common/Button'


export default function IncomeForm({ onSubmit, loading, initialValues }) {
    return (
        <Formik initialValues={{ title: '', isNumber: '', ...initialValues }} onSubmit={onSubmit}>
            <Form>
                <div className="columns">
                    <div className="column is-6">
                        <Input
                            label="Daromadlar (Mahsulot va xizmatlar bo'yicha"
                            name="title"
                            placeholder="Daromadlar (Mahsulot va xizmatlar bo'yicha"
                            validate={required} /> &nbsp;
                    </div>
                    <div className="column is-4">
                        <Input
                            label="Oylik hisobot uchun"
                            name="isNumber"
                            placeholder="Oylik hisobot uchun"
                            validate={required} /> &nbsp;
                    </div>

                    <div className="column is-narrow">
                        <Button
                            text="Qo'shish"
                            loading={loading}
                            type="submit"
                            icon="checkmark"
                            className="is-success mt-5" /> &nbsp;
                    </div>
                </div>
            </Form>
        </Formik>
    )
}
