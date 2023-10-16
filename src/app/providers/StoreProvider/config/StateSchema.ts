import type { CounterSchema } from 'src/entities/Counter/counderIndex'
import type { UserSchema } from 'src/entities/User/userIndex'

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema
}
