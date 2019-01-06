import React from 'react'
import { connect } from 'react-redux'
import styles from './page.module.scss'
import FormAddParcel from '../../FormAddParcel'
// import FormWithFormic from '../../FormAddParcel/withFormik'
import FormWithReduxForm from '../../FormAddParcel/withReduxForm'
import ParcelsList from '../../ParcelsList'
import { addParcel } from '../../../ducks/parcels'


class PageParcels extends React.Component {
    handleSubmitParcelFormRedux = values => {
        // print the form values to the console
        console.log(values)

        const {title, clientId} = values
        this.props.addParcel({
            title,
            clientId
        })
    }
    render() {
        return(
            <div className={'page_animated'}>
                <div className={styles["parcels"]}>
                    <div className={styles["parcels__content"]}>
                        <div className={styles["parcels__list-wrap"]}>
                            <ParcelsList/>
                        </div>
                        <div className={styles["parcels__form-wrap"]}>
                            <FormWithReduxForm
                                onSubmit={this.handleSubmitParcelFormRedux}
                                initialValues={{parcelType: '1'}}
                            />
                            <hr/>
                            <hr/>
                            <hr/>
                            <FormAddParcel />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => state,
    {addParcel}
)(PageParcels)
