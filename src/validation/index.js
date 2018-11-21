import { isEmail, isLength } from 'validator';
import isEmpty from 'lodash/isEmpty';

export const validateInput = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (!isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (!isLength(data.password, { min: 6, max: 64 })) {
        errors.password = 'Message is too short, min length 6 characters';
    }

    return {
        errors,
        isValid: isEmpty( errors )
    }
};