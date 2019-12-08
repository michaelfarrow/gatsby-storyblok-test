import React from 'react'
import Blok, { BlokContent } from './blok'
// import Bloks from './index'
import Components from './components'
import Classes from '../utils/classes'
import { METRICS, divideMetric } from '../utils/metrics'

export interface ColumnContent extends BlokContent {
  body?: Array<any>
  order?: number
  vertical_align?: string
  padding?: string
}

class Column extends React.Component<ColumnContent> {

  render() {
    const { body, order } = this.props
    const style = { order: order === undefined ? 1 : order }
    const { vertical_align, padding } = this.props
    const classes = Classes('column').add(vertical_align).add(padding)
    return <div className={classes.join()} style={style}>
      <div className='inner'>
        {body && body.length && body.map(blok => 
          React.createElement(Components(blok.component), {key: blok._uid, content: blok})  
        ) || null}
        {/* {body && body.length && body.map(Bloks) || null} */}
      </div>
      <style jsx>{`
        .column {
          flex: 1;
          display: flex;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        .inner {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: ${divideMetric(METRICS.column_padding, 4)};
          padding-right: ${divideMetric(METRICS.column_padding, 4)};
          box-sizing: border-box;
        }
        .valign-middle {
          align-self: center;
        }
        .valign-bottom {
          align-self: flex-end;
        }
        @media (min-width: ${METRICS.breakpoint_desktop}) {
          .column {
            margin-top: 0;
            margin-bottom: 0;
          }
          .inner {
            padding-left: ${divideMetric(METRICS.column_padding, 2)};
            padding-right: ${divideMetric(METRICS.column_padding, 2)};
            padding-top: ${divideMetric(METRICS.column_padding, 2)};
            padding-bottom: ${divideMetric(METRICS.column_padding, 2)};  
          }
        }
        .no-padding .inner {
          padding: 0;
        }
      `}</style>
      <style jsx global>{`
        .column.no-padding > .inner > .image .caption {
          padding-left: ${divideMetric(METRICS.column_padding, 4)};
          padding-right: ${divideMetric(METRICS.column_padding, 4)};
        }
        @media (min-width: ${METRICS.breakpoint_desktop}) {
          .column.no-padding > .inner > .image .caption {
            padding-left: 0;
          }
          .column.no-padding:first-child:last-child > .inner > .image .caption {
            padding-left: ${divideMetric(METRICS.column_padding, 4)};
          }
        }
        @media (max-width: ${METRICS.breakpoint_mobile_max}) {
          .column.no-padding > .inner > .image .copyright {
            padding-left: ${divideMetric(METRICS.column_padding, 4)};
            padding-right: ${divideMetric(METRICS.column_padding, 4)};
          }
        }

        .column > .inner > * {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .column > .inner > *:first-child {
          margin-top: 0;
        }
        .column > .inner > *:last-child {
          margin-bottom: 0;
        }
        .column > .inner .markdown {
          margin: 0;
        }
        .column > .inner .markdown > *:first-child {
          margin-top: 0;
        }
        .column > .inner .markdown > *:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  }

}

const ColumnBlok = Blok(Column)
export default ColumnBlok
