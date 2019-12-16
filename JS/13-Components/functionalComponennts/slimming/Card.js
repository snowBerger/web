/**
 * Created by Berger on 2017/9/13.
 */
import styles from '!style-loader!css-loader?modules&localIdentName=[hash:base64:5]!sass-loader!./Card.scss'

export default {
  functional: true,
  render (h, context) {
    const content = context.props.selfContent ? context.children : <div class={ styles.cardContent }>{ context.slots().default }</div>
    return (
      <div class={ styles.card + ' ' + context.props.className }>
        <div class={ styles.cardTitle }>
          <span class={ 'iconfont ' + context.props.icon }></span>
          <span>{context.props.title}</span>
          { context.slots().tips }
        </div>
        { content }
      </div>
    )
  },
  props: {
    className: {
      type: String
    },
    icon: {
      type: String
    },
    title: {
      type: String
    },
    selfContent: {
      type: Boolean,
      default: false
    }
  }
}
