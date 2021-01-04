import { createActions } from 'reduxsauce'
 
//actions declarations, using redux sauce
const { Types, Creators } = createActions({
    all_contacts:['all_contacts']
}, {})

export {Types, Creators}