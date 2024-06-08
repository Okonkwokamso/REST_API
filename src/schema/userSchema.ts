import { TypeOf, object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'First name is required',
    }),
    password: string({
      required_error: 'Password is required'
    }).min(8, 'Password must be at least 8 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required'
    }),
    email: string({
      required_error: 'Email is required',
      //parse: (value: string) => value.toLowerCase()
    }).email('Please enter a valid email')
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })
});


export type createUserInput = TypeOf<typeof createUserSchema>;











