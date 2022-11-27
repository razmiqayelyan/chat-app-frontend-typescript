import { LinearProgress } from '@mui/material'
import React, { Suspense } from 'react'
import UseWindowSize, { WindowSizeType } from './WindowSize'
const App = React.lazy(() => import('./desktop/DesktopApp'))
const MobileApp = React.lazy(() => import('./mobile/MobileApp'))

const AppController = () => {
    const {width}:WindowSizeType = UseWindowSize()
    if(width && width < 900 ) return <Suspense fallback={<LinearProgress/>}><MobileApp/></Suspense>
    else return <Suspense fallback={<LinearProgress/>}><App/></Suspense>
}
export default AppController