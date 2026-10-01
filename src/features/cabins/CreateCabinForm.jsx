import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import { createCabin } from '../../services/apiCabins';

function CreateCabinForm() {
  //react hook form
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  // console.log(errors);

  // this is to see if current cabin table is vailid - after we crated a table, it needs to compare the table if it is same as external db. In order to keep data fresh, we need queryClient and invalidateQuerys below.
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      // if current table is different from db, it will rerender.
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      // reset function from react form. This reset the form.
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // our own/regular function
  function onSubmit(data) {
    // console.log(data.image[0]);

    mutate({ ...data, image: data.image[0] });
  }

  //for future use
  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* <StyledFormRow>
        <Label htmlFor='name'>Cabin name</Label>
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'This field is required.' })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </StyledFormRow> */}

      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'This field is required.' })}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required.',
            min: {
              value: 1,
              message: 'Maximum capacity should be at least 1',
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required.',
            min: {
              value: 20,
              message: 'Regular Price should be at least 20',
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required.',
            // validate
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less thatn regular price.',
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', { required: 'This field is required.' })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          type='file'
          {...register('image', { required: 'This field is required.' })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isLoading}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
