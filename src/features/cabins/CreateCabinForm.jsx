import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow.jsx';

import { useCreateCabin } from './useCreateCabin.js';
import { useEditCabin } from './useEditCabin.js';
import { useIsAdmin } from '../authentication/useIsAdmin.js';
import toast from 'react-hot-toast';

function CreateCabinForm({ cabin = {}, onCloseModal }) {
  const isAdmin = useIsAdmin();
  const { id: cabinId, ...cabinValues } = cabin;
  const isEdit = !!cabinId;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? cabinValues : {},
  });

  const { isCreating, createCabin } = useCreateCabin(reset);
  const { isUpdating, editCabin } = useEditCabin();
  const isInAction = isCreating || isUpdating;
  const { errors } = formState;

  function onSubmit(data) {
    if (!isAdmin) {
      toast.error('Only admins can do this action');
      return;
    }

    const image = typeof data.image === 'string' ? data.image : data.image[0];
    const newCabinData = { ...data, image };

    const options = {
      onSuccess: () => {
        onCloseModal?.();
      },
    };

    if (isEdit) editCabin({ newCabinData, id: cabinId }, options);
    else createCabin(newCabinData, options);
  }

  function onError(/* errors */) {
    // console.log(errors);
  }

  return (
    <Form
      type={onCloseModal ? 'modal' : 'regular'}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          defaultValue={cabin?.name}
          disabled={isInAction}
          {...register('name', {
            required: 'This field can not be empty',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          defaultValue={cabin?.maxCapacity}
          disabled={isInAction}
          {...register('maxCapacity', {
            required: 'This field can not be empty',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          defaultValue={cabin?.regularPrice}
          disabled={isInAction}
          {...register('regularPrice', {
            required: 'This field can not be empty',
            min: {
              value: 100,
              message: 'Price must be at least 100',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isInAction}
          defaultValue={cabin?.discount || 0}
          {...register('discount', {
            required: 'This field can not be empty',
            validate: function (value) {
              if (Number(value) > Number(getValues('regularPrice')))
                return 'Discount can not exceed regular price';
            },
          })}
        />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          defaultValue={cabin?.description || ''}
          disabled={isInAction}
          {...register('description', {
            required: 'This field can not be empty',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isInAction}
          {...register('image', {
            required: isEdit ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onCloseModal?.()}
          $variation='secondary'
          $type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isInAction}>
          {isEdit ? 'Edit' : 'Create'} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
