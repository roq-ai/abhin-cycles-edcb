import * as yup from 'yup';

export const advertisementValidationSchema = yup.object().shape({
  content: yup.string().required(),
  shop_id: yup.string().nullable(),
});
