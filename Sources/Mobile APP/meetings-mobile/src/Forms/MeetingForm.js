import t from 'tcomb-form-native';

const Form = t.form.Form;

export const Meeting = t.struct({
  title: t.String,
  description: t.String,
});

export const options = {
  fields: {
    title: {
      label: 'Title (*)',
      placeholder: 'Title',
    },
    description: {
      label: 'Description (*)',
      placeholder: 'Description',
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 150,
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 150,
          },
        },
      },
    },
  },
};
