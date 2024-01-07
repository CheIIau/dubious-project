export {
    isRegularUser,
    isUserAdmin,
    isUserManger,
} from './model/selector/roleSelector'
export { userReducer, userActions } from './model/slice/userSlice'
export type { User, UserSchema, USER_ROLE } from './model/types/user'
