import React from 'react';
import { connect } from 'react-redux';
import {
  getValidFloatString,
  checkFloatStringIsInvalid,
} from 'common-utils/prepareNumericValues';
import { loadClients } from '../../ducks/clients';
import { addParcel } from '../../ducks/parcels';
import { toast } from 'react-toastify';
import { getClientsOptionsList } from './selector';
import classNames from 'classnames';

class FormAddParcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        value: '',
        invalid: true,
        activated: false,
        validationErrorMsg: 'Укажите название',
      },
      weight: {
        value: '',
        invalid: true,
        activated: false,
      },
      clientId: '',
      parcelType: '1', // 1,2,3,4
      parcelAttributes: {
        value: {}, // хрупкая, тяжёлая, крупногабаритная, новогодняя
        invalid: true,
        activated: false,
      },
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeWeight = this.handleChangeWeight.bind(this);
    this.handleChangeClientId = this.handleChangeClientId.bind(this);
    this.handleChangeParcelType = this.handleChangeParcelType.bind(this);
    this.handleChangeParcelAttributes = this.handleChangeParcelAttributes.bind(
      this,
    );

    this.renderTitleValidationMsg = this.renderTitleValidationMsg.bind(this);
    this.renderWeightValidationMsg = this.renderWeightValidationMsg.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.activateAllFields = this.activateAllFields.bind(this);
  }

  componentDidMount() {
    const { clientsLoading, clientsLoaded, loadClients } = this.props;
    if (!clientsLoading && !clientsLoaded) {
      loadClients();
    }
  }

  // handlers

  handleChangeTitle(event) {
    const value = event.target.value;
    const fieldVal = {
      ...this.state.title,
      activated: true,
    };
    fieldVal.value = value;
    fieldVal.invalid = value.trim().length <= 3 || value.trim().length >= 11;
    fieldVal.validationErrorMsg = 'Укажите название';
    if (value.trim().length <= 3) {
      fieldVal.validationErrorMsg = 'Нужно более 3-x символов';
    } else if (value.trim().length >= 11) {
      fieldVal.validationErrorMsg = 'Нужно менее 11-ти символов';
    }
    this.setState({ title: fieldVal });
  }

  handleChangeWeight(event) {
    const value = event.target.value;
    const fieldVal = {
      ...this.state.weight,
      activated: true,
    };
    fieldVal.value = getValidFloatString(value);
    fieldVal.invalid = checkFloatStringIsInvalid(fieldVal.value);
    this.setState({ weight: fieldVal });
  }

  handleChangeClientId(event) {
    this.setState({ clientId: event.target.value });
  }

  handleChangeParcelType(event) {
    this.setState({ parcelType: event.target.value });
  }

  handleChangeParcelAttributes(event) {
    const value = event.target.value;
    const checkedAttrs = { ...this.state.parcelAttributes };

    if (typeof checkedAttrs.value[`${value}`] !== 'undefined') {
      delete checkedAttrs.value[`${value}`];
    } else {
      checkedAttrs.value[`${value}`] = '';
    }

    checkedAttrs.invalid = Object.keys(checkedAttrs.value).length === 0;

    this.setState({ parcelAttributes: checkedAttrs }, function() {
      // console.log(this.state)
    });
  }

  // form actions

  validateForm() {
    const result = {
      success: true,
      errors: [],
    };

    const { title, weight } = this.state;

    if (title.invalid) result.errors.push('Не указано название');
    if (weight.invalid) result.errors.push('Не указан вес');

    if (result.errors.length) {
      result.success = false;
    }

    return result;
  }

  activateAllFields() {
    const { title, weight, parcelAttributes } = this.state;
    this.setState({
      title: {
        ...title,
        activated: true,
      },
      weight: {
        ...weight,
        activated: true,
      },
      parcelAttributes: {
        ...parcelAttributes,
        activated: true,
      },
    });
  }

  resetForm() {
    this.setState({
      title: {
        value: '',
        invalid: true,
        activated: false,
        validationErrorMsg: 'Укажите название',
      },
      weight: {
        value: '',
        invalid: true,
        activated: false,
      },
      clientId: '',
      parcelType: '1', // 1,2,3,4
      parcelAttributes: {
        value: {}, // хрупкая, тяжёлая, крупногабаритная, новогодняя
        invalid: true,
        activated: false,
      },
    });
  }

  handleSubmit(event) {
    const { clientId, parcelAttributes } = this.state;
    event.preventDefault();

    const validationData = this.validateForm();

    this.activateAllFields();

    if (!validationData.success) {
      for (let i = 0; i < validationData.errors.length; i++) {
        toast.error(validationData.errors[i], {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
      return null;
    }

    if (!Object.keys(parcelAttributes.value).length) return null;

    if (clientId === '') {
      alert('Выберите клиента');
      return null;
    }

    const { title } = this.state;

    this.props.addParcel({
      title: title.value,
      clientId,
    });

    this.resetForm();
  }

  // renders parts

  renderTitleValidationMsg() {
    const { title } = this.state;

    if (!title.activated) {
      return null;
    }

    if (title.invalid) {
      return (
        <div className={'field-validation-msg field-validation-msg_error'}>
          {title.validationErrorMsg}
        </div>
      );
    } else {
      return (
        <div className={'field-validation-msg field-validation-msg_success'}>
          Название заполнено корректно
        </div>
      );
    }
  }

  renderWeightValidationMsg() {
    const { weight } = this.state;

    if (!weight.activated) {
      return null;
    }

    if (weight.invalid) {
      return (
        <div className={'field-validation-msg field-validation-msg_error'}>
          Укажите вес
        </div>
      );
    } else {
      return (
        <div className={'field-validation-msg field-validation-msg_success'}>
          Вес указан корректно
        </div>
      );
    }
  }

  renderClientsSelect() {
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
      <select value={this.state.clientId} onChange={this.handleChangeClientId}>
        {options}
      </select>
    );
  }

  // render

  render() {
    const { title, weight, parcelAttributes } = this.state;

    const titleInputClass = classNames({
      input_invalid: title.invalid && title.activated,
    });
    const weightInputClass = classNames({
      input_invalid: weight.invalid && weight.activated,
    });
    const parcelAttributesClass = classNames({
      input_invalid: parcelAttributes.invalid && parcelAttributes.activated,
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            value={title.value}
            className={titleInputClass}
            onChange={this.handleChangeTitle}
          />
          {this.renderTitleValidationMsg()}
        </label>
        <hr />
        <label>
          Вес:
          <input
            type="text"
            value={weight.value}
            className={weightInputClass}
            onChange={this.handleChangeWeight}
          />
        </label>
        {this.renderWeightValidationMsg()}
        <hr />
        <label>
          Клиент:
          {this.renderClientsSelect()}
        </label>
        <hr />
        Тип посылки
        <br />
        <label>
          <input
            type="radio"
            value="1"
            checked={this.state.parcelType === '1'}
            onChange={this.handleChangeParcelType}
          />
          Тип 1
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={this.state.parcelType === '2'}
            onChange={this.handleChangeParcelType}
          />
          Тип 2
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={this.state.parcelType === '3'}
            onChange={this.handleChangeParcelType}
          />
          Тип 3
        </label>
        <label>
          <input
            type="radio"
            value="4"
            checked={this.state.parcelType === '4'}
            onChange={this.handleChangeParcelType}
          />
          Тип 4
        </label>
        <hr />
        <div className={parcelAttributesClass}>
          Особенности посылки
          <br />
          <label>
            <input
              type="checkbox"
              value="хрупкая"
              checked={
                typeof this.state.parcelAttributes.value['хрупкая'] !==
                'undefined'
              }
              onChange={this.handleChangeParcelAttributes}
            />
            хрупкая
          </label>
          <label>
            <input
              type="checkbox"
              value="тяжёлая"
              checked={
                typeof this.state.parcelAttributes.value['тяжёлая'] !==
                'undefined'
              }
              onChange={this.handleChangeParcelAttributes}
            />
            тяжёлая
          </label>
          <label>
            <input
              type="checkbox"
              value="крупногабаритная"
              checked={
                typeof this.state.parcelAttributes.value['крупногабаритная'] !==
                'undefined'
              }
              onChange={this.handleChangeParcelAttributes}
            />
            крупногабаритная
          </label>
          <label>
            <input
              type="checkbox"
              value="новогодняя"
              checked={
                typeof this.state.parcelAttributes.value['новогодняя'] !==
                'undefined'
              }
              onChange={this.handleChangeParcelAttributes}
            />
            новогодняя
          </label>
        </div>
        <hr />
        <input type="submit" value="Submit" ref="formBtn" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { clientsLoading, clientsLoaded } = state.clients;
  return {
    clientsLoading,
    clientsLoaded,
    clientsOptions: getClientsOptionsList(state.clients),
  };
};

export default connect(
  mapStateToProps,
  { loadClients, addParcel },
)(FormAddParcel);
