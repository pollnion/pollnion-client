import React from "react";

import { Controller } from "react-hook-form";
import { Form } from ".";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { FormProps } from "@/types/form";

const SignUpForm: React.FC<FormProps> = ({ form, onSubmit }) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Bug Title</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Login button not working on mobile"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-description">
                Description
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="form-rhf-demo-description"
                  placeholder="I'm having an issue with the login button on mobile."
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value.length}/100 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Include steps to reproduce, expected behavior, and what actually
                happened.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </Form>
  );
};

export default React.memo(SignUpForm);
