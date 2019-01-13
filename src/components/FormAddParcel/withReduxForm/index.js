import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {getValidFloatString, checkFloatStringIsInvalid} from 'common-utils/prepareNumericValues'
import {loadClients} from '../../../ducks/clients'
import {addParcel} from '../../../ducks/parcels'
import {getClientsOptionsList} from '../selector'
import CheckboxGroup from './modules/CheckboxGroup'

const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Укажите название'
    }

    if (!values.weight) {
        errors.weight = 'Укажите вес'
    } else if (checkFloatStringIsInvalid(values.weight)) {
        errors.weight = 'Вес указан неверно'
    }

    if (!values.clientId) {
        errors.clientId = 'Выберите клиента'
    }

    if (!values.parcelAttributes || !values.parcelAttributes.length) {
        errors.parcelAttributes = 'Выберите особенность'
    }

    return errors
}

const warn = values => {
    const warnings = {}
    // if (values.age < 19) {
    //     warnings.age = 'Hmm, you seem a bit young...'
    // }
    return warnings
}

const renderField = (
    {
        input,
        label,
        type,
        meta: {touched, error, warning}
    }
) => {
    return (
        <div>
            <label>
                {label}
                <span>
                <input {...input} placeholder={label} type={type}/>
                    {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </span>
            </label>
        </div>
    )
}

const renderSelectClientErrors = (
    {
        meta: {touched, error, warning}
    }
) => {
    return (
        <div>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    )
}

class SyncValidationForm extends React.Component {
    constructor(props) {
        super(props);

        this.renderClientsSelect = this.renderClientsSelect.bind(this);
    }

    componentDidMount() {
        const {clientsLoading, clientsLoaded, loadClients} = this.props
        if (!clientsLoading && !clientsLoaded) {
            loadClients()
        }
    }

    renderClientsSelect() {
        const {clientsLoaded, clientsOptions} = this.props

        if (!clientsLoaded) {
            return (
                <span>
                    Loading...
                </span>
            )
        }

        const options = clientsOptions.map(function (item, index, arr) {
            const {label, value} = item
            return <option key={index} value={value}>{label}</option>
        })

        return (
            <label>
                <Field name="clientId" component="select">
                    {options}
                </Field>
                <Field
                    name="clientId"
                    type="select"
                    component={renderSelectClientErrors}
                />
            </label>
        )
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props
        // хрупкая, тяжёлая, крупногабаритная, новогодняя
        const options = [
            {label: 'хрупкая', value: 'хрупкая'},
            {label: 'тяжёлая', value: 'тяжёлая'},
            {label: 'крупногабаритная', value: 'крупногабаритная'},
            {label: 'новогодняя', value: 'новогодняя'}
        ];
        // console.log('render')
        return (
            <form onSubmit={handleSubmit}>

                <Field
                    name="title"
                    type="text"
                    component={renderField}
                    label="Название"
                />

                <Field
                    name="weight"
                    type="text"
                    component={renderField}
                    label="Вес"
                    normalize={getValidFloatString}
                />

                Клиент:
                {this.renderClientsSelect()}

                <div>
                    <label>Тип посылки</label>
                    <div>
                        <label>
                            <Field
                                name="parcelType"
                                component="input"
                                type="radio"
                                value="1"
                            />{' '}
                            1
                        </label>
                        <label>
                            <Field
                                name="parcelType"
                                component="input"
                                type="radio"
                                value="2"
                            />{' '}
                            2
                        </label>
                    </div>
                </div>

                <div>


                    <CheckboxGroup name="parcelAttributes" options={options} />
                </div>


                <hr/>

                <div>
                    <button type="submit" disabled={submitting}>
                        Submit
                    </button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    const {clientsLoading, clientsLoaded} = state.clients
    return {
        clientsLoading,
        clientsLoaded,
        clientsOptions: getClientsOptionsList(state.clients)
    }
}

let Form = SyncValidationForm
Form = connect(
    mapStateToProps,
    {loadClients, addParcel}
)(Form)

export default reduxForm({
    destroyOnUnmount: false,
    form: 'addParcel', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    warn // <--- warning function given to redux-form
})(Form)