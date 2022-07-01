import useCheckbox from 'hooks/useCheckbox';
import useInput from 'hooks/useInput';
import { useMemo } from 'react';
import validator from 'validator';
import _ from 'lodash';

export interface IForm {
  firstName: string;
  lastName: string;
  email?: string;
  emailCheck: boolean;
  phoneNumber?: string;
  phoneCheck: boolean;
  supervisor: string;
}

export interface IError {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  supervisor: string;
}

const defaultError: IError = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  supervisor: '',
};

const useForm = (initForm: IForm) => {
  const firstName = useInput(initForm.firstName);
  const lastName = useInput(initForm.lastName);
  const emailCheck = useCheckbox(initForm.emailCheck);
  const email = useInput(initForm.email);
  const phoneCheck = useCheckbox(initForm.phoneCheck);
  const phoneNumber = useInput(initForm.phoneNumber);
  const supervisor = useInput(initForm.supervisor);

  const error = useMemo(() => {
    const newErr = Object.assign({}, defaultError);

    if (firstName.value === '') newErr.firstName = 'Required';
    else if (!validator.isAlpha(firstName.value as string)) newErr.firstName = 'Use only letters';

    if (lastName.value === '') newErr.lastName = 'Required';
    else if (!validator.isAlpha(lastName.value as string)) newErr.lastName = 'Use only letters';

    if (emailCheck.checked) {
      if (email.value === '') newErr.email = 'Required';
      else if (!validator.isEmail(email.value as string)) newErr.email = 'Invalid Email';
    }

    if (phoneCheck.checked) {
      if (phoneNumber.value === '') newErr.phoneNumber = 'Required';
      else if (!validator.isMobilePhone(phoneNumber.value as string)) newErr.phoneNumber = 'Invalid Phone Number';
    }

    if (supervisor.value === '0') newErr.supervisor = 'Required';

    return newErr;
  }, [firstName, lastName, emailCheck, email, phoneCheck, phoneNumber, supervisor]);

  const isFormValid = useMemo(() => {
    return _.isEqual(error, defaultError);
  }, [error]);

  return { firstName, lastName, emailCheck, email, phoneCheck, phoneNumber, supervisor, error, isFormValid };
};

export default useForm;
