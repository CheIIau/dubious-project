import type { Profile } from 'src/entities/Profile/profileIndex'
import { VALIDATE_PROFILE_ERROR_MESSAGES_KEYS } from '../../const/const'
import type { ValidateProfileErrorKeyType } from '../../types/editableProfileCardSchema'

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.noData]
    }
    const { firstname, lastname, age, city } = profile
    const errors: ValidateProfileErrorKeyType[] = []

    if (!firstname || !lastname) {
        errors.push(VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.incorrectUserData)
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.incorrectAge)
    }

    if (!city) {
        errors.push(VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.incorrectCity)
    }
    return errors
}
