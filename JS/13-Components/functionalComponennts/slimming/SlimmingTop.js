/**
 * Created by Berger on 2017/9/13.
 */
import styles from '!style-loader!css-loader?modules&localIdentName=[hash:base64:5]!sass-loader!./SlimmingTop.scss'

export default {
  functional: true,
  render (h, context) {
    const topImg = context.props.topImg ? <img class={ styles.topImg} src={context.props.topImg}></img> : null
    return (
      <div class={ styles.slimmingTop + ' ' + context.props.className}>
        <div class={ styles.topContent }>
          <img class={ styles.userImg } src={context.props.img}/>
          <div>{context.props.text}</div>
        </div>
        { topImg }
      </div>
    )
  },
  props: {
    className: {
      type: String
    },
    img: {
      type: String
    },
    text: {
      type: String
    },
    topImg: {
      type: String
    }
  }
}
