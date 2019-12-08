import React from 'react'
import Blok, { BlokContent } from './blok'
import Column, { ColumnContent } from './column'
import Classes from '../utils/classes'
import { METRICS, divideMetric, multiplyMetric } from '../utils/metrics'

type RowStyle = {
  minHeight?: string
}

export interface RowContent extends BlokContent {
  columns?: Array<ColumnContent>
  width?: string
  min_height?: number
  padding?: string
}

class Row extends React.Component<RowContent> {

  render() {
    const { columns, width, min_height, padding } = this.props
    let style: RowStyle = {}
    if (min_height) style.minHeight = `${min_height}vh`
    const classes = Classes('row').add(width).add(padding)
    return <div className={classes.join()} style={style}>
      <div className='inner'>
        {columns && columns.length && columns.map((column, i) => (
          <Column key={i} content={column} />
        )) || null}
      </div>
      <style jsx>{`
        .row {
          max-width: 75rem;
          margin-left: auto;
          margin-right: auto;
          box-sizing: border-box;
        }
        .row.width-full {
          max-width: none;
        }
        .row.width-small {
          max-width: 55rem;
        }
        @media (min-width: ${METRICS.breakpoint_desktop}) {
          .row {
            padding-left: ${METRICS.column_padding};
            padding-right: ${METRICS.column_padding};
            margin-top: ${METRICS.row_spacing};
            margin-bottom: ${METRICS.row_spacing};  
            display: flex;
          }
          .inner {
            display: flex;
            margin-left: -${divideMetric(METRICS.column_padding, 2)};
            margin-right: -${divideMetric(METRICS.column_padding, 2)};
            flex: 1;
          }
          .no-padding {
            padding-left: 0;
            padding-right: 0;
          }
          .no-padding .inner {
            margin-left: 0;
            margin-right: 0;
          }
        }
        @media (max-width: ${METRICS.breakpoint_mobile_max}) {
          .row {
            min-height: 0 !important;
          }
        }
      `}</style>
    </div>
  }

}

const RowBlok = Blok(Row)
export default RowBlok
