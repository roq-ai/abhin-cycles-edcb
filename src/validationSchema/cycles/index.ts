import * as yup from 'yup';

export const cycleValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  description: yup.string(),
  image: yup.string(),
  shop_id: yup.string().nullable(),
});
