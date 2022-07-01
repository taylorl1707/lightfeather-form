import { getSupervisors, submitForm } from 'api/main';
import Button from 'components/Button';
import InputField from 'components/InputField';
import SelectField, { SelectOption } from 'components/SelectField';
import useForm, { IForm } from 'hooks/useForm';
import Grid from 'layouts/Grid';
import { useCallback, useEffect, useState } from 'react';
import './style.scss';

const SupervisorOptions: SelectOption[] = [{ value: '0', label: 'Select ...' }];

const FormView = () => {
  const form = useForm({
    firstName: '',
    lastName: '',
    email: '',
    emailCheck: false,
    phoneNumber: '',
    phoneCheck: false,
    supervisor: SupervisorOptions[0].value,
  });

  const [superviors, setSupervisors] = useState(SupervisorOptions);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getSupervisors()
      .then(({ data }) => {
        setSupervisors([...SupervisorOptions, ...(data as string[]).map((v, idx) => ({ value: v, label: v }))]);
      })
      .catch((err) => {
        console.error(err);
        setSupervisors(SupervisorOptions);
      });
  }, []);

  const generatedForm = useCallback((): IForm => {
    return {
      firstName: form.firstName.value as string,
      lastName: form.lastName.value as string,
      email: form.email.value as string,
      emailCheck: form.emailCheck.checked,
      phoneNumber: form.phoneNumber.value as string,
      phoneCheck: form.phoneCheck.checked,
      supervisor: form.supervisor.value as string,
    };
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.isFormValid) {
      setSending(true);

      submitForm(generatedForm())
        .then((res) => {
          console.log(res.data);
          alert(res.data.success);
          setSending(false);
        })
        .catch((err) => {
          console.error(err);
          setSending(false);
        });
    }
  };

  return (
    <div className="noti-form-container">
      <div className="form-header">Notification Form</div>
      <div className="form-content">
        <Grid>
          <InputField label="First Name" {...form.firstName} error={form.error.firstName} />
          <InputField label="Last Name" {...form.lastName} error={form.error.lastName} />
        </Grid>
        <Grid>
          <InputField {...form.email} {...form.emailCheck} label="Email" optional error={form.error.email} />
          <InputField
            {...form.phoneNumber}
            {...form.phoneCheck}
            label="Phone Number"
            optional
            error={form.error.phoneNumber}
          />
        </Grid>
        <SelectField
          {...form.supervisor}
          label="Supervisor"
          width="half"
          options={superviors}
          error={form.error.supervisor}
        />
        <Button label="SUBMIT" onClick={handleSubmit} disabled={!form.isFormValid || sending} />
      </div>
    </div>
  );
};

export default FormView;
