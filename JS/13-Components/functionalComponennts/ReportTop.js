import styles from '!style-loader!css-loader?modules&localIdentName=[hash:base64:5]!sass-loader!./ReportTop.scss'

export default {
  functional: true,
  render (h, context) {
    return (
      <div class={ styles.reportTop + ' ' + context.props.className }>
        <img class={ styles.topImg } src={context.props.img}/>
        <div class={ styles.topContent }>
          <div>hi，{context.props.name}</div>
          <div>{context.props.text}</div>
        </div>
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
    name: {
      type: String
    },
    text: {
      type: String
    }
  }
}
