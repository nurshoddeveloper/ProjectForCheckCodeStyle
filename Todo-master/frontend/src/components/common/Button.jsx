import { StyleSheet, css } from 'aphrodite'
import React from 'react'
import cn from 'classnames'

export default function Button({ text, onClick, loading, className, icon, type = 'button', ...rest }) {
    return (
        <button
            onClick={onClick}
            type={type}
            className={cn('button', className, { 'is-loading': loading })}
            {...rest}>

            {icon ? <span className={text ? css(styles.icon) : ''}><ion-icon name={icon} /></span> : null }
            {text}
        </button>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginRight: '0.2rem',
    },
})
