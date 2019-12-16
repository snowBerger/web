/**
 * Created by Berger on 2017/9/19.
 */
import styles from '!style-loader!css-loader?modules&localIdentName=[hash:base64:5]!sass-loader!./TagItem.scss'
import { levelArray } from './common'

export default {
  functional: true,
  render (h, context) {
    const content = levelArray.map(item => {
      return <span style={ +context.props.item.level === item.level ? 'background: ' + item.color : 'background: ' + item.defaultColor }></span>
    })
    return (
      <div class={ styles.tagItem }>
        <span class={ styles.name }>{ context.props.item.name }</span>
        <div class={ styles.content }>{ content }</div>
        <div class={ styles.text }>
          <span style={ 'color: ' + levelArray[+context.props.item.level - 1].color }>{ levelArray[+context.props.item.level - 1].text }</span>
        </div>
        <span class={ styles.link + ' iconfont icon-direction-right' }></span>
      </div>
    )
  },
  props: {
    item: {
      type: Object
    }
  }
}
