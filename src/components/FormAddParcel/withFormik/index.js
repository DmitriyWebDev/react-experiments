import React from "react";
import { connect } from "react-redux";
import {
  getValidFloatString,
  checkFloatStringIsInvalid
} from "common-utils/prepareNumericValues";
import { loadClients } from "../../../ducks/clients";
import { addParcel } from "../../../ducks/parcels";
// import {toast} from 'react-toastify'
import { getClientsOptionsList } from "../selector";
import { Formik, Field } from "formik";
// import classNames from 'classnames'
import RadioGroup from "./modules/RadioGroup";
import InputRadio from "./modules/InputRadio";
import InputCheckbox from "./modules/InputCheckbox";
import CheckboxGroup from "./modules/CheckboxGroup";

class Basic extends React.Component {
  constructor(props) {
    super(props);

    this.renderClientsSelect = this.renderClientsSelect.bind(this);
  }

  componentDidMount() {
    const { clientsLoading, clientsLoaded, loadClients } = this.props;
    if (!clientsLoading && !clientsLoaded) {
      loadClients();
    }
  }

  renderClientsSelect(handleChange, clientId) {
    const { clientsLoaded, clientsOptions } = this.props;

    if (!clientsLoaded) {
      return <span>Loading...</span>;
    }

    const options = clientsOptions.map(function(item, index, arr) {
      const { label, value } = item;
      return (
        <option key={index} value={value}>
          {label}
        </option>
      );
    });

    return (
      <select name="clientId" value={clientId} onChange={handleChange}>
        {options}
      </select>
    );
  }

  render() {
    function showErrorClass(flag = false) {
      return flag ? "input_invalid" : "";
    }
    return (
      <div>
        <Formik
          initialValues={{
            title: "",
            weight: "",
            clientId: "",
            parcelType: "", // 1,2,3,4
            parcelAttributes: [] // хрупкая, тяжёлая, крупногабаритная, новогодняя
          }}
          validate={values => {
            let errors = {};

            if (!values.title) {
              errors.title = "Укажите название";
            }

            if (!values.weight) {
              errors.weight = "Укажите вес";
            } else if (checkFloatStringIsInvalid(values.weight)) {
              errors.weight = "Вес указан невалидно";
            }

            if (!values.clientId) {
              errors.clientId = "Выберите клиента";
            }

            if (!values.clientId) {
              errors.clientId = "Выберите клиента";
            }

            if (!values.parcelType) {
              errors.parcelType = "Укажите тип посылки";
            }

            if (!values.parcelAttributes.length) {
              errors.parcelAttributes = "Укажите особенность посылки";
            }

            return errors;
          }}
          onSubmit={(values, actions) => {
            console.log("onSubmit ---");
            // console.log(actions)
            console.log(values);
            actions.setSubmitting(false);

            this.props.addParcel({
              title: values.title,
              clientId: values.clientId
            });

            actions.resetForm();

            // toast.error('Сабмит', {
            //     position: toast.POSITION.TOP_RIGHT,
            //     autoClose: 2000
            // });

            // setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2));
            //     setSubmitting(false);
            // }, 400);
          }}
        >
          {({
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <label>
                Название:
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <div>{errors.title && touched.title && errors.title}</div>
              </label>

              <hr />

              <label>
                Вес:
                <input
                  type="text"
                  name="weight"
                  onChange={event => {
                    const { target } = event;
                    const { value } = target;
                    const preparedVal = getValidFloatString(value);
                    const modEvent = {
                      ...event
                    };
                    modEvent.target.value = preparedVal;
                    handleChange(modEvent);
                  }}
                  onBlur={handleBlur}
                  value={values.weight}
                />
                <div>{errors.weight && touched.weight && errors.weight}</div>
              </label>

              <hr />

              <label>
                Клиент:
                {this.renderClientsSelect(handleChange, values.clientId)}
                <div>
                  {errors.clientId && touched.clientId && errors.clientId}
                </div>
              </label>

              <hr />

              <RadioGroup
                id="parcelType"
                label="Тип посылки"
                value={values.parcelType}
                error={errors.parcelType}
                touched={touched.parcelType}
              >
                <Field
                  component={InputRadio}
                  name="parcelType"
                  id="1"
                  label="Тип 1"
                />
                <Field
                  component={InputRadio}
                  name="parcelType"
                  id="2"
                  label="Тип 2"
                />
                <Field
                  component={InputRadio}
                  name="parcelType"
                  id="3"
                  label="Тип 3"
                />
                <Field
                  component={InputRadio}
                  name="parcelType"
                  id="4"
                  label="Тип 4"
                />
              </RadioGroup>

              <hr />

              <div
                className={showErrorClass(
                  errors.parcelAttributes && touched.parcelAttributes
                )}
              >
                <CheckboxGroup
                  id="parcelAttributes"
                  label="Особенности посылки:"
                  value={values.parcelAttributes}
                  error={errors.parcelAttributes}
                  touched={touched.parcelAttributes}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                >
                  <Field
                    component={InputCheckbox}
                    name="parcelAttributes"
                    id="хрупкая"
                    label="хрупкая"
                  />
                  <Field
                    component={InputCheckbox}
                    name="parcelAttributes"
                    id="тяжёлая"
                    label="тяжёлая"
                  />
                  <Field
                    component={InputCheckbox}
                    name="parcelAttributes"
                    id="крупногабаритная"
                    label="крупногабаритная"
                  />
                  <Field
                    component={InputCheckbox}
                    name="parcelAttributes"
                    id="новогодняя"
                    label="новогодняя"
                  />
                </CheckboxGroup>
              </div>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { clientsLoading, clientsLoaded } = state.clients;
  return {
    clientsLoading,
    clientsLoaded,
    clientsOptions: getClientsOptionsList(state.clients)
  };
};

export default connect(
  mapStateToProps,
  { loadClients, addParcel }
)(Basic);
