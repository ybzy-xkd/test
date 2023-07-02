import {createStore} from 'redux'
import {fromJS} from 'immutable'

let reducer = (prevState={
        check:'false',
        count:0
    },action)=>{
    let newData = fromJS(prevState)
    let data
        switch (action.type) {
            case 'authentication':
                data =  newData.setIn(['check'],'true')
                console.log('data',data.toJS())
                return data.toJS()
            case 'SET_VISIBILITY_FILTER':
                data = newData.setIn(['count'],1)
                return data.toJS()
            default:
                data = newData.toJS()
                return data
    }
}

let store = createStore(reducer)

export default store