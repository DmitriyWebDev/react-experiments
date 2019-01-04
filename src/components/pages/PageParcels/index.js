import React from 'react'
import styles from './page.module.scss'
import FormAddParcel from '../../FormAddParcel'
import FormWithFormic from '../../FormAddParcel/withFormik'
import ParcelsList from '../../ParcelsList'

class PageParcels extends React.Component {
    render() {
        return(
            <div className={styles["parcels"]}>
                <div className={styles["parcels__content"]}>
                    <div className={styles["parcels__list-wrap"]}>
                        <ParcelsList/>
                    </div>
                    <div className={styles["parcels__form-wrap"]}>
                        <FormWithFormic />
                        <hr/>
                        <hr/>
                        <hr/>
                        <FormAddParcel />
                    </div>
                </div>
            </div>
        )
    }
}

export default PageParcels