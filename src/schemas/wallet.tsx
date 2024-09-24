import validate from "bitcoin-address-validation";
import Joi from 'joi';
import DOMPurify from 'dompurify';
import { IAccount } from "@/types/interfaces";

export const AccountSchema = Joi.object<IAccount>({
    address: Joi.string().custom((value, helpers) => {
        if (!validate(value)) {
            return helpers.error('any.custom', { message: 'Invalid address' });
        }
        return value;
    }),
    addressType: Joi.string().custom((value, helpers) => {
        const sanitizedValue = DOMPurify.sanitize(value);
        if (value !== sanitizedValue) {
            return helpers.error('any.custom', { message: 'Invalid addressType' });
        }
        return sanitizedValue;
    }),
    publicKey: Joi.string().custom((value, helpers) => {
        const sanitizedValue = DOMPurify.sanitize(value);
        if (value !== sanitizedValue) {
            return helpers.error('any.custom', { message: 'Invalid publicKey' });
        }
        return sanitizedValue;
    }),
    purpose: Joi.string().custom((value, helpers) => {
        const sanitizedValue = DOMPurify.sanitize(value);
        if (value !== sanitizedValue) {
            return helpers.error('any.custom', { message: 'Invalid purpose' });
        }
        return sanitizedValue;
    }),
});
