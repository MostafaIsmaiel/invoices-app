import * as yup from "yup";

export const schema = yup.object().shape({
  streetFrom: yup.string().required(),
  cityFrom: yup.string().required(),
  postCodeFrom: yup.number().min(5).max(5).positive().integer().required(),
  countryFrom: yup.string().required(),
  clientName: yup.string().required(),
  clientEmail: yup.string().email().required(),
  streetTo: yup.string().required(),
  cityTo: yup.string().required(),
  postCodeTo: yup.number().min(5).max(5).positive().integer().required(),
  countryTo: yup.string().required(),
  projectDescription: yup.string().required(),
  itemName: yup.string().required(),
  quantity: yup.number().required(),
  price: yup.number().required(),
});
