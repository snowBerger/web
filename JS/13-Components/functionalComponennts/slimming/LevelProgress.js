/**
 * Created by Berger on 2017/9/20.
 */
import styles from '!style-loader!css-loader?modules&localIdentName=[hash:base64:5]!sass-loader!./LevelProgress.scss'
import { levelArray } from './common'

export default {
  functional: true,
  render (h, context) {
    const levelFlag = (level) => {
      return +level === +context.props.level ? <span class={ styles.progressFlag + ' ' + styles['flag-' + level] }></span> : null
    }
    const levelList = levelArray.map(item => {
      return (
        <li class={ +item.level === +context.props.level ? styles.current : '' }>
          <span class={ styles.progressText }>{ item.text }</span>
          <span class={ styles.progressLine } style={ +item.level === +context.props.level ? 'background: ' + item.color : 'background: ' + item.defaultColor }>
            { levelFlag(item.level) }
          </span>
        </li>
      )
    })
    return <div class={ styles.levelProgress }><ul>{ levelList }</ul></div>
  },
  props: {
    level: {
      type: Number
    }
  }
}

