import Form from '../../ui/Form.jsx';
import FormRow from '../../ui/FormRow.jsx';
import Input from '../../ui/Input.jsx';
import Spinner from '../../ui/Spinner.jsx';
import { useIsAdmin } from '../authentication/useIsAdmin.js';
import { useSettings } from './useSettings.js';
import { useUpdateSetting } from './useUpdateSetting.js';

function UpdateSettingsForm() {
  const isAdmin = useIsAdmin();
  const {
    isLoading,
    // We Can't Desturcture something that doesn't exist
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e, fieldName) {
    const { value } = e.target;

    updateSetting({ [fieldName]: value }, isAdmin);
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
