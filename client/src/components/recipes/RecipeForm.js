import React from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'


export default function StreamForm(props) {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="error-message">
          <div className="error-message__header">{error}</div>
        </div>
      );
    }
  };
  const required = (value) => (value ? undefined : "Required");
  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };
 
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };
 
  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators
      }}
      validate={(formValues) => {
        const errors = {};
        
        if (!formValues.title) {
          errors.title = "You must enter a title";
        }
 
        if (!formValues.description) {
          errors.description = "You must enter a description";
        }
        
 
        return errors;
      }}
      render={({ handleSubmit,form:{mutators:{push,pop}} }) => (
        <form onSubmit={handleSubmit} className="formular">
          <div className="col1">
          <Field name="title" component={renderInput} label="Titlu"/>
          <Field
            name="description"
            component={renderInput}
            label="Mod de preparare"
          />
          <Field
            name="image"
            component={renderInput}
            label="Imagine URL (not required)"
          />
        </div>
        <div className="col2">
          <FieldArray name="ingredients">
              {({ fields }) =>
                fields.map((name, index) => (
                  <div key={name} className="wrapper-fields">
                    <div className="wrapper-fields__ls"><label className="wrapper-fields__label">Ingredient #{index + 1}</label>
                    <span
                      onClick={() => fields.remove(index)}
                      className="button_delete"
                    >
                     Delete
                    </span></div>
                    
                    <div className="wrapper-fields__qi"> <Field
                      name={`${name}.quantity`}
                      component='input'
                      placeholder="2kg"
                      className="quantity"
                      validate={required}
                    />
                    <Field
                      name={`${name}.ingredient`}
                      component='input'
                      placeholder="Ingredients: onion, lemon"
                      className="ingredients"
                      validate={required}
                    /></div>
                   
                    
                  </div>
                ))
              }
            </FieldArray>
           
            <button
                type="button"
                onClick={() => push('ingredients', undefined)}
                className="form-button form-button__add-ingr"
              >
                Add Ingredient
              </button>
          </div>
          
          <button className="form-button form-button__submit">Submit</button>
        </form>
      )}
    />
  );
};
